init -1 python:
    # 🎯 核心黑客通道：利用對白屬性處理器安全捕捉文字與聲線，100% 繞過 RevertableList 地雷
    def tts_say_attribute_processor(speaker, attributes):
        try:
            # 1. 抓取說話者的名字
            who = _last_say_who
            speaker_name = who.name if (who is not None and hasattr(who, 'name')) else (str(who) if who is not None else "Narrator")
            
            # 2. 抓取當前的對白內文
            what = _last_say_what
            clean_text = str(substitute(what)) if what else ""
        except:
            speaker_name = "Narrator"
            clean_text = ""

        # 3. 如果成功拿到對白，以 10ms 的極速寫入信號臨時檔
        if clean_text:
            try:
                with open("tts_signal.tmp", "w") as f:
                    f.write(str(speaker_name) + "|||" + clean_text)
            except:
                pass

        # 這是處理器的本職：必須把原本傳進來的屬性原封不動還給遊戲，畫面才能正常渲染
        return attributes

# ======================================================================
# 🎯 2. 記憶體黑客安全注入（安全期實施）
# ======================================================================
init 999 python:
    # 🎯 終極防禦：將我們的發聲器綁定到屬性處理器上，存讀檔回溯與 V 鍵衝突徹底絕跡！
    config.say_attribute_proc = tts_say_attribute_processor

