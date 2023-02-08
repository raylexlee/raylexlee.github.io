const synth = window.speechSynthesis;
const btnSpeak = document.getElementById('btnSpeak');
const btnStop = document.getElementById('btnStop');
const voiceSelect = document.getElementById('myVoice');
const myContent = document.getElementById('myContent');
const rate = document.querySelector('#rate');
const narrators=[];
let voices = [];
let utterThis;

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if ( aname < bname ) return -1;
      else if ( aname == bname ) return 0;
      else return +1;
  });
  var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
 btnStop.innerText = '暫停';
 btnStop.onclick = pauseResume;
 utterThis = new SpeechSynthesisUtterance('Create utter this');
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

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (myContent.value !== '') {
    utterThis.text = myContent.value;
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = 1;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}

voiceSelect.onchange = function(){
  speak();
}

function pauseResume() {
  if (synth.speaking !== true) {
    return;
  }
  if (synth.paused) {
    utterThis.rate = rate.value;
    synth.resume();
    return;
  }
  synth.pause();
  if (synth.paused !== true) synth.cancel();
}

function GetNarrators() {
  for (i=0; i<voices.length; i++) { 
    const narrator={}
    narrator.langCode=voices[i].lang.split('-')[0];
    narrator.locCode=voices[i].lang.split('-')[1];
    narrator.local=voices[i].localService;
    narrator.name=voices[i].voiceURI.replace(/\w+\s(\w+).*\s-\s(\w+)\s\((.*)\)/,'$1')
    narrator.langName=voices[i].voiceURI.replace(/\w+\s(\w+).*\s-\s(\w+)\s\((.*)\)/,'$2')
    narrator.locName=voices[i].voiceURI.replace(/\w+\s(\w+).*\s-\s(\w+)\s\((.*)\)/,'$3')
    narrators.push(narrator) 
  }
  console.log(narrators);
  myContent.value = narrators.map(e => `${e.name} ${e.local ? 'local' : 'cloud'} ${e.langName} ${e.langCode} ${e.locName.replace(/ /g,'_')} ${e.locCode}`).join('\n');
}

