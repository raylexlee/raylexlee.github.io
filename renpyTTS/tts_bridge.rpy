init -1 python:
    # 1. 【全新核心】：利用文字過濾器安全攔截標準對白，100% 繞過 RevertableList 地雷
    def tts_say_text_filter(what):
        try:
            # 獲取當前說話的角色
            who = _last_say_who
            speaker_name = who.name if (who is not None and hasattr(who, 'name')) else (str(who) if who is not None else "Narrator")
        except:
            speaker_name = "Narrator"

        # 清理並轉化對白文字
        try:
            clean_text = str(substitute(what))
        except:
            clean_text = str(what)

        # 將說話者與對白寫入 10ms 級別的輪詢信號檔
        if clean_text:
            try:
                with open("tts_signal.tmp", "w") as f:
                    f.write(str(speaker_name) + "|||" + clean_text)
            except:
                pass

        # 這是過濾器的本職：必須把原始文字原封不動還給遊戲，畫面才能正常顯示
        return what

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

    # 建立與 Ren'Py 動作系統相容的自訂懸停 Action 類別
    class TTSChoiceHoverAction(ui.Action):
        def __init__(self, caption):
            self.caption = caption
        def __call__(self):
            direct_selenium_choice_hover(self.caption)


# ======================================================================
# 🎯 2. 記憶體黑客安全注入（安全期實施）
# ======================================================================
init 999 python:
    # 🎯 終極防禦 A：將我們的發聲器綁定到文字過濾器上，存讀檔回溯絕對不會崩潰！
    config.say_menu_text_filter = tts_say_text_filter

    # 🎯 終極防禦 B：安全攔截 RPA 內的選單出口 (Monkey Patch)
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

