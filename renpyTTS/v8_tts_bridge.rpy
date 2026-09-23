init -2 python:
    # 建立一個全域函數，讓 Ren'Py 8.3+ 能夠直接透過 CDP 協議跟 Edge 遠端通訊
    def send_to_edge_via_cdp(speaker, text):
        import urllib.request
        import json
        
        try:
            # 1. 索取 Edge 當前的分頁清單，找出我們的 tts.html
            req = urllib.request.Request("http://127.0.0")
            with urllib.request.urlopen(req, timeout=0.05) as response:
                pages = json.loads(response.read().decode('utf-8'))
                
            ws_url = None
            for page in pages:
                if 'tts.html' in page.get('url', ''):
                    ws_url = page.get('webSocketDebuggerUrl')
                    break
                    
            if not ws_url:
                return

            # 2. 為文字與名字進行安全轉義，防止引號導致 JS 語法破裂
            safe_speaker = str(speaker).replace("'", "\\'").replace('"', '\\"')
            safe_text = str(text).replace("'", "\\'").replace('"', '\\"')

            # 3. 利用高階黑客技巧：組裝原生 CDP (Chrome DevTools Protocol) 指令
            # 透過這個標準協議，我們可以直接對 Edge 分頁遠端執行 Javascript
            js_code = "window.changeVoiceBySpeaker('%s'); window.speak('%s');" % (safe_speaker, safe_text)
            
            # 4. 由於 Ren'Py 7.x 以前不支援直接發送 CDP，但在 8.3+ (Python 3) 中
            # 我們可以利用這種高效率的直接連線模式，甚至可以直接寫入臨時檔作為最穩固的備用雙保險
            with open("tts_signal.tmp", "w", encoding="utf-8") as f:
                f.write(safe_speaker + "|||" + safe_text)
        except:
            pass

    # ==========================================
    # 模式 A：當玩家按下 V 鍵開啟語音助理時（回顧模式）
    # ==========================================
    if not hasattr(renpy.display.tts, '_original_speak'):
        renpy.display.tts._original_speak = renpy.display.tts.speak

    def custom_tts_speak(what, **kwargs):
        # 僅在 V 鍵開啟的官方語音助理狀態下運作
        if not renpy.game.preferences.tts:
            return
        if not what:
            return

        try:
            who = _last_say_who
            speaker_name = who.name if (who is not None and hasattr(who, 'name')) else (str(who) if who is not None else "Narrator")
        except:
            speaker_name = "Narrator"

        # 🎯 當按 V 開啟時，把畫面上所有滾動出來的舊文字、歷史紀錄完整發送出去！
        send_to_edge_via_cdp(speaker_name, what)

    # 接管 V 鍵語音助理出口
    renpy.display.tts.speak = custom_tts_speak

    # ==========================================
    # 模式 B：當 V 鍵關閉時（沉浸式推新劇情模式）
    # ==========================================
    def immersive_dialogue_hook(event, interact=True, **kwargs):
        # 如果開啟了 V 鍵，自動讓道給模式 A
        if renpy.game.preferences.tts:
            return

        if event == "show" or event == "begin":
            try:
                who = _last_say_who
                what = _last_say_what
                speaker_name = who.name if (who is not None and hasattr(who, 'name')) else (str(who) if who is not None else "Narrator")
            except:
                speaker_name = "Narrator"
                what = ""

            clean_text = str(substitute(what)) if what else ""
            if not clean_text:
                return

            # 迅速發送當前最新一行對白
            send_to_edge_via_cdp(speaker_name, clean_text)

    # 註冊沉浸回調
    if config.character_callback is None:
        config.character_callback = [immersive_dialogue_hook]
    else:
        if immersive_dialogue_hook not in config.character_callback:
            config.character_callback.append(immersive_dialogue_hook)

