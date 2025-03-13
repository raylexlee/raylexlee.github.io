let adjustment = 0.5;
const hasSpace = ['zh','ja','ko'];
const googleLimit = 57;
let programSelect = 0;
let lang, title, myContent, myChapterList, myRange, myBook, myAutoplay;
let langttsVoice;
let nDigits = 3;
let myPauseCancel;
let chapters;
let activeEpisode;
const rtl = ['ar', 'he', 'ur', 'fa','ps'];
const querystring = location.search;
const params = (querystring != '') ? (new URL(document.location)).searchParams : 'none';
if (params === 'none') window.location = 'enttskoob.html?title=Pride_and_Prejudice';
title =  params.get('title');
title = title ? title : 'Pride_and_Prejudice';
lang =  params.get('lang');
lang = lang ? lang : 'en';
langttsVoice = `${lang}ttsVoice`;
const fixA = !hasSpace.includes(lang);
const synth = window.speechSynthesis;
const myVoice = document.getElementById('myVoice');
const rate = document.querySelector('#rate');
let completed_myinit = false;
let voices = [];
let mySpeaker = [];
let utterThis;
let justCancel = false;
let pausing = false;
let crPosition=[];
let nCharsRow, lineHeight; 
let rowsLine=[]; 
let numCharsLine=[];
let punctuationPosition=[];
let punctuationArray=[];
let positionIndex = 0;
const nameSpeaker = name => {
   const firstPart = name.split('(')[0].trim();
   return firstPart.startsWith('Microsoft') ? firstPart.split(' ')[1] : firstPart;
};
let punctuationRegex = /[；。！？;.!?]/gm;
const googleRegex = /[；。！？，、,;.!?]/gm;
//const notAndroid=navigator.userAgent.toLowerCase().indexOf('android')==-1;
const notAndroid = false;
function updatePauseCancel() {
  myPauseCancel.innerHTML = (mySpeaker[myVoice.selectedIndex].localService && notAndroid) ? '&#9208;' : '&#9632;';
}
function myTTSinit() {
 mySpeaker = [];
 voices = synth.getVoices();
 let i;
 for (i=0; i < voices.length; i++) if (voices[i].lang.startsWith(lang)) mySpeaker.push(voices[i]);
  if (!localStorage.getItem(langttsVoice)) {
    const start_voice = 0;
    localStorage.setItem(langttsVoice,start_voice);
  }
 const lastVoice = parseInt(localStorage.getItem(langttsVoice));
 const option = (e,v) => `<option value="${e.name}" ${(v === lastVoice) ? 'selected' : ''}>
   ${nameSpeaker(e.name)} ${e.lang.substr(3,2)}</option>
   `;
 myVoice.innerHTML = mySpeaker.map((e,v) => option(e,v)).join('\n');
 utterThis = new SpeechSynthesisUtterance('Create utter this');
 utterThis.onpause = function (event) {
   console.log(event.charIndex);
   console.log('SpeechSynthesisUtterance.onpause');
 }
 utterThis.onend = function (e) {
   if (justCancel) {
     justCancel = false;
     return;
   }
   positionIndex++;
   if (positionIndex === punctuationPosition.length) {
     positionIndex = 0;
     if (myAutoplay.checked) {
       nextChapter();
     } 
   }
   speak();
 }
 utterThis.onerror = function (event) {
   console.error('SpeechSynthesisUtterance.onerror');
 }
// utterThis.onboundary = SyncAudioWithContent;
}
myTTSinit();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = myTTSinit;
}
document.addEventListener("DOMContentLoaded", function(event) {
  myInit();
});
const contentUrl = chapter => `text/${title}/${chapter.substring(0,nDigits)}.txt`;
function myInit() {
  document.title = title;
  myContent = document.getElementById('myContent');
  myContent.style.lineHeight=2;
  myChapterList = document.getElementById('myChapterList');
  myRange = document.getElementById('myRange'); 
  myBook = document.getElementById('myBook');
  if (rtl.includes(lang)) {
    myBook.dir = 'rtl';
    myChapterList.dir = 'rtl';
    myContent.dir = 'rtl'; }
  myAutoplay = document.getElementById('myAutoplay');
  const optChapter = chapter => `<li><a href="javascript:gotoChapter('${chapter}')">${chapter.substring(1 + nDigits)}</a></li>`;
  let backto = 'index';
  const caller =  params.get('caller');
  backto = caller ? caller : backto;
  const optIndexHtml = `<li><a href="${backto}.html">Back to Index</a></li>`;
  myContent.onselect = e => {
    if (programSelect >= 1) {
       programSelect--;
       return;
    }
    for (let i = 0; i < punctuationPosition.length; i++) {
      if (punctuationPosition[i] >= myContent.selectionStart) {
         positionIndex = i;
         speak();
         console.log('onselect ',i);
         break;
      }
    }
  }
  myRange.oninput = function() {
    const v = myRange.value;
    myContent.style.fontSize = `${20 + parseInt(v)}px`;
    CalculateScrollData(); // for rowsLine[], lineHeight, nCharsRow
  };
  document.body.onunload = function() {
    if (synth.speaking) {
      justCancel = true;
      synth.cancel();
    }
  };
  fetch(`text/${title}/coverparameters.txt`)
    .then(response => response.text())
    .then(data => {
      chapters = data.replace(/\n+$/, "").split('\n');
      nDigits = chapters[0].indexOf(' ');      
      myChapterList.innerHTML=`${optIndexHtml}\n${chapters.map(c => optChapter(c)).join('\n')}`; 
      ProcessMenu();
      document.getElementById('nav-toggle').onclick = function () {
        this.classList.toggle('active');
      };
      document.getElementById('nav-toggle').addEventListener('click', function () {
        document.querySelectorAll('nav ul').forEach(el => toggle(el));
        });
      const links = document.getElementsByTagName('a');
      myPauseCancel = links[links.length - 1];
      if (mySpeaker.filter(s => s.voiceURI.startsWith('Google')).length >= 1) punctuationRegex = googleRegex;
      const chapter = getLastChapter();
      gotoChapter(chapter, false); 
    });
}    
function prevChapter() {
    const idx =chapters.findIndex(c => c.startsWith(activeEpisode));
    let i = idx - 1;
    i = (i === -1) ? (chapters.length - 1) : i;
    const chapter = chapters[i];
    positionIndex = 0;
    gotoChapter(chapter);
}
function nextChapter() {
    const idx =chapters.findIndex(c => c.startsWith(activeEpisode));
    let i = idx + 1;
    i = (i === chapters.length) ? 0 : i;
    const chapter = chapters[i];
    positionIndex = 0;
    gotoChapter(chapter);
}
function gotoChapter(chapter, PleaseSpeak = true) {
   //activeEpisode = parseInt(chapter.substring(0,3));
   activeEpisode = chapter.substring(0,nDigits);
   localStorage.setItem('wspa_activeEpisode'+title, activeEpisode);
   myBook.innerHTML=`
     ${title.replace(/_/g," ")} 
     <a href="javascript:prevChapter()" style="color:cyan;">&lArr;</a> 
     ${chapter.substring(1 + nDigits)}
     <a href="javascript:nextChapter()" style="color:cyan;">&rArr;</a> 
     `;
   document.title = `${title} ${chapter.substring(1 + nDigits)}`;
   fetch(contentUrl(chapter))
     .then(response => response.text())
     .then(data => {
       myContent.value = data;
       myContent.value = myContent.value.split('\n').filter(e => e.length >= 1).join('\n');
       numCharsLine=myContent.value.split('\n').map(e => e.length);
       rowsLine = Array(numCharsLine.length);
       CalculateScrollData(); // for rowsLine[], lineHeight, nCharsRow
       new ResizeObserver(CalculateScrollData).observe(myContent);
       crPosition=[];
       for (let valueIndex=0; valueIndex < myContent.value.length; valueIndex++) 
         if (myContent.value[valueIndex] === '\n') {
           crPosition.push(valueIndex);
         }
       punctuationArray = myContent.value.match(punctuationRegex);
       punctuationPosition=[];
       let punctuationIndex = 0;
       let lastPunctuationPosition = 0;
       for (let valueIndex=0; valueIndex < myContent.value.length; valueIndex++) 
         if (myContent.value[valueIndex] === punctuationArray[punctuationIndex]) {
           if (valueIndex > (lastPunctuationPosition + googleLimit)) { 
               let a = lastPunctuationPosition;
               while ((a + googleLimit) < valueIndex) {
                 a += googleLimit;
                 if (fixA) while (myContent.value[a] !== ' ') a--;
                 punctuationPosition.push(a);
               }
           }
           punctuationPosition.push(valueIndex);
           lastPunctuationPosition = valueIndex;
           punctuationIndex++;
         }
      completed_myinit = true;
       if (myAutoplay.checked) {
         if (synth.speaking) { 
           justCancel = true;
           synth.cancel();
         }
         if (PleaseSpeak) speak();
       }
     });
}
function toggle(elem) {
  elem.style.display = (elem.style.display === 'none') ? 'block' : 'none';
}

function ProcessMenu() {
  document.querySelectorAll('nav ul li > a:not(:only-child)')
    .forEach(el => el.onclick = function (e) {
      const nd = this.nextElementSibling;
      document.querySelectorAll('.nav-dropdown')
        .forEach(function(elem) { 
          if (elem === nd) {
            toggle(nd);
          } else {
            elem.style.display = 'none';
          }});
      e.stopPropagation();
    });
  document.documentElement.onclick = function () {
    document.querySelectorAll('.nav-dropdown').forEach(el => el.style.display = 'none');
  };
}
function getLastChapter() {
  const c = params.get('chapter');
  const s = params.get('sentence');
  if (c && s) {
    localStorage.setItem('wspa_activeEpisode'+title,c);
    localStorage.setItem('wspa_positionIndex'+title,s);
    window.location = `${window.location.href.split('?')[0]}?title=${title}&lang=${lang}`;
  }
  if (!localStorage.getItem('wspa_positionIndex'+title)) {
    localStorage.setItem('wspa_positionIndex'+title,0);
  }
  positionIndex = parseInt(localStorage.getItem('wspa_positionIndex'+title));
  if (!localStorage.getItem('wspa_activeEpisode'+title)) {
    const start_episode = chapters[0].substring(0,nDigits);
    localStorage.setItem('wspa_activeEpisode'+title,start_episode);
  }
  activeEpisode = localStorage.getItem('wspa_activeEpisode'+title);
  return chapters.find(c => c.startsWith(activeEpisode)); 
}
function speak(){
    if (synth.speaking) {
    //    console.error('speechSynthesis.speaking');
        return;
    }
    if (myContent.value !== '') {
    pausing = false;  
    const start = (positionIndex >= 1) ? (punctuationPosition[positionIndex - 1] + 1) : 0;
    const stop = punctuationPosition[positionIndex];
    utterThis.voice = mySpeaker.filter(e => e.name === myVoice.value)[0];
    updatePauseCancel();
    utterThis.text = myContent.value.substring(start, stop);
    utterThis.pitch = 1;
    utterThis.rate = rate.value;
    justCancel = true;
    synth.cancel();
    synth.speak(utterThis);
    justCancel = false;
//    const portion = start / myContent.value.length;
//    myContent.scrollTop = portion * myContent.scrollHeight - adjustment * myContent.offsetHeight;
    ScrollText(start);
    programSelect = 1;
    myContent.select();
    programSelect = 2;
    myContent.setSelectionRange(start, stop);
  }
}
myVoice.onchange = function(){
  localStorage.setItem(langttsVoice,myVoice.selectedIndex);
  justCancel = true;
  synth.cancel();
    programSelect = 1;
  speak();
}

function pauseResume() {
  if (synth.speaking !== true) {
    return;
  }
  synth.cancel();
  localStorage.setItem('wspa_positionIndex'+title, positionIndex);
  updateQR(title, activeEpisode, positionIndex);
}
function updateQR(t,c,s) {
  const base = document.location.href.split('?')[0];
  qrcode.makeCode(`${base}?title=${t}&lang=${lang}&chapter=${c}&sentence=${s}`);
}
function ScrollText(charIndex)  {
//  const fontSize = parseFloat(window.getComputedStyle(myContent).fontSize)
//  const nCharsRow = Math.floor(myContent.clientWidth / fontSize)
//  const lineHeight = myContent.scrollHeight / numCharsLine.map(e => Math.ceil(e / nCharsRow)).reduce((a,b) => a + b);
  let lineIndex;
  for (lineIndex=0; lineIndex < crPosition.length; lineIndex++)
    if (charIndex <= crPosition[lineIndex]) break;
  let topRow = 0;
  if (lineIndex >=1)
    topRow = rowsLine[lineIndex - 1];
    // topRow = numCharsLine.slice(0, lineIndex).map(e => Math.ceil(e / nCharsRow)).reduce((a,b) => a + b);
  const lastRow = Math.ceil(((lineIndex === 0) ? charIndex : (charIndex - crPosition[lineIndex-1])) / nCharsRow);
  myContent.scrollTop = (lineHeight * (topRow + lastRow)) - (adjustment * myContent.clientHeight);
}
function CalculateScrollData() {
  const fontSize = parseFloat(window.getComputedStyle(myContent).fontSize)
  nCharsRow = Math.floor(myContent.clientWidth / fontSize)
  rowsLine[0] = Math.ceil(numCharsLine[0] / nCharsRow);
  let lineIndex = 1;
  while (lineIndex < numCharsLine.length) {
    rowsLine[lineIndex] = rowsLine[lineIndex - 1] + Math.ceil(numCharsLine[lineIndex] / nCharsRow);
    lineIndex++;
  }
  lineHeight = myContent.scrollHeight / rowsLine[rowsLine.length - 1];
}
