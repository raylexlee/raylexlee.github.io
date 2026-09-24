init -2 python:
    # 建立一個通用函數，將信號安全寫入 10ms 級別的臨時信號檔
    def send_tts_signal_v8(speaker, text):
        try:
            # 移除引號防範字串語法破裂
            safe_speaker = str(speaker).replace("'", "\\'").replace('"', '\\"')
            safe_text = str(text).replace("'", "\\'").replace('"', '\\"')
            
            with open("tts_signal.tmp", "w", encoding="utf-8") as f:
                f.write(safe_speaker + "|||" + safe_text)
        except:
            pass

    # ==========================================
    # 模式 A：當玩家按下 V 鍵開啟語音助理時（回顧/無障礙模式）
    # ==========================================
    if not hasattr(renpy.display.tts, '_original_speak'):
        renpy.display.tts._original_speak = renpy.display.tts.speak

    def custom_tts_speak(what, **kwargs):
        # 🎯 關鍵核心：只有在 V 鍵真正開啟的狀態下，這個接管才生效
        if not getattr(renpy.game.preferences, 'self_voicing', False):
            return

        if not what:
            return

        try:
            who = _last_say_who
            speaker_name = who.name if (who is not None and hasattr(who, 'name')) else (str(who) if who is not None else "Narrator")
        except:
            speaker_name = "Narrator"

        # 回顧模式下：直接把歷史紀錄、選單按鈕完整發送至 Edge
        send_tts_signal_v8(speaker_name, what)

    # 接管新引擎的 V 鍵官方語音助理出口（並將 David 徹底靜音）
    renpy.display.tts.speak = custom_tts_speak


    # ==========================================
    # 模式 B：當 V 鍵關閉時（沉浸式男女真人對白同步模式）
    # ==========================================
    # 備份 Ren'Py 8.3 內建官方原生的 say 函數
    if not hasattr(renpy.exports, '_original_say'):
        renpy.exports._original_say = renpy.exports.say

    def custom_tts_say(who, what, *args, **kwargs):
        """
        當遊戲試圖顯示任何台詞時觸發。
        根據 V 鍵的開關狀態，動態決定是否放行。
        """
        # 🎯 實現你的核心猜想：如果玩家按 V 開啟了語音助理
        # 我們【完全不執行自訂攔截】，直接原封不動還給原廠 say 函數放行！
        if getattr(renpy.game.preferences, 'self_voicing', False):
            return renpy.exports._original_say(who, what, *args, **kwargs)

        # -----------------------------------------------------------------
        # 反之，當 V 鍵關閉時（沉浸模式），我們才接管文字並高頻發送給 Edge 語音姬
        try:
            if who is not None:
                speaker_name = who.name if hasattr(who, 'name') else str(who)
            else:
                speaker_name = "Narrator"
        except:
            speaker_name = "Narrator"

        try:
            clean_text = str(substitute(what))
        except:
            clean_text = str(what)

        # 毫秒級發送最新一行對白文字
        if clean_text:
            send_tts_signal_v8(speaker_name, clean_text)

        # 繼續回傳給原廠流程，確保遊戲畫面流暢推進
        return renpy.exports._original_say(who, what, *args, **kwargs)

    # 實施 Monkey Patch 全面接管 Ren'Py 8.3 的 say 函數入口
    renpy.exports.say = custom_tts_say

