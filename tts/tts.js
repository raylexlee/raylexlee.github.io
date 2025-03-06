const rtl = ['ar', 'he', 'ur', 'fa','ps'];
let justCancel = false;
let programSelect = 0;
const synth = window.speechSynthesis;
const btnSpeak = document.getElementById('btnSpeak');
const btnStop = document.getElementById('btnStop');
const voiceSelect = document.getElementById('myVoice');
const myContent = document.getElementById('myContent');
const rate = document.querySelector('#rate');
const narrators=[];
let voices = [];
let currentVoice;
let punctuationRegex = /[；。！？;.!?]/gm;
const googleRegex = /[；。！？，、,;.!?]/gm;
function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
      const aname = a.lang+a.name.toUpperCase(), bname = b.lang+b.name.toUpperCase();
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
 // currentVoice = nowVoice();
 btnStop.innerText = 'STOP';
 btnStop.onclick = pauseResume;
 btnSpeak.onclick = () => {
   programSelect = 1;
   speak();
   }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function nowVoice(){
    let v;
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        v = voices[i];
        break;
      }
    }
    const lang = v.voiceURI.replace(/\w+\s(\w+).*\s-\s(\w+)\s\((.*)\)/,'$2')
    myContent.dir = (rtl.includes(lang)) ? 'rtl' : '';    
      if (v.voiceURI.startsWith('Google')) punctuationRegex = googleRegex;
    return v;
}

voiceSelect.onchange = function() {
 currentVoice = nowVoice();
  justCancel = true;
  synth.cancel();
  programSelect = 1;
  speak();
}

function pauseResume() {
    programSelect = 1;
    justCancel = true;
    synth.cancel();
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
  myContent.value = narrators.map(e => `${e.name} ${e.local ? 'local' : 'remote'} ${e.langName} ${e.langCode} ${e.locName.replace(/ /g,'_')} ${e.locCode}.`).join('\n');
  gotoChapter(false);
}

