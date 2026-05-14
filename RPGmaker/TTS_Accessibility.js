(function() {
    // 預設模式：'alternate', 'male', 'female'
    let ttsMode = 'alternate'; 
    let currentGender = 'male'; 
    const ttsRate = 1.1;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance('raylexlee');
    // 朗讀結束後觸發自動翻轉
    utterance.onend = function() {
        if (ttsMode === 'alternate') {
            currentGender = (currentGender === 'male') ? 'female' : 'male';
        }
    };

    // --- 1. 熱鍵監聽 (M, F, A) ---
    document.addEventListener('keydown', function(event) {
        const key = event.key.toLowerCase();
        
        if (key === 'm') {
            ttsMode = 'male';
            currentGender = 'male';
        } else if (key === 'f') {
            ttsMode = 'female';
            currentGender = 'female';
        } else if (key === 'a') {
            ttsMode = 'alternate';
        }
    });

    // --- 2. 語音執行與自動翻轉 ---
    const speak = function(text) {
        if (!text || text.trim().length === 0) return;
        synth.cancel();

        const voices = synth.getVoices();
        const Emma = voices.find(v => v.name.includes("Emma"));
        const fVoice = Emma ? Emma : voices.find(v => v.name.includes("Aria") || v.name.includes("Zira") || v.name.includes("Female"));
        const Ryan = voices.find(v => v.name.includes("Ryan"));
        const mVoice = Ryan ? Ryan : voices.find(v => v.name.includes("Guy") || v.name.includes("David") || v.name.includes("Male"));

        utterance.text = text;
//        utterance.lang = 'en-US';
        utterance.rate = ttsRate;

        // 根據目前性別設定語音
        if (currentGender === 'female') {
            utterance.voice = fVoice || null;
            utterance.pitch = 1.3;
        } else {
            utterance.voice = mVoice || null;
            utterance.pitch = 0.9;
        }


        synth.speak(utterance);
    };

    // --- 3. 核心過濾與觸發 (穩定版) ---
    const cleanText = function(text) {
        if (!text || text.trim().length === 0) return "";
        try {
            let decoded = Window_Base.prototype.convertEscapeCharacters(text);
            return decoded
                .replace(/\x1b[a-z]+(\[[^\]]*\])?/gi, '') 
                .replace(/\x1b[a-z]+(<[^>]*>)?/gi, '')
                .replace(/\x1b[\.!\{\}><\^]/g, '')
                .replace(/\x1b/g, '') 
                .replace(/\\[a-z]\[[^\]]*\]/gi, '') 
                .replace(/\\[a-z]/gi, '') 
                .replace(/<[^>]+>/g, '') 
                .replace(/[^\u0020-\u007e\u4e00-\u9fa5\u3000-\u303f\uff01-\uff5e]/g, '')
                .replace(/\s+/g, ' ')
                .trim();
        } catch (e) { return ""; }
    };

    const _Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        _Window_Message_startMessage.call(this);
        setTimeout(() => {
            if (typeof $gameMessage !== 'undefined') {
                const speech = cleanText($gameMessage.allText());
                if (speech) speak(speech);
            }
        }, 350);
    };

    // 選單朗讀也包含進來，確保完整性
    const _Window_Selectable_select = Window_Selectable.prototype.select;
    Window_Selectable.prototype.select = function(index) {
        _Window_Selectable_select.call(this, index);
        if (this.active && index >= 0 && index < this.maxItems()) {
            let cmd = "";
            try {
                if (typeof this.commandName === 'function') cmd = this.commandName(index);
                else if (typeof this.item === 'function' && this.item(index)) cmd = this.item(index).name || "";
            } catch (e) {}
            const speech = cleanText(cmd);
            if (speech) speak(speech);
        }
    };
})();

