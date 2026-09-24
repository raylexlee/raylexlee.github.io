init -2 python:
    # 建立一個通用函數，將信號安全寫入 10ms 級別的臨時信號檔
    def send_tts_signal_v8(speaker, text):
        try:
            # 移去任何潛在的引號，確保傳遞給 Python 3 啟動器時不會語法破裂
            safe_speaker = str(speaker).replace("'", "\\'").replace('"', '\\"')
            safe_text = str(text).replace("'", "\\'").replace('"', '\\"')
            
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
        # 🎯 關鍵核心修正：Ren'Py 8.3+ 的開關變數已從 .tts 變更為 .self_voicing
        # 如果 self_voicing 為 False，說明語音助理已被關閉，這個函數不運作
        if not renpy.game.preferences.self_voicing:
            return
            
        if not what:
            return

        try:
            who = _last_say_who
            speaker_name = who.name if (who is not None and hasattr(who, 'name')) else (str(who) if who is not None else "Narrator")
        except:
            speaker_name = "Narrator"

        # 順利接管：當按 V 開啟時，把歷史紀錄、選單按鈕完整發送至臨時檔
        send_tts_signal_v8(speaker_name, what)

    # 實施 Monkey Patch 接管新引擎的 V 鍵語音出口
    renpy.display.tts.speak = custom_tts_speak

    # ==========================================
    # 模式 B：當 V 鍵關閉時（沉浸式推新劇情模式）
    # ==========================================
    def immersive_dialogue_hook_v8(event, interact=True, **kwargs):
        # 🎯 關鍵核心修正：如果新版語音助理開啟了，沉浸模式自動讓道
        if renpy.game.preferences.self_voicing:
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
            send_tts_signal_v8(speaker_name, clean_text)

    # 將此沉浸式回調安全附加到 Ren'Py 8.3 的核心回調中
    if config.character_callback is None:
        config.character_callback = [immersive_dialogue_hook_v8]
    else:
        if immersive_dialogue_hook_v8 not in config.character_callback:
            config.character_callback.append(immersive_dialogue_hook_v8)

