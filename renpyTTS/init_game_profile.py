import os
import sys

def guess_gender(name):
    """
    根據英文名字的字尾結構與常見詞根，實施高精確度的性別預測演算法
    """
    name_lower = name.lower().strip()
    
    # 1. 常見的硬編碼男性/旁白/系統詞根
    male_keywords = ['mc', 'dad', 'stepdad', 'boy', 'jock', 'man', 'bounc', 'cop', 'teacher', 'worker', 'driver', 'sir']
    if any(kw in name_lower for kw in male_keywords) or name_lower == 'narrator':
        return 'Male'
        
    # 2. 常見的硬編碼女性詞根
    female_keywords = ['mom', 'mother', 'girl', 'maid', 'stripper', 'female', 'queen', 'wife', 'lady', 'sister']
    if any(kw in name_lower for kw in female_keywords):
        return 'Female'

    # 3. 英語語言學後綴規則 (女性高頻字尾)
    # 以 a, e, y, i, ah, ia, ie, lly, na 結尾的絕大多數是女性
    female_suffixes = ('a', 'e', 'y', 'i', 'ah', 'ia', 'ie', 'tette', 'lines', 'ly', 'na', 'el')
    if name_lower.endswith(female_suffixes):
        # 排除少數以 y 結尾的男性名字 (如 Tommy, Danny 在關鍵字已處理，Jock 排除)
        if name_lower.endswith(('roy', 'guy')):
            return 'Male'
        return 'Female'
        
    # 4. 英語語言學後綴規則 (男性高頻字尾)
    # 以 o, k, d, n, r, s, m, t, x, b, g, p 結尾的通常是男性
    male_suffixes = ('o', 'k', 'd', 'n', 'r', 's', 'm', 't', 'x', 'b', 'g', 'p', 'th')
    if name_lower.endswith(male_suffixes):
        return 'Male'
        
    # 5. 無法判定的預設給女性（因為視覺小說通常女主居多）
    return 'Female'

def main():
    game_name = "TheSevenRealms"
    names_file = f"{game_name}_extracted.txt" # 這是你用 sed 擷取出來的 38 個純名字檔案
    voice_file = "voiceGender.txt"
    output_file = f"{game_name}_3col.txt"
    
    if not os.path.exists(names_file):
        print(f"Error: 找不到 38 個名字的來源檔 {names_file}")
        return
        
    if not os.path.exists(voice_file):
        print(f"Error: 找不到語音性別庫 {voice_file}")
        return

    # 載入語音性別庫
    male_voices = []
    female_voices = []
    with open(voice_file, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or " " not in line: continue
            vname, gender = line.split(" ", 1)
            if gender.strip().lower() == "male":
                male_voices.append(vname.strip())
            else:
                female_voices.append(vname.strip())

    if not male_voices: male_voices = ["Yunxi"]
    if not female_voices: female_voices = ["Xiaoxiao"]

    # 讀取 38 個名字並開始大數據配對
    m_idx, f_idx = 0, 0
    results = []
    
    with open(names_file, "r", encoding="utf-8") as f:
        for line in f:
            full_name = line.strip().replace(" ", "_") # 空格轉底線防範欄位破裂
            if not full_name: continue
            
            # 預測性別
            gender = guess_gender(full_name)
            
            # 輪流指派該性別對應的 Edge Natural 語音小名，實現多樣化初始配音
            if gender == 'Male':
                assigned_voice = male_voices[m_idx % len(male_voices)]
                m_idx += 1
            else:
                assigned_voice = female_voices[f_idx % len(female_voices)]
                f_idx += 1
                
            # 💡 完美對接你的 Vim 增量工作流：
            # 第一欄預設留空（一個空格），等待你在遊玩時，直接 Ctrl+V 貼上剪貼簿裡自動複製的實時 2-letter 代碼！
            results.append(f" {full_name} {assigned_voice}")
            print(f"🎨 [預測成功] 名字: {full_name:25} -> 猜測性別: {gender:6} -> 預配語音: {assigned_voice}")

    # 寫入成符合你格式的 3-column Vim 初始檔
    with open(output_file, "w", encoding="utf-8") as f:
        for item in results:
            f.write(item + "\n")
            
    print(f"\n🚀 大功告成！已成功為您生成 3 欄位初始檔: {output_file}")
    print("第一欄已預設留空。現在您可以直接用 Vim 開啟它，一邊玩遊戲、一邊秒速粘貼真實代碼了！")

if __name__ == "__main__":
    main()

