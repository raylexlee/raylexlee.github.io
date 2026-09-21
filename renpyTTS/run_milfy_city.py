import os
import sys
import time
import subprocess
from selenium import webdriver
from selenium.webdriver.edge.service import Service as EdgeService
from webdriver_manager.microsoft import EdgeChromiumDriverManager

GAME_NAME = "MilfyCity"
TARGET_URL = f"https://raylexlee.github.io/renpyTTS/tts.html?game={GAME_NAME}"

print(f"[TTS 主程式] 正在啟動 Edge 瀏覽器並開啟: {TARGET_URL}")
options = webdriver.EdgeOptions()
driver = webdriver.Edge(service=EdgeService(EdgeChromiumDriverManager().install()), options=options)
driver.get(TARGET_URL)

print("[TTS 主程式] 請在瀏覽器視窗內任意點擊一下以解鎖音訊權限...")
time.sleep(3) 

# 清理舊的訊號檔
if os.path.exists("tts_signal.tmp"):
    os.remove("tts_signal.tmp")

print("[TTS 主程式] 正在啟動遊戲原生的執行檔...")
exe_files = [f for f in os.listdir('.') if f.endswith('.exe') and f.lower() != 'python.exe' and 'run_' not in f.lower()]
if exe_files:
    game_exe = exe_files[0]
    game_process = subprocess.Popen([game_exe])
else:
    print("[TTS 主程式] 錯誤：找不到遊戲的 .exe 啟動檔！")
    sys.exit(1)

print("[TTS 主程式] 聯合同步成功！開始享受遊戲吧。")

last_assigned_voice = ""

try:
    # 高頻監聽迴圈 (10ms 級別)，確保完全零延遲
    while game_process.poll() is None:
        if os.path.exists("tts_signal.tmp"):
            try:
                # 讀取信號
                with open("tts_signal.tmp", "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read().strip()
                os.remove("tts_signal.tmp") # 讀完立刻刪除
                
                if "|||" in content:
                    speaker, text = content.split("|||", 1)
                    
                    # 1. 叫 Edge 查表並切換聲線
                    target_voice = driver.execute_script(
                        "return window.characterMap[arguments] || window.characterMap['Narrator'] || '';", 
                        speaker
                    )
                    if target_voice and target_voice != last_assigned_voice:
                        driver.execute_script("window.currentVoiceName = arguments;", target_voice)
                        last_assigned_voice = target_voice
                    
                    # 2. 朗讀文字
                    driver.execute_script("window.speak(arguments);", text)
            except Exception as e:
                pass
        time.sleep(0.01) # 10毫秒輪詢一次，肉眼與耳朵完全無法察覺的極速響應
except KeyboardInterrupt:
    game_process.terminate()
finally:
    if os.path.exists("tts_signal.tmp"):
        os.remove("tts_signal.tmp")
    print("[TTS 主程式] 正在關閉瀏覽器...")
    try: driver.quit()
    except: pass

