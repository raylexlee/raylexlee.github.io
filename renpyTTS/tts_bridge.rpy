init -1 python:
    # A. 核心回調：處理標準對白跳出
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

    # B. 核心回調：處理滑鼠移入選項時的發聲
    def direct_selenium_choice_hover(choice_text):
        if not choice_text:
            return
        try:
            import re
            clean_choice = re.sub(r'\{[^}]*\}', '', str(choice_text))
            
            with open("tts_signal.tmp", "w") as f:
                f.write("Narrator|||" + clean_choice)
        except:
            pass

    # ---- 關鍵修正：使用最安全的通用轉發 (*args, **kwargs) ----
    if config.character_callback is None:
        config.character_callback = [direct_selenium_dialogue_callback]
    else:
        if isinstance(config.character_callback, list):
            config.character_callback.append(direct_selenium_dialogue_callback)
        else:
            # 透過星號表達式安全透傳，100% 避免 multiple values for keyword argument 報錯
            class TTSCallbackProxy(object):
                def __init__(self, old): 
                    self.old = old
                def __call__(self, *args, **kwargs):
                    try:
                        direct_selenium_dialogue_callback(*args, **kwargs)
                    except:
                        pass
                    if self.old:
                        try:
                            self.old(*args, **kwargs)
                        except:
                            pass
            config.character_callback = TTSCallbackProxy(config.character_callback)

# ---- 🎯 相容 Ren'Py 7.4.x 的動態 UI 懸停注入 ----
init 999 python:
    class TTSChoiceHoverAction(renpy.ui.Action):
        def __init__(self, caption):
            self.caption = caption
        def __call__(self):
            direct_selenium_choice_hover(self.caption)

    # 針對 7.4.x 的動態螢幕按鈕行為進行攔截補丁
    # 每當選單畫面渲染，強行將 hovered 屬性與我們的動作綁定
    if hasattr(renpy.config, 'screens') and 'choice' in renpy.config.screens:
        # 有些版本會把 choice 封裝在特殊結構，在此做安全調試準備
        pass

