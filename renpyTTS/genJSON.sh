#!/bin/bash

# 1. 檢查參數是否正確
if [ -z "$1" ]; then
    echo "錯誤：請指定遊戲名稱！"
    echo "用法：$0 [遊戲名稱]  (例如: $0 MilfyCity)"
    exit 1
fi

GAME_NAME="$1"
INPUT_FILE="${GAME_NAME}.txt"
OUTPUT_FILE="${GAME_NAME}.json"

# 2. 檢查輸入的 .txt 檔案是否存在
if [ ! -f "$INPUT_FILE" ]; then
    echo "錯誤：找不到輸入檔案 ${INPUT_FILE}！"
    exit 1
fi

echo "正在從 ${INPUT_FILE} 生成 ${OUTPUT_FILE}..."

# 3. 開始建立 JSON 結構
echo "{" > "$OUTPUT_FILE"

# 用來判斷是否需要加逗號分離 JSON 欄位
FIRST_LINE=true

# 4. 逐行讀取文字檔
# 使用 IFS= 確保完整讀取每一行（包含空白），並移除 Windows 的 \r 換行符號
while IFS= read -r line || [ -n "$line" ]; do
    # 清理行尾的 Windows \r 回車符號
    line=$(echo "$line" | tr -d '\r' | xargs)
    
    # 略過空行
    [ -z "$line" ] && continue

    # 將整行拆分為陣列（以空格分隔）
    read -r -a words <<< "$line"
    
    KEY="${words[0]}"
    VALUE="${words[1]}"

    # 如果角色名字只有一個單字，給予一個預設語音，避免 JSON 空白
    if [ -z "$VALUE" ]; then
        VALUE="Yunxi"
    fi

    # 如果不是第一行，在上一行結尾補上逗號
    if [ "$FIRST_LINE" = true ]; then
        FIRST_LINE=false
    else
        echo "," >> "$OUTPUT_FILE"
    fi

    # 寫入一筆 JSON 鍵值對 (印出格式如:   "Judy": "Yan")
    printf '    "%s": "%s"' "$KEY" "$VALUE" >> "$OUTPUT_FILE"

done < "$INPUT_FILE"

# 5. 結束 JSON 結構
echo "" >> "$OUTPUT_FILE"
echo "}" >> "$OUTPUT_FILE"

echo "成功！已生成 ${OUTPUT_FILE}。"

