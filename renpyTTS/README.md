# 🚀 Ren'Py Direct TTS Bridge (Edge Natural Voices)

一個為 Ren'Py 引擎遊戲打造的**免伺服器（Flask-Free）、免 Selenium 控制、零延遲、記憶體直連**的第三方高畫質語音姬方案。

本專案透過微軟 Edge 瀏覽器原生的**遠端偵錯埠 (Chrome DevTools Protocol - CDP)** 機制，直接操控 Microsoft Edge 的高自然度雲端雙語語音（Online Natural Voices），並原生支援**遊戲對白角色聲線分流**與**滑鼠懸停選項實時朗讀**。

特別適合用於開發者停用了語音助理（Self-Voicing）的遊戲（如 *Milfy City*、*Being a DIK* 等），提供極致的沉浸式男女聲線配音與盲人無障礙優化體驗。

---

## ✨ 核心特性

- ⚡ **零延遲 CDP 直連**：拋棄傳統的本地 Flask 伺服器與沉重的 Selenium 框架，直接利用 WebSocket 與瀏覽器底層通訊，實現毫秒級無感響應。
- 🕵️ **100% 偽裝解鎖雲端語音**：使用原生命令列引導獨立的 Edge 偵錯沙盒，徹底抹除自動化測試指紋（`webdriver`），完美初始化 Edge 內建的 334 個高級自然語音套件。
- 🗣️ **智能精準聲線分流**：透過極簡的 JSON 對照表，自動根據角色名稱匹配對應的 Natural 語音。採用「空格邊界精準匹配」演算法，徹底杜絕錯認（如將 `Yan` 誤配為 `Ryan`）。
- 🔄 **記憶體極致優化**：網頁端全域重複利用單一 `SpeechSynthesisUtterance` 執行個體，在對白推進或滑鼠快速晃動時，極速「掐斷（Cancel）」上一句，體驗絲滑。

---

## 🛠️ 安裝與環境準備

### 1. Windows 原生 Python 環境
請確保您的 Windows 11 系統已安裝 **Python 3.13+**。
打開命令提示字元 (CMD) 並執行以下指令，安裝極輕量的 WebSocket 遠端控制依賴：
```bash
pip install websocket-client
```

### 2. 下載本專案檔案
將以下核心檔案部署到您的遊戲目錄與 GitHub Pages 中。

---

## 📦 檔案結構與部署說明

### 🌐 A. 網頁 TTS 端 (上傳至您的 GitHub Pages)
請將 `tts.html`, `tts.js` 以及遊戲的 `.json` 配置文件放置於您的 GitHub 倉庫中（例如 `https://<您的用戶名>.github.io/renpyTTS/`）：

- **`tts.html`**: 語音快取與解鎖網頁。
- **`tts.js`**: 重複利用全域 Utterance，具備實時加載 334 個語音的防異步時間差機制。
- **`[遊戲名稱].json`**: 角色與語音對應表。格式極簡，僅需填入語音名字的第二個單字：
  ```json
  {
      "Narrator": "Yunxi",
      "Judy": "Yan",
      "Caroline": "Libby",
      "MC": "William"
  }
  ```

> 💡 **小工具提示**：本專案內附 `genJSON.sh` 腳本（適用於 WSL/Linux）。只要您用 Ren'Py 導出角色清單 `Game.txt`（每行如 `Judy Yan`），執行 `./genJSON.sh Game` 即可秒級生成標準 JSON 映射表。

---

### 🎮 B. 遊戲注入端 (放置於 Steam 遊戲目錄下)

1. **`game/tts_bridge.rpy`**
   直接放入遊戲的 `game/` 資料夾下。負責接管對白觸發與讀檔回溯（相容 7.4.x 的 `RevertableList` 結構），並以 10ms 級別將信號寫入極輕量的 `tts_signal.tmp`。

2. **`run_milfy_city.py`** (或重命名為 `run_game.py`)
   放入遊戲的**根目錄**（與 `renpy/` 和 `game/` 資料夾同層）。作為唯一的啟動主程式，負責拉起 Edge 偵錯沙盒、引導遊戲原生的 `.exe` 執行，並接管高頻信號輪詢。

---

## 🚀 啟動與遊玩步驟

1. 打開 Windows CMD，切換至遊戲根目錄。
2. 執行啟動腳本：
   ```bash
   python run_milfy_city.py
   ```
3. 腳本會自動拉起一個全新的 Edge 偵錯視窗並加載語音頁面。**【重要】請用滑鼠在該網頁任意空白處點擊一下**，以解鎖瀏覽器的音訊播放安全限制。
4. 隨後原生的遊戲畫面會自動彈出。盡情享受絲滑、男女聲線分明的高音質自然語音配音之旅吧！

---

## 🛡️ 免責聲明與開源授權
本專案僅供學術交流、研究 Ren'Py 引擎進程間通訊機制以及盲人無障礙技術優化使用。請勿用於任何商業用途。

