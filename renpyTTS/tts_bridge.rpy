# ======================================================================
# 🎯 核心黑客注入：強行幫 Milfy City 復活 V 鍵自動語音功能
# ======================================================================
init -5 python:
    # 1. 強制修復暫存偏好：將自動語音的功能硬生生塞回遊戲的 Keymap 鍵盤映射表中
    if 'toggle_voice' in config.keymap:
        if 'v' not in config.keymap['toggle_voice']:
            config.keymap['toggle_voice'].append('v')
    else:
        config.keymap['toggle_voice'] = ['v']

    # 2. 通用的極速 JSON 字串信號發送函數 (10ms 臨時檔輪詢)
    def send_tts_signal(speaker, text):
        try:
            with open("tts_signal.tmp", "w") as f:
                f.write(str(speaker) + "|||" + str(text))
        except:
            pass

# ======================================================================
# 模式 A：當玩家按下 V 鍵開啟語音助理時（回顧/無障礙模式）
# ======================================================================
init -2 python:
    # 備份 Ren'Py 官方底層的 speak 函數
    if not hasattr(renpy.display.tts, '_original_speak'):
        renpy.display.tts._original_speak = renpy.display.tts.speak

    def custom_tts_speak(what, **kwargs):
        # 僅在 V 鍵開啟的無障礙狀態下運作
        if not renpy.game.preferences.tts:
            return
        if not what:
            return

        try:
            who = _last_say_who
            speaker_name = who.name if (who is not None and hasattr(who, 'name')) else (str(who) if who is not None else "Narrator")
        except:
            speaker_name = "Narrator"

        # 回顧模式下：直接把畫面上積累的文字完整丟給 Edge，供玩家 review 舊對話
        send_tts_signal(speaker_name, what)

    # 實施 Monkey Patch 覆蓋復活後的 V 鍵輸出
    renpy.display.tts.speak = custom_tts_speak

# ======================================================================
# 模式 B：當 V 鍵關閉時（沉浸式推新劇情模式）
# ======================================================================
init 999 python:
    def immersive_dialogue_hook(event, interact=True, **kwargs):
        # 如果玩家開了 V 鍵，沉浸模式自動讓道給模式 A
        if renpy.game.preferences.tts:
            return

        if event == "show" or event == "begin":
            try:
                who = _last_say_who
                what = _last_say_what
                speaker_name = who.name if (who is not None and hasattr(who, 'name')) else (str(who) if who is not None else "Narrator")
            except:
                speaker_name = "Narrator"
                what = ""

            # 轉為標準字串並清理 Ren'Py 的內建標籤
            clean_text = str(substitute(what))
            if not clean_text:
                return

            # 迅速發送最新對白（完全異步，不佔用遊戲執行緒渲染時間）
            send_tts_signal(speaker_name, clean_text)

    # 將此沉浸式回調附加到最末期清單中，安全 append 拒絕 RevertableList 讀檔地雷
    if config.character_callback is None:
        config.character_callback = [immersive_dialogue_hook]
    else:
        if immersive_dialogue_hook not in config.character_callback:
            config.character_callback.append(immersive_dialogue_hook)

