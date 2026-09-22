import os
import sys
import time
import subprocess
import json
import urllib.request
from websocket import create_connection

# 1. 基礎參數配置
GAME_NAME = "BeingADIK"
TARGET_URL = f"https://raylexlee.github.io/renpyTTS/tts.html?game={GAME_NAME}"
EDGE_EXE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
DEBUG_PORT = 9222
USER_DATA_DIR = r"C:\Users\Raylex Lee\edge-debug-profile"

print(f"[TTS 主程式] 正在透過原生命令列啟動獨立偵錯 Edge...")
# 使用你的黃金命令行參數啟動原生 Edge，徹底解鎖雲端語音
edge_cmd = [
    EDGE_EXE,
    f"--remote-debugging-port={DEBUG_PORT}",
    "--remote-allow-origins=*",
    f"--user-data-dir={USER_DATA_DIR}",
    TARGET_URL
]
subprocess.Popen(edge_cmd)

print("[TTS 主程式] 等待 Edge 初始化並請在瀏覽器內任意點擊一下以解鎖音訊權限...")
time.sleep(3)

# 2. 連接 Edge 的 CDP (Chrome DevTools Protocol) 遠端控制通道
ws_url = None
try:
    # 向 Edge 請求當前分頁的 WebSocket 控制網址
    with urllib.request.urlopen(f"http://127.0.0.1:{DEBUG_PORT}/json", timeout=2) as response:
        pages = json.loads(response.read().decode())
        for page in pages:
            if 'tts.html' in page.get('url', ''):
                ws_url = page.get('webSocketDebuggerUrl')
                break
except Exception as e:
    print(f"[TTS 錯誤] 無法連線至 Edge 偵錯連接埠: {e}")
    sys.exit(1)

if not ws_url:
    print("[TTS 錯誤] 在 Edge 中找不到你的 tts.html 語音網頁分頁！")
    sys.exit(1)

# 建立 WebSocket 直連通道
print("[TTS 主程式] 成功與 Edge 建立 CDP 記憶體直連通訊！")
ws = create_connection(ws_url)

# 透過 CDP 執行 JavaScript 的輔助函數
def execute_js_via_cdp(js_code):
    payload = {
        "id": 1,
        "method": "Runtime.evaluate",
        "params": {
            "expression": js_code
        }
    }
    try:
        ws.send(json.dumps(payload))
        ws.recv() # 接收回傳確認
    except:
        pass

# 清理舊訊號檔
if os.path.exists("tts_signal.tmp"):
    os.remove("tts_signal.tmp")

# 3. 啟動遊戲原生的執行檔
print("[TTS 主程式] 正在引導遊戲原生的執行檔啟動...")
exe_files = [f for f in os.listdir('.') if f.endswith('.exe') and f.lower() != 'python.exe' and 'run_' not in f.lower()]
if exe_files:
    game_process = subprocess.Popen([exe_files[0]])
else:
    print("[TTS 主程式] 錯誤：找不到遊戲的 .exe 啟動檔！")
    ws.close()
    sys.exit(1)

print("[TTS 主程式] 雙核心同步成功！盡情享受遊戲吧。")

last_assigned_voice = ""

# 4. 高頻輪詢迴圈 (10ms)
try:
    while game_process.poll() is None:
        if os.path.exists("tts_signal.tmp"):
            try:
                with open("tts_signal.tmp", "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read().strip()
                if os.path.exists("tts_signal.tmp"):
                    os.remove("tts_signal.tmp")
                
                if "|||" in content:
                    speaker, text = content.split("|||", 1)
                    
                    # 透過 CDP 叫 Edge 查表拿取語音名字，並動態轉義防止引號破裂
                    safe_speaker = speaker.replace('"', '\\"').replace("'", "\\'")
                    safe_text = text.replace('"', '\\"').replace("'", "\\'")
                    
                    # 用於獲取聲線小名的極簡指令
                    js_get_voice = f"window.characterMap['{safe_speaker}'] || window.characterMap['Narrator'] || ''"
                    
                    # 透過 CDP 發送查詢
                    payload_query = {
                        "id": 2,
                        "method": "Runtime.evaluate",
                        "params": {"expression": js_get_voice, "returnByValue": True}
                    }
                    ws.send(json.dumps(payload_query))
                    res = json.loads(ws.recv())
                    target_voice = res.get('result', {}).get('result', {}).get('value', '')
                    
                    # 如果換人說話，更新 Edge 全域變數
                    if target_voice and target_voice != last_assigned_voice:
                        execute_js_via_cdp(f"window.currentVoiceName = '{target_voice}';")
                        last_assigned_voice = target_voice
                        print(f"【更換聲線】{speaker} -> {target_voice}")
                    
                    # 觸發發聲
                    print(f"【播放語音】[{speaker}]: {text}")
                    execute_js_via_cdp(f"window.speak('{safe_text}');")
                    
            except Exception as e:
                pass
        time.sleep(0.01)
except KeyboardInterrupt:
    game_process.terminate()
finally:
    if os.path.exists("tts_signal.tmp"):
        try: os.remove("tts_signal.tmp")
        except: pass
    try: ws.close()
    except: pass

