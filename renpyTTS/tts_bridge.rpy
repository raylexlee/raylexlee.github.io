init -1 python:
    # 1. 處理標準對白跳出
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

    # 2. 處理選項懸停朗讀的核心發聲函數
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
# 🎯 核心黑科技：在記憶體中定點爆破 7.4.x 的 choice 螢幕組件 (RPA 解包免疫)
# ======================================================================
init 999 python:
    import renpy

    # 建立一個與 Ren'Py 7.4.x 動作系統 100% 相容的自訂懸停 Action 類別
    class TTSChoiceHoverAction(renpy.ui.Action):
        def __init__(self, caption):
            self.caption = caption
        def __call__(self):
            # 滑鼠移入時，瞬間觸發檔案寫入
            direct_selenium_choice_hover(self.caption)

    # 覆蓋 Ren'Py 官方選單物品物件的預設行為
    # 在 7.4.x 中，每當選單跳出，Ren'Py 會將選項封裝成 MenuEntry 物件
    if not hasattr(renpy.exports, '_original_display_menu'):
        renpy.exports._original_display_menu = renpy.exports.display_menu

    def custom_display_menu(items, **kwargs):
        """
        當選單即將要在螢幕上畫出來的瞬間（此時 .rpa 已經解壓完畢且 items 已生成），
        我們在記憶體裡攔截這群選項按鈕，強制把我們的懸停動作硬塞進去！
        """
        try:
            for item in items:
                if item and hasattr(item, 'caption') and item.caption:
                    # 抓取選項的文字，並為其動態注入我們自訂的 hovered 行為
                    # 完美欺騙引擎，使其等同於在 screens.rpy 裡寫下了 hovered Function(...)
                    item.kwargs['hovered'] = TTSChoiceHoverAction(item.caption)
        except Exception as e:
            pass
            
        # 移交回官方原本的選單渲染流程
        return renpy.exports._original_display_menu(items, **kwargs)

    # 實施 Monkey Patch 覆蓋核心選單出口
    renpy.exports.display_menu = custom_display_menu

