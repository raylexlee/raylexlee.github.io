init -1 python:
    # 1. 處理標準對白跳出
    def direct_selenium_dialogue_callback(event, interact=True, **kwargs):
        if event == "show" or event == "begin":
            try:
                who = _last_say_who
                what = _last_say_what
                speaker_name = who.name if (who is not None and hasattr(who, 'name')) else (str(who) if who is not None else "Narrator")
            except:
                speaker_name = "Narrator"
                what = ""

            clean_text = str(substitute(what))
            if not clean_text:
                return

            try:
                with open("tts_signal.tmp", "w") as f:
                    f.write(str(speaker_name) + "|||" + clean_text)
            except:
                pass

    # 2. 處理選項懸停朗讀的核心發聲函數
    def direct_selenium_choice_hover(choice_text):
        if not choice_text:
            return
        try:
            # 移去 Ren'Py 的樣式標籤 (如 {b}, {color})
            import re
            clean_choice = re.sub(r'\{[^}]*\}', '', str(choice_text))
            with open("tts_signal.tmp", "w") as f:
                f.write("Narrator|||" + clean_choice)
        except:
            pass

    # 安全註冊對白監聽
    if config.character_callback is None:
        config.character_callback = [direct_selenium_dialogue_callback]
    else:
        if isinstance(config.character_callback, list):
            config.character_callback.append(direct_selenium_dialogue_callback)
        else:
            class TTSCallbackProxy(object):
                def __init__(self, old): self.old = old
                def __call__(self, *args, **kwargs):
                    try: direct_selenium_dialogue_callback(*args, **kwargs)
                    except: pass
                    if self.old:
                        try: self.old(*args, **kwargs)
                        except: pass
            config.character_callback = TTSCallbackProxy(config.character_callback)

# ======================================================================
# 🎯 記憶體黑客注入：透過覆蓋 exports.display_menu 攔截 RPA 內的選單
# ======================================================================
init -1 python:
    # 建立一個與 Ren'Py 7.4.x 動作系統相容的自訂懸停 Action 類別
    class TTSChoiceHoverAction(ui.Action):
        def __init__(self, caption):
            self.caption = caption
        def __call__(self):
            direct_selenium_choice_hover(self.caption)

    # 備份原有的選單行為，改用 exports 內建空間安全取得
    if not hasattr(renpy.exports, '_original_display_menu'):
        renpy.exports._original_display_menu = renpy.exports.display_menu

    def custom_display_menu(items, **kwargs):
        """
        在選單即將要畫出來的瞬間（此時 items 已從 scripts.rpa 解壓生成），
        我們便利這群選項，強行將我們封裝好的懸停動作（hovered）硬塞進去！
        """
        try:
            for item in items:
                # 在 Ren'Py 中，item 通常是 Choice 物件，擁有 args, kwargs 與 caption
                if item and hasattr(item, 'caption') and item.caption:
                    # 動態將行為塞進選單物品的屬性中，完美繞過 .rpa 封鎖
                    item.kwargs['hovered'] = TTSChoiceHoverAction(item.caption)
        except:
            pass
            
        # 移交回官方原本的選單渲染流程
        return renpy.exports._original_display_menu(items, **kwargs)

    # 實施 Monkey Patch 覆蓋核心選單出口
    renpy.exports.display_menu = custom_display_menu

