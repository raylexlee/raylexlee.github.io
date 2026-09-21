import os
import sys
import time
import subprocess
from selenium import webdriver
from selenium.webdriver.edge.service import Service as EdgeService
from webdriver_manager.microsoft import EdgeChromiumDriverManager

# 1. 基礎參數配置
GAME_NAME = "MilfyCity"
TARGET_URL = f"https://github.io{GAME_NAME}"

print(f"[TTS 主程式] 正在啟動 Edge 瀏覽器並開啟: {TARGET_URL}")
options = webdriver.EdgeOptions()
driver = webdriver.Edge(service=EdgeService(EdgeChromiumDriverManager().install()), options=options)
driver.get(TARGET_URL)

print("[TTS 主程式] 請在瀏覽器視窗內任意點擊一下以解鎖音訊權限...")
time.sleep(3) 

# 清理可能殘留的舊訊號檔
if os.path.exists("tts_signal.tmp"):
    os.remove("tts_signal.tmp")

# 2. 自動偵測並喚醒遊戲的原生執行檔 (.exe)
print("[TTS 主程式] 正在引導遊戲原生的執行檔啟動...")
exe_files = [f for f in os.listdir('.') if f.endswith('.exe') and f.lower() != 'python.exe' and 'run_' not in f.lower()]
if exe_files:
    game_exe = exe_files[0]
    print(f"[TTS 主程式] 偵測到遊戲程式: {game_exe}")
    # 非同步啟動遊戲，讓本機 Python 3 留在背景
    game_process = subprocess.Popen([game_exe])
else:
    print("[TTS 主程式] 錯誤：找不到遊戲的 .exe 啟動檔！")
    try: driver.quit()
    except: pass
    sys.exit(1)

print("[TTS 主程式] 聯合同步成功！開始享受遊戲吧。")

last_assigned_voice = ""

# 3. 高頻輪詢迴圈 (10ms)，接管來自遊戲的語音信號
try:
    while game_process.poll() is None:
        if os.path.exists("tts_signal.tmp"):
            try:
                # 讀取對白資料
                with open("tts_signal.tmp", "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read().strip()
                
                # 讀完立刻刪檔，代表信號已接收
                if os.path.exists("tts_signal.tmp"):
                    os.remove("tts_signal.tmp") 
                
                if "|||" in content:
                    speaker, text = content.split("|||", 1)
                    
                    # 叫 Edge 查表動態切換聲線
                    target_voice = driver.execute_script(
                        "return window.characterMap[arguments] || window.characterMap['Narrator'] || '';", 
                        speaker
                    )
                    if target_voice and target_voice != last_assigned_voice:
                        driver.execute_script("window.currentVoiceName = arguments;", target_voice)
                        last_assigned_voice = target_voice
                        print(f"【更換聲線】{speaker} -> {target_voice}")
                    
                    # 操控 Edge 高速發聲
                    print(f"【播放語音】[{speaker}]: {text}")
                    driver.execute_script("window.speak(arguments);", text)
            except Exception as e:
                pass
        time.sleep(0.01) # 10毫秒輪詢一次，實現無感延遲
except KeyboardInterrupt:
    print("[TTS 主程式] 收到強制關閉指令...")
    game_process.terminate()
finally:
    if os.path.exists("tts_signal.tmp"):
        try: os.remove("tts_signal.tmp")
        except: pass
    print("[TTS 主程式] 正在關閉瀏覽器並回收資源...")
    try: driver.quit()
    except: pass

