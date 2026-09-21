window.ttsVoices = [];
window.characterMap = {};     // {"Judy": "Yan", "Narrator": "Yunxi"}
window.currentVoiceName = ""; // 當前語音小名 (例如 "Yan")

// 初始化獲取語音
function populateVoices() {
    window.ttsVoices = window.speechSynthesis.getVoices();
}
populateVoices();
if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = populateVoices;
}

// 解析 URL 參數並異步載入對應遊戲的 JSON 字典
function loadGameConfig() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameName = urlParams.get('game');
    const statusEl = document.getElementById('status');

    if (gameName) {
        fetch(`${gameName}.json`)
            .then(res => res.json())
            .then(data => {
                window.characterMap = data;
                if (!('Narrator' in window.characterMap)) window.characterMap['Narrator'] = 'Ryan';
                if (statusEl) statusEl.innerText = `已成功載入遊戲設定：${gameName}`;
            })
            .catch(() => {
                if (statusEl) statusEl.innerText = `載入 JSON 失敗`;
            });
    }
}
window.addEventListener('DOMContentLoaded', loadGameConfig);

// Python 調用：更換目前說話者的語音小名
window.changeVoiceBySpeaker = function(speakerName) {
    window.currentVoiceName = window.characterMap[speakerName] || window.characterMap['Narrator'] || '';
    console.log(`[聲線指令] ${speakerName} -> 尋找小名: ${window.currentVoiceName}`);
};

// 【終極修復版】強制實時抓取 334 個語音的 speak 函數
window.speak = function(message) {
    window.speechSynthesis.cancel(); // 掐斷上一句
    
    if (!message) return;
    const cleanMessage = String(message);
    // 🔥 【核心黑科技】：瞬間抹除所有的星號 * 防止語音姬唸出 "Asterisk"
    // /g 代表全域匹配，把所有星號替換成空字串
    cleanMessage = cleanMessage.replace(/\*/g, "");
    
    // 2. 額外防禦防護：順便抹除可能殘留的 Ren'Py {b} {/b} 等樣式代碼標籤
    cleanMessage = cleanMessage.replace(/\{[^}]*\}/g, "");    
    // 🔥 核心修正 1：在執行的當下，強制重新跟瀏覽器索取最即時的 334 個完整語音陣列！
    // 這能完美解決網頁初次加載時，陣列尚未填滿的時間差地雷
    let allVoices = window.speechSynthesis.getVoices();
    if (allVoices.length === 0) {
        allVoices = window.ttsVoices; // 備用緩衝
    }

    const utterance = new SpeechSynthesisUtterance(cleanMessage);
    
    // 🔥 核心修正 2：如果 Python 丟指令過來時 currentVoiceName 還沒被初始化（例如第一句對白太快）
    // 預設強制塞給它 Narrator 的語音（例如 Yunxi），拒絕讓它裸奔去找 David
    if (!window.currentVoiceName && window.characterMap['Narrator']) {
        window.currentVoiceName = window.characterMap['Narrator'];
    }

    // 實施模糊匹配搜尋
    let targetVoice = allVoices.find(v => 
        v.name.includes(window.currentVoiceName)
    );
    
    // 🔥 核心修正 3：防禦性 Fallback（萬一還是找不到指定的 Yan/Libby）
    // 絕對不讓它崩潰，直接在 334 個語音中強行抓取任何一個名字包含 "Natural" 或 "Online" 的高級真人語音
    if (!targetVoice && allVoices.length > 0) {
        targetVoice = allVoices.find(v => v.name.includes("Natural") || v.name.includes("Online"));
    }
    
    if (targetVoice) {
        utterance.voice = targetVoice;
        console.log(`[TTS 播放成功] 語音物件：${targetVoice.name} -> 內容: ${cleanMessage}`);
    } else {
        console.warn(`[TTS 播放警告] 無法匹配任何語音，將使用系統預設`);
    }
    
    window.speechSynthesis.speak(utterance);
};

