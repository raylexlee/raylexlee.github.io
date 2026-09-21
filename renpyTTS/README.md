# 🚀 Ren'Py Direct TTS Bridge (Edge Natural Voices)

一個為 Ren'Py 引擎遊戲打造的**免伺服器（Flask-Free）、零延遲、記憶體直連**的第三方高畫質語音姬方案。本專案透過 Web Speech API 直接操控 Microsoft Edge 的高自然度雲端雙語語音，並原生支援**遊戲對白角色聲線分流**與**滑鼠懸停選項實時朗讀**。

特別適合用於開發者停用了語音助理（Self-Voicing）的遊戲（如 *Milfy City*、*Being a DIK* 等），提供極致的沉浸式配音與盲人無障礙優化體驗。

---

## ✨ 核心特性

- ⚡ **零延遲直連**：拋棄傳統的本地 Flask API 伺服器，直接將 Selenium Webdriver 記憶體指標注入 Ren'Py 核心，實現毫秒級響應。
- 🗣️ **智能聲線切換**：透過簡單的 JSON 對照表，自動根據當前說話的角色名稱模糊匹配 Edge 瀏覽器內對應的 Natural 語音。
- 🔄 **記憶體極致優化**：網頁端全域重複利用單一 `SpeechSynthesisUtterance` 執行個體，建立語音物件快取字典，拒絕瀏覽器記憶體碎片化。
- 🖱️ **選項懸停朗讀 (Choice Hover TTS)**：當畫面上出現多選對話分支時，滑鼠移到哪個選項，語音就會立刻讀出該選項，極速掐斷上一句，體驗流暢。

---

## 🛠️ 安裝與環境準備

### 1. Windows 原生 Python 環境
請確保您的 Windows 11 系統已安裝 **Python 3.13+**。
打開命令提示字元 (CMD) 並執行以下指令安裝自動化依賴：
```bash
pip install selenium webdriver-manager
```

### 2. 下載本專案檔案
將以下核心檔案部署到您的遊戲目錄與 GitHub Pages 中。

---

## 📦 檔案結構與部署說明

### 🌐 A. 網頁 TTS 端 (上傳至您的 GitHub Pages)
請將 `tts.html`, `tts.js` 以及遊戲的 `.json` 配置文件放置於您的 GitHub 倉庫中（例如 `https://<您的用戶名>.github.io/renpyTTS/`）：

- **`tts.html`**: 語音快取與解鎖網頁。
- **`tts.js`**: 重複利用全域 Utterance，維護 `小名 -> 實體語音` 快取字典。
- **`[遊戲名稱].json`**: 角色與語音對應表。格式極簡，僅需填入語音名字的第二個單字：
  ```json
  {
      "Narrator": "Yunxi",
      "Judy": "Yan",
      "Caroline": "Libby",
      "Tommy": "William"
  }
  ```

> 💡 **小工具提示**：本專案內附 `genJSON.sh` 腳本（適用於 WSL/Linux）。只要您用 Ren'Py 導出角色清單 `Game.txt`（每行如 `Judy Yan`），執行 `./genJSON.sh Game` 即可秒級生成標準 JSON 映射表。

---

### 🎮 B. 遊戲注入端 (放置於 Steam 遊戲目錄下)

1. **`game/selenium_direct_bridge.rpy`**
   直接放入遊戲的 `game/` 資料夾下。負責接管 `config.character_callback`（對白觸發）與 `config.choosing`（滑鼠懸停選項觸發），並將資料直連傳遞。

2. **`run_game.py`**
   放入遊戲的**根目錄**（與 `renpy/` 和 `game/` 資料夾同層）。作為唯一的啟動主程式：
   ```python
   # 請根據需求修改 run_game.py 頂部的參數
   GAME_NAME = "MilfyCity"
   TARGET_URL = f"https://<您的用戶名>.github.io/renpyTTS/tts.html?game={GAME_NAME}"
   ```

---

## 🚀 啟動與遊玩步驟

1. 打開 Windows CMD，切換至遊戲根目錄。
2. 執行啟動腳本：
   ```bash
   python run_game.py
   ```
3. 腳本會自動拉起一個全新的 Edge 瀏覽器並加載語音頁面。**【重要】請用滑鼠在該網頁任意空白處點擊一下**，以解鎖瀏覽器的音訊播放安全限制。
4. 隨後 Ren'Py 遊戲畫面會自動彈出。盡情享受絲滑的高音質自然語音配音之旅吧！

---

## 🛡️ 免責聲明與開源授權
本專案僅供學術交流、研究 Ren'Py 引擎記憶體運作機制以及盲人無障礙技術優化使用。請勿用於任何商業用途。

