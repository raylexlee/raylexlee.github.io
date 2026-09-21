init -1 python:
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

            # 將說話者與對白寫入 10ms 級別的輪詢信號檔
            try:
                with open("tts_signal.tmp", "w") as f:
                    f.write(str(speaker_name) + "|||" + clean_text)
            except:
                pass

    # 處理選項懸停朗讀
    def direct_selenium_choice_hover_callback(choice_text):
        if not choice_text:
            return
        try:
            with open("tts_signal.tmp", "w") as f:
                f.write("Narrator|||" + str(choice_text))
        except:
            pass

    # ---- 關鍵修正：安全註冊對白監聽 ----
    if config.character_callback is None:
        config.character_callback = [direct_selenium_dialogue_callback]
    else:
        config.character_callback.append(direct_selenium_dialogue_callback)
    
    # 註冊選項懸停監聽
    config.choosing = direct_selenium_choice_hover_callback

