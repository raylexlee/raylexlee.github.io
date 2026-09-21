init -1 python:
    # 核心回調：處理標準對白跳出并寫入臨時檔
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

            try:
                with open("tts_signal.tmp", "w") as f:
                    f.write(str(speaker_name) + "|||" + clean_text)
            except:
                pass

    # 為了徹底防範 RevertableList 崩潰地雷
    # 我們建立一個標準的 Python 呼叫包裝類別
    class RenpyTTSCallbackWrapper(object):
        def __init__(self, old_callback):
            self.old_callback = old_callback

        def __call__(self, event, interact=True, **kwargs):
            # 先執行我們的語音直連
            try:
                direct_selenium_dialogue_callback(event, interact, **kwargs)
            except:
                pass
            
            # 再執行遊戲原本可能存在的舊回調，確保原遊戲邏輯完整
            if self.old_callback:
                try:
                    if isinstance(self.old_callback, list):
                        for cb in self.old_callback:
                            cb(event, interact, **kwargs)
                    else:
                        self.old_callback(event, interact, **kwargs)
                except:
                    pass

    # ---- 終極注入防禦：直接替換整個常規物件，100% 免疫讀檔回溯錯誤 ----
    if not getattr(renpy.store, '_tts_injected', False):
        config.character_callback = RenpyTTSCallbackWrapper(config.character_callback)
        renpy.store._tts_injected = True

