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
            # 去除 Ren'Py 潛在的文字樣式標籤 (如 {b}, {color})
            import re
            clean_choice = re.sub(r'\{[^}]*\}', '', str(choice_text))
            
            with open("tts_signal.tmp", "w") as f:
                # 選項統一使用旁白 Narrator 的聲線來朗讀
                f.write("Narrator|||" + clean_choice)
        except:
            pass

    # 安全註冊標準對白監聽
    if config.character_callback is None:
        config.character_callback = [direct_selenium_dialogue_callback]
    else:
        if isinstance(config.character_callback, list):
            config.character_callback.append(direct_selenium_dialogue_callback)
        else:
            # 防範 RevertableList 讀檔回溯地雷
            class TTSCallbackProxy(object):
                def __init__(self, old): self.old = old
                def __call__(self, e, i=True, **k):
                    direct_selenium_dialogue_callback(e, i, **k)
                    if self.old: self.old(e, i, **k)
            config.character_callback = TTSCallbackProxy(config.character_callback)

# ---- 🎯 關鍵黑科技：相容 Ren'Py 7.4.x 的動態 UI 懸停注入 ----
init 999 python:
    # 建立一個相容 Ren'Py 動作（Action）系統的自訂懸停動作類別
    class TTSChoiceHoverAction(renpy.ui.Action):
        def __init__(self, caption):
            self.caption = caption
        def __call__(self):
            # 當滑鼠移入時，觸發上面的寫入信號函數
            direct_selenium_choice_hover(self.caption)

    # 攔截並重寫 Ren'Py 官方選單的物品渲染邏輯
    if not hasattr(renpy.store, '_original_menu_items'):
        # 備份原有的選單行為
        pass

    # 最穩固的 7.4.x 做法：直接修改核心選擇 Button 的預設行為
    # 每當選單螢幕載入時，強行將 hovered 屬性與我們的 TTSChoiceHoverAction 綁定
    def _injected_choice_hover_handler(items):
        for item in items:
            if item.args and len(item.args) > 0:
                # 取得選項的文字標題 (Caption)
                caption = item.caption
                # 動態將行為塞進選單按鈕的 hovered 屬性中
                item.kwargs['hovered'] = TTSChoiceHoverAction(caption)

