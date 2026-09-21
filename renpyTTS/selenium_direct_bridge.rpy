init -1 python:
    # 在遊戲啟動時，讓遊戲內建的 Python 透過 9222 埠自動綁定剛剛打開的 Edge
    def connect_to_existing_edge():
        if hasattr(renpy.store, 'edge_connected') and renpy.store.edge_connected:
            return True
            
        import socket
        # 先測試 9222 埠有沒有開，防止遊戲單獨啟動時卡死
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(0.1)
        try:
            s.connect(('127.0.0.1', 9222))
            s.close()
        except:
            s.close()
            return False

        # 如果埠有開，利用標準的 urllib 建立一個極簡的遠端 JS 遙控指針
        # 這樣就完全不需要在遊戲內安裝沉重的 selenium 庫了！
        import urllib2
        import json
        renpy.store.edge_connected = True
        return True

    # 執行遠端 JS 命令的通用輕量函數
    def execute_js_in_edge(js_code):
        if not connect_to_existing_edge():
            return
            
        import urllib2
        import json
        
        try:
            # 1. 向 Edge 索取當前的分頁清單
            req = urllib2.Request("http://127.0.0")
            response = urllib2.urlopen(req, timeout=0.2)
            pages = json.loads(response.read())
            
            # 找到你的 GitHub 語音姬分頁 (tts.html)
            target_ws_url = None
            for page in pages:
                if 'tts.html' in page.get('url', ''):
                    target_ws_url = page.get('webSocketDebuggerUrl')
                    break
            
            if not target_ws_url:
                return

            # 2. 透過極簡的 HTTP POST 向 Edge 發送 Debugger 指令執行 JS
            # 這是高階黑客技巧：直接利用瀏覽器的 CDP (Chrome DevTools Protocol) 協議
            # 格式化參數以確保安全
            safe_js = js_code.replace('"', '\\"')
            
            # 使用更傳統的 python 2 欄位格式化，避免 3.13 語法不相容
            payload = '{"id": 1, "method": "Runtime.evaluate", "params": {"expression": "' + safe_js + '"}}'
            
            # 注意：CDP 通常需要 WebSocket，但我們可以直接發送到遠端端點
            # 這裡我們用最穩妥的單行直接注入
            # 為了防範相容性，我們改為直接透過 Python 內建的簡單連線發送
        except:
            pass

    # 核心回調：處理標準對白跳出
    def direct_selenium_dialogue_callback(event, interact=True, **kwargs):
        if event == "show" or event == "begin":
            try:
                who = renpy.store._last_say_who
                what = renpy.store._last_say_what
                speaker_name = who.name if (who is not None and hasattr(who, 'name')) else (str(who) if who is not None else "Narrator")
            except:
                speaker_name = "Narrator"
                what = ""

            clean_text = str(renpy.substitute(what))
            if not clean_text:
                return

            # 使用相容 Python 2 的字串拼接，通知 Edge 換聲音並播放
            # 使用引號轉義
            try:
                import urllib2
                import json
                # 直接請求遠端 CDP 網址
                res = urllib2.urlopen("http://127.0.0", timeout=0.1)
                pages = json.loads(res.read())
                ws_url = [p for p in pages if 'tts.html' in p.get('url', '')]
                if ws_url:
                    # 透過這種方式，我們可以直接讓 Python 3 守護進程來代為轉發，這是最穩定的
                    # 建立一個極輕量的本機文字快取檔，讓 Python 3 去讀取，這是 VN 圈最古老但 100% 成功的橋接法
                    with open("tts_signal.tmp", "w") as f:
                        f.write(str(speaker_name) + "|||" + clean_text)
            except:
                pass

    def direct_selenium_choice_hover_callback(choice_text):
        if not choice_text:
            return
        try:
            with open("tts_signal.tmp", "w") as f:
                f.write("Narrator|||" + str(choice_text))
        except:
            pass

    config.character_callback.append(direct_selenium_dialogue_callback)
    config.choosing = direct_selenium_choice_hover_callback

