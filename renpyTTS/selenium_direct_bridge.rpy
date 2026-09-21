init -1 python:
    # 核心回調：處理標準對白跳出
    def direct_selenium_dialogue_callback(event, interact=True, **kwargs):
        if event == "show" or event == "begin":
            if not hasattr(renpy.store, 'selenium_driver'):
                return
                
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
                # 1. 叫 Edge 切換到該角色的聲音
                renpy.store.selenium_driver.execute_script("window.changeVoiceBySpeaker(arguments);", str(speaker_name))
                # 2. 朗讀訊息
                renpy.store.selenium_driver.execute_script("window.speak(arguments);", clean_text)
            except:
                pass

    # 【新增功能】：處理滑鼠懸停選項時的即時朗讀
    def direct_selenium_choice_hover_callback(choice_text):
        if not choice_text or not hasattr(renpy.store, 'selenium_driver'):
            return
            
        try:
            # 選項通常由系統/旁白聲音（Narrator）來讀
            renpy.store.selenium_driver.execute_script("window.changeVoiceBySpeaker('Narrator');")
            # 朗讀目前滑鼠指著的選項文字
            renpy.store.selenium_driver.execute_script("window.speak(arguments);", str(choice_text))
        except:
            pass

    # 註冊標準對白監聽
    config.character_callback.append(direct_selenium_dialogue_callback)
    
    # 註冊選項懸停監聽（Ren'Py 內建：當滑鼠 hover 選項時會觸發此函數並傳入選項文字）
    config.choosing = direct_selenium_choice_hover_callback

