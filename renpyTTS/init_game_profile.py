import os
import sys

def guess_gender(name):
    """
    根據英文名字的字尾結構與常見詞根，實施高精確度的性別預測演算法
    """
    name_lower = name.lower().strip()
    
    # 1. 常見的硬編碼男性/旁白/系統詞根
    male_keywords = ['mc', 'dad', 'stepdad', 'boy', 'jock', 'man', 'bounc', 'cop', 'teacher', 'worker', 'driver', 'sir', 'lord', 'king']
    if any(kw in name_lower for kw in male_keywords) or name_lower == 'narrator':
        return 'Male'
        
    # 2. 常見的硬編碼女性詞根
    female_keywords = ['mom', 'mother', 'girl', 'maid', 'stripper', 'female', 'queen', 'wife', 'lady', 'sister', 'witch', 'goddess']
    if any(kw in name_lower for kw in female_keywords):
        return 'Female'

    # 3. 英語語言學後綴規則 (女性高頻字尾)
    female_suffixes = ('a', 'e', 'y', 'i', 'ah', 'ia', 'ie', 'tette', 'lines', 'ly', 'na', 'el')
    if name_lower.endswith(female_suffixes):
        if name_lower.endswith(('roy', 'guy')):
            return 'Male'
        return 'Female'
        
    # 4. 英語語言學後綴規則 (男性高頻字尾)
    male_suffixes = ('o', 'k', 'd', 'n', 'r', 's', 'm', 't', 'x', 'b', 'g', 'p', 'th')
    if name_lower.endswith(male_suffixes):
        return 'Male'
        
    # 5. 無法判定的預設給女性
    return 'Female'

def main():
    # 🎯 核心升級：讀取命令列引數
    # 檢查使用者有沒有輸入遊戲名稱參數
    if len(sys.argv) < 2:
        print("\n❌ 錯誤：未指定遊戲名稱！")
        print("💡 用法範例：python init_game_profile.py TheSevenRealms")
        print("💡 用法範例：python init_game_profile.py MilfyCity\n")
        return

    # 取得命令列傳入的遊戲名稱
    game_name = sys.argv[1]
    
    names_file = f"{game_name}_extracted.txt" # 讀取該遊戲的名字清單 (如 TheSevenRealms_extracted.txt)
    voice_file = "voiceGender.txt"
    output_file = f"{game_name}_3col.txt"     # 輸出該遊戲的 3 欄位設定檔 (如 TheSevenRealms_3col.txt)
    
    if not os.path.exists(names_file):
        print(f"❌ Error: 找不到該遊戲的名字來源檔: {names_file}")
        return
        
    if not os.path.exists(voice_file):
        print(f"❌ Error: 找不到語音性別庫 {voice_file}，請確保它存在於同目錄下！")
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

    # 讀取名字並開始自動批量配對
    m_idx, f_idx = 0, 0
    results = []
    
    print(f"🚀 正在為遊戲 [{game_name}] 進行智能性別預測與語音初步配對...")
    
    with open(names_file, "r", encoding="utf-8") as f:
        for line in f:
            full_name = line.strip().replace(" ", "_") # 空格轉底線防範欄位破裂
            if not full_name: continue
            
            gender = guess_gender(full_name)
            
            if gender == 'Male':
                assigned_voice = male_voices[m_idx % len(male_voices)]
                m_idx += 1
            else:
                assigned_voice = female_voices[f_idx % len(female_voices)]
                f_idx += 1
                
            # 第一欄保持單一空格，對齊你的 Vim 工作流
            results.append(f" {full_name} {assigned_voice}")
            print(f"  ↳ [Match] {full_name:25} -> {gender:6} -> {assigned_voice}")

    # 寫入成 3-column Vim 初始檔
    with open(output_file, "w", encoding="utf-8") as f:
        for item in results:
            f.write(item + "\n")
            
    print(f"\n✅ 成功！已為 [{game_name}] 生成 3 欄位初始檔: {output_file}")

if __name__ == "__main__":
    main()

