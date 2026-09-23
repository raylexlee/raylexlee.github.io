import os
import sys
import time
import subprocess
import json
import urllib.request
from websocket import create_connection

def detect_game_name():
    """
    自動掃描當前目錄下的執行檔，智慧剔除系統與通用關鍵字，自動推導遊戲名稱
    """
    # 獲取當前目錄下所有 .exe, .sh, .py 檔案
    files = [f for f in os.listdir('.') if f.endswith(('.exe', '.sh', '.py'))]
    
    # 建立排除清單（剔除我們自己的啟動腳本、Python 本身、以及 Steam 常見組件）
    ignore_keywords = [
        'run_game', 'run_milfy', 'run_milfy_city', 'python', 'init_game_profile', 
        'zsync', 'dxwebsetup', 'vc_redist', 'gdb', 'covert', 'compile_config', 'genjson'
    ]
    
    detected_names = []
    for f in files:
        # 取得不含副檔名的純主檔名
        base_name = os.path.splitext(f)[0]
        base_lower = base_name.lower()
        
        # 檢查是否包含排除關鍵字
        if any(ik in base_lower for ik in ignore_keywords):
            continue
            
        if base_name not in detected_names:
            detected_names.append(base_name)
            
    # 優先返回長度最像遊戲代號的名字（排除太短或奇怪的殘留）
    if detected_names:
        # 排序：優先選擇有匹配多種副檔名的名字，或者字串最長的
        # 在這裡我們直接返回第一個被識別出的合法遊戲執行主檔名
        return detected_names[0]
        
    return "UnknownGame"

def main():
    # 🎯 核心升級：全自動感知遊戲主檔名（例如 LWT, MilfyCity, BeingADIK）
    GAME_NAME = detect_game_name()
    print(f"🤖 [🤖 智慧辨識] 成功偵測到目前遊戲主程式名稱為: 【{GAME_NAME}】")
    
    TARGET_URL = f"https://raylexlee.github.io/renpyTTS/tts.html?game={GAME_NAME}"
    EDGE_EXE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    DEBUG_PORT = 9222
    USER_DATA_DIR = r"C:\Users\Raylex Lee\edge-debug-profile"

    print(f"[TTS 主程式] 正在啟動獨立偵錯 Edge 並加載設定: {TARGET_URL}")
    
    # 啟動原生 Edge 偵錯沙盒
    edge_cmd = [
        EDGE_EXE,
        f"--remote-debugging-port={DEBUG_PORT}",
        "--remote-allow-origins=*",
        f"--user-data-dir={USER_DATA_DIR}",
        TARGET_URL
    ]
    subprocess.Popen(edge_cmd)

    print("[TTS 主程式] 請在瀏覽器內任意點擊一下以解鎖音訊權限...")
    time.sleep(3)

    # 連接 Edge 的 CDP 遙控通道
    ws_url = None
    try:
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
        print(f"[TTS 錯誤] 在 Edge 中找不到對應 【{GAME_NAME}】 的語音網頁分頁！")
        sys.exit(1)

    ws = create_connection(ws_url)
    print("[TTS 主程式] CDP 記憶體直連通訊成功綁定！")

    def execute_js_via_cdp(js_code):
        payload = {"id": 1, "method": "Runtime.evaluate", "params": {"expression": js_code}}
        try:
            ws.send(json.dumps(payload))
            ws.recv()
        except: pass

    # 清理舊訊號
    if os.path.exists("tts_signal.tmp"):
        os.remove("tts_signal.tmp")

    # 執行遊戲原生的 exe
    print(f"[TTS 主程式] 正在喚醒原生的遊戲執行檔: {GAME_NAME}.exe")
    game_exe_path = f"./{GAME_NAME}.exe"
    
    # 防禦性檢查：萬一作業系統環境特殊，改抓清單裡第一個非 python 的 exe
    if not os.path.exists(game_exe_path):
        exe_files = [f for f in os.listdir('.') if f.endswith('.exe') and f.lower() != 'python.exe' and 'run_' not in f.lower()]
        if exe_files: game_exe_path = f"./{exe_files[0]}"
        else:
            print("[TTS 錯誤] 找不到任何可執行的遊戲 .exe 檔案！")
            ws.close()
            sys.exit(1)

    game_process = subprocess.Popen([game_exe_path])
    print(f"🎉 萬用雙核心同步成功！【{GAME_NAME}】語音姬已就緒。")

    last_assigned_voice = ""

    # 10ms 高頻輪詢迴圈
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
                        
                        safe_speaker = speaker.replace('"', '\\"').replace("'", "\\'")
                        safe_text = text.replace('"', '\\"').replace("'", "\\'")
                        
                        js_get_voice = f"window.characterMap['{safe_speaker}'] || window.characterMap['Narrator'] || ''"
                        
                        payload_query = {
                            "id": 2,
                            "method": "Runtime.evaluate",
                            "params": {"expression": js_get_voice, "returnByValue": True}
                        }
                        ws.send(json.dumps(payload_query))
                        res = json.loads(ws.recv())
                        target_voice = res.get('result', {}).get('result', {}).get('value', '')
                        
                        if target_voice and target_voice != last_assigned_voice:
                            execute_js_via_cdp(f"window.currentVoiceName = '{target_voice}';")
                            last_assigned_voice = target_voice
                            print(f"【更換聲線】{speaker} -> {target_voice}")
                        
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

if __name__ == "__main__":
    main()

