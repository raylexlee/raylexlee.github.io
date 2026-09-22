# ======================================================================
# 1. 核心發聲函數定義（安全放置於最早期，此時不開展任何變數改寫）
# ======================================================================
init -1 python:
    # 處理標準對白跳出
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

    # 處理選項懸停朗讀
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

    # 建立與 Ren'Py 動作系統相容的自訂懸停 Action 類別
    class TTSChoiceHoverAction(ui.Action):
        def __init__(self, caption):
            self.caption = caption
        def __call__(self):
            direct_selenium_choice_hover(self.caption)


# ======================================================================
# 🎯 2. 終極安全注入：在遊戲初始化最末期實施，100% 免疫讀檔回溯錯誤
# ======================================================================
init 999 python:
    # ---- 關鍵防禦 A：安全附加對白回調，絕對不破壞、不重寫原本的物件類型 ----
    if config.character_callback is None:
        config.character_callback = [direct_selenium_dialogue_callback]
    else:
        # 如果它已經是個 List 或 RevertableList，我們只用 append 追加，絕不進行 Proxy 類別包裝
        # 這樣讀檔時回溯系統就不會引發 'RevertableList' object is not callable 異常
        if direct_selenium_dialogue_callback not in config.character_callback:
            config.character_callback.append(direct_selenium_dialogue_callback)

    # ---- 關鍵防禦 B：安全攔截 RPA 內的選單出口 (Monkey Patch) ----
    if not hasattr(renpy.exports, '_original_display_menu'):
        renpy.exports._original_display_menu = renpy.exports.display_menu

    def custom_display_menu(items, **kwargs):
        try:
            for item in items:
                if item and hasattr(item, 'caption') and item.caption:
                    # 動態將行為塞進選單物品的屬性中，完美繞過 .rpa 封鎖
                    item.kwargs['hovered'] = TTSChoiceHoverAction(item.caption)
        except:
            pass
        return renpy.exports._original_display_menu(items, **kwargs)

    renpy.exports.display_menu = custom_display_menu

