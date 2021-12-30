var synth = window.speechSynthesis;
var btnSpeak = document.getElementById('btnSpeak');
var btnStop = document.getElementById('btnStop');
var myVoice = document.getElementById('myVoice');
var myContent = document.getElementById('myContent');
var voices = [];
var hkvoices, hkspeaker;

function myInit() {
 voices = synth.getVoices();
 hkvoices = voices.filter(e => e.lang === 'zh-HK');
 hkspeaker = hkvoices[0];
 myVoice.innerText = hkspeaker.name;
}


function speak(){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (myContent.value !== '') {
    var utterThis = new SpeechSynthesisUtterance(myContent.value);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    utterThis.voice = hkspeaker;
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
  }
}

function stop() {}
