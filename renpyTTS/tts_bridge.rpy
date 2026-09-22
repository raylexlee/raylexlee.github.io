init -1 python:
    # 1. 備份 Ren'Py 內建官方原生的 say 函數（以防萬一與交還主權）
    if not hasattr(renpy.exports, '_original_say'):
        renpy.exports._original_say = renpy.exports.say

    # 2. 定義我們自己的攔截 say 函數
    def custom_tts_say(who, what, *args, **kwargs):
        """
        當遊戲試圖調用 say 顯示任何台詞時，瞬間優先觸發本函數。
        who: 角色物件或字串
        what: 對白文字
        """
        try:
            # 安全解析角色名稱
            if who is not None:
                speaker_name = who.name if hasattr(who, 'name') else str(who)
            else:
                speaker_name = "Narrator"
        except:
            speaker_name = "Narrator"

        # 安全清理文字並進行 Ren'Py 變數 substitute
        try:
            clean_text = str(renpy.substitute(what))
        except:
            clean_text = str(what)

        # 毫秒級寫入臨時信號檔通知 Python 3 驅動 Edge 發聲
        if clean_text:
            try:
                with open("tts_signal.tmp", "w") as f:
                    f.write(str(speaker_name) + "|||" + clean_text)
            except:
                pass

        # 🎯 核心關鍵：把所有參數原封不動交還給原本的 say 函數，讓遊戲畫面正常前進
        return renpy.exports._original_say(who, what, *args, **kwargs)

    # 3. 實施 Monkey Patch，強行用我們的發聲器全面接管 Ren'Py 的 say 函數出口
    renpy.exports.say = custom_tts_say

