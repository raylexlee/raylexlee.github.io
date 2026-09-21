// 核心全域變數
window.ttsVoices = [];
window.characterMap = {};     // 儲存從 JSON 載入的 角色名 -> 語音小名 (例如 {"Judy": "Yan"})
window.voiceCache = {};        // 快取字典：語音小名 -> 實體 SpeechSynthesisVoice 物件

// 【核心優化】：全域重複利用同一個 Utterance 物件
window.globalUtterance = new SpeechSynthesisUtterance();

// 初始化獲取語音清單
function populateVoices() {
    window.ttsVoices = window.speechSynthesis.getVoices();
}
populateVoices();
if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = populateVoices;
}

// 根據小名尋找或從快取返回 Voice 物件
function getVoiceByShortName(shortName) {
    if (!shortName) return null;
    
    // 如果快取裡已經有了，直接返回，避免重複搜尋
    if (window.voiceCache[shortName]) {
        return window.voiceCache[shortName];
    }
    
    // 否則，在瀏覽器支援的語音清單中進行模糊搜尋
    const foundVoice = window.ttsVoices.find(v => 
        v.name.toLowerCase().includes(shortName.toLowerCase())
    );
    
    if (foundVoice) {
        window.voiceCache[shortName] = foundVoice; // 存入快取
        return foundVoice;
    }
    return null;
}

// 解析 URL 參數並異步載入對應遊戲的 JSON 字典
function loadGameConfig() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameName = urlParams.get('game');
    const statusEl = document.getElementById('status');

    if (gameName) {
        fetch(`${gameName}.json`)
            .then(res => { if (!res.ok) throw new Error(); return res.json(); })
            .then(data => {
                window.characterMap = data;
                if (statusEl) statusEl.innerText = `已成功載入遊戲設定：${gameName}`;
            })
            .catch(() => {
                if (statusEl) statusEl.innerText = `載入 ${gameName}.json 失敗，將使用預設語音`;
            });
    } else {
        if (statusEl) statusEl.innerText = "未指定遊戲參數 (?game=...)";
    }
}
window.addEventListener('DOMContentLoaded', loadGameConfig);

// 【全新改版】：Python 會調用這個函數來換聲音
window.changeVoiceBySpeaker = function(speakerName) {
    // 查表：角色名 -> 語音小名，找不到就用旁白 Narrator
    const shortVoiceName = window.characterMap[speakerName] || window.characterMap['Narrator'] || '';
    const targetVoice = getVoiceByShortName(shortVoiceName);
    
    if (targetVoice) {
        window.globalUtterance.voice = targetVoice;
        console.log(`聲線切換成功: [${speakerName}] -> ${targetVoice.name}`);
    }
};

// 【簡化版 speak】：只接受一個訊息參數
window.speak = function(message) {
    window.speechSynthesis.cancel(); // 瞬間掐斷上一句，保障流暢度
    // 【核心修復】：如果發現傳進來的是 Selenium 的 arguments 物件，從中取出真正的對白字串
    let cleanMessage = message;
    if (message && typeof message === 'object' && message.length !== undefined) {
        cleanMessage = message[0];
    }
    
    if (!cleanMessage) return "Empty message";    
    
    // 更新全域 Utterance 的內文
    window.globalUtterance.text = cleanMessage;
    
    window.speechSynthesis.speak(window.globalUtterance);
};

