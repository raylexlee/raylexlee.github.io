#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: $0 [GameName] (e.g., $0 BeingADIK)"
    exit 1
fi

INPUT="${1}.txt"
OUTPUT="${1}_3col.txt"

if [ ! -f "$INPUT" ]; then
    echo "Error: $INPUT not found!"
    exit 1
fi

echo "Generating 3-column configuration and checking for key collisions..."

# 宣告一個關聯陣列用來檢查重複
declare -A seen_keys

# 先清空或建立輸出的 3col 檔案
echo -n "" > "$OUTPUT"

while IFS= read -r line || [ -n "$line" ]; do
    line=$(echo "$line" | tr -d '\r' | xargs)
    [ -z "$line" ] && continue
    [[ "$line" =~ ^# ]] && continue

    read -r -a words <<< "$line"
    FULL_NAME="${words[0]}"
    VOICE_NAME="${words[1]}"
    
    # 預設抓取前兩個字元並轉小寫
    CODE=$(echo "${FULL_NAME:0:2}" | tr '[:upper:]' '[:lower:]')

    # 檢查是否有衝突
    if [ -n "${seen_keys[$CODE]}" ]; then
        # 發現衝突！印出醒目的提示，告訴你誰和誰撞了
        echo -e "\033[0;31m[COLLISION WARNING]\033[0m Code '$CODE' is duplicated! Already used by: '${seen_keys[$CODE]}'. Current: '$FULL_NAME'"
    else
        seen_keys[$CODE]="$FULL_NAME"
    fi

    # 寫入 3 欄位格式
    printf "%s %s %s\n" "$CODE" "$FULL_NAME" "$VOICE_NAME" >> "$OUTPUT"
done < "$INPUT"

echo "-------------------------------------------------------"
echo "Done! Initial 3-column file saved to: $OUTPUT"
echo "Please manually open it and fix any conflicting codes (e.g., change 'ca' to 'ct')."

