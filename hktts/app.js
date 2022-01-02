const synth = window.speechSynthesis;
const btnSpeak = document.getElementById('btnSpeak');
const btnStop = document.getElementById('btnStop');
const myVoice = document.getElementById('myVoice');
const myContent = document.getElementById('myContent');
const rate = document.querySelector('#rate');
let voices = [];
let hkvoices, hkspeaker;
let utterThis;

function myInit() {
 voices = synth.getVoices();
 hkvoices = voices.filter(e => e.lang === 'zh-HK');
 if (hkvoices.length === 0) {
     btnSpeak.remove();
     btnStop.remove();
     myContent.remove();
     rate.remove();
     myVoice.innerText = '唔好意思,  我唔識講廣東話';
 }
 hkspeaker = hkvoices[0];
 console.log(hkspeaker.name);
 myVoice.innerText = `${hkspeaker.localService ? '本機' : '雲端'}廣東話`;
 btnStop.innerText = '暫停';
 btnStop.onclick = pauseResume;
 utterThis = new SpeechSynthesisUtterance('Create utter this');
 utterThis.voice = hkspeaker;
 utterThis.onpause = function (event) {
   console.log(event.charIndex);
   console.log('SpeechSynthesisUtterance.onpause');
 }
 utterThis.onend = function (event) {
   console.log('SpeechSynthesisUtterance.onend');
 }
 utterThis.onerror = function (event) {
   console.error('SpeechSynthesisUtterance.onerror');
 }
}

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = myInit;
}

function speak(){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (myContent.value !== '') {
    utterThis.text = myContent.value;
    utterThis.pitch = 1;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}

function pauseResume() {
  if (!synth.speaking) {
    return;
  }
  if (synth.paused) {
    synth.resume();
  } else {
    synth.pause();
    }
}
