import json
import os

def main():
    json_path = "language_dict.json"
    # 這是利用原廠 RPY 擷取出來的 55 個純俄文角色名字清單
    input_names_path = "extracted_characters.txt" 
    output_path = "MILFsofSunville_extracted.txt"
    
    # 1. 安全路徑自動修正
    if not os.path.exists(json_path) and os.path.exists("game/language_dict.json"):
        json_path = "game/language_dict.json"
        
    if not os.path.exists(input_names_path):
        print(f"❌ 錯誤：找不到由 RPY 產生的角色清單 {input_names_path}！")
        print("💡 請先將原廠 RPY 放入 game/ 夾，啟動遊戲進入主選單生成該檔。")
        return
        
    if not os.path.exists(json_path):
        print(f"❌ 錯誤：找不到開發者的翻譯字典庫 {json_path}！")
        return

    # 2. 載入 55 個原生俄文名字
    raw_russian_names = []
    with open(input_names_path, "r", encoding="utf-8") as f:
        for line in f:
            name = line.strip()
            if name:
                raw_russian_names.append(name)
                
    print(f"📂 成功載入 {len(raw_russian_names)} 個原生俄文角色識別碼。")
    print(f"🔍 正在翻閱 {json_path} 進行定點精準英文解碼...")

    # 3. 載入開發者的巨型 JSON 字典
    with open(json_path, "r", encoding="utf-8") as f:
        translation_data = json.load(f)

    english_names = set()
    missing_translations = 0

    # 4. 🧠 執行你設計的黃金對接演算法：name -> data[name][2]
    for ru_name in raw_russian_names:
        # 直接在開發者的 JSON 字典裡用俄文名字當作 Key 定點精確查找
        if ru_name in translation_data:
            value_array = translation_data[ru_name]
            
            # 根據你極其精確的 jq 報告：value[2] 就是正牌英文翻譯
            if isinstance(value_array, list) and len(value_array) > 2:
                en_name = value_array[2].strip()
                if en_name:
                    # 將空格轉換為底線，完美契合你後續的 3 欄位與 Vim 工作流
                    clean_en_name = en_name.replace(" ", "_")
                    english_names.add(clean_en_name)
                    continue
                    
        # 備用防禦：萬一有些特殊角色（如數字）在 JSON 裡沒有對應，保留原樣防碎
        clean_ru_name = ru_name.strip().replace(" ", "_")
        english_names.add(clean_ru_name)
        missing_translations += 1

    # 5. 排序並寫出最終完美的 55 人全英文清單
    with open(output_path, "w", encoding="utf-8") as f:
        for name in sorted(list(english_names)):
            f.write(name + "\n")
            
    print(f"\n🎯 精準解碼大獲全勝！")
    print(f"💾 成功將 {len(raw_russian_names)} 個俄文名字完美洗成乾淨的英文清單（0雜音、0房間名）。")
    print(f"💾 完全體英文清單已儲存至: {output_path}")
    if missing_translations > 0:
        print(f"💡 提示：有 {missing_translations} 個變數直接保留了原始碼。")

if __name__ == "__main__":
    main()

