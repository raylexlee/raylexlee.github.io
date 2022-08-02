let title, myContent, myChapterList, myRange, myBook, myAutoplay;
let chapters;
let activeEpisode;
const synth = window.speechSynthesis;
const myVoice = document.getElementById('myVoice');
const rate = document.querySelector('#rate');
let completed_myinit = false;
let voices = [];
let mySpeaker = [];
let utterThis;
let justCancel = false;
let pausing = false;
const nameSpeaker = name => {
   const firstPart = name.split('(')[0].trim();
   return firstPart.startsWith('Microsoft') ? firstPart.split(' ')[1] : firstPart;
};
function myTTSinit() {
 mySpeaker = [];
 voices = synth.getVoices();
 let i;
 for (i=0; i < voices.length; i++) if (voices[i].lang.startsWith('zh')) mySpeaker.push(voices[i]);
let voice = mySpeaker.findIndex(e => nameSpeaker(e.name) === 'WanLung');
if (voice !== -1) {
   [mySpeaker[0], mySpeaker[voice]] = [mySpeaker[voice], mySpeaker[0]];
 } else {
   voice = mySpeaker.findIndex(e => e.lang.substr(3,2) === 'HK');
   if (voice >= 1) [mySpeaker[0], mySpeaker[voice]] = [mySpeaker[voice], mySpeaker[0]];
   }
 const option = e => `<option value="${e.name}">
   ${nameSpeaker(e.name)} ${e.lang.substr(3,2)}</option>
   `;
 myVoice.innerHTML = mySpeaker.map(e => option(e)).join('\n');
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
   if (myAutoplay.checked) {
     nextChapter();
   }
 }
 utterThis.onerror = function (event) {
   console.error('SpeechSynthesisUtterance.onerror');
 }
 // if (completed_myinit && myAutoplay.checked && myVoice.value.startsWith('zh')) speak(); 
}
myTTSinit();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = myTTSinit;
}
document.addEventListener("DOMContentLoaded", function(event) {
  myInit();
});
const contentUrl = chapter => `text/${title}/${chapter.substring(0,3)}.txt`;
function myInit() {
  title = document.title;
  myContent = document.getElementById('myContent');
  myChapterList = document.getElementById('myChapterList');
  myRange = document.getElementById('myRange'); 
  myBook = document.getElementById('myBook');
  myAutoplay = document.getElementById('myAutoplay');
  const optChapter = chapter => `<li><a href="javascript:gotoChapter('${chapter}')">${chapter.substring(4)}</a></li>`;
  let backto = 'index';
  const querystring = location.search;
  if (querystring != '') {
    const params = (new URL(document.location)).searchParams;
    const caller =  params.get('caller');
    backto = caller ? caller : backto;
  }
  const optIndexHtml = `<li><a href="${backto}.html">返　回　前　目　錄</a></li>`;
  myRange.oninput = function() {
    const v = myRange.value;
    myContent.style.fontSize = `${20 + parseInt(v)}px`;
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
      myChapterList.innerHTML=`${optIndexHtml}\n${chapters.map(c => optChapter(c)).join('\n')}`; 
      ProcessMenu();
      document.getElementById('nav-toggle').onclick = function () {
        this.classList.toggle('active');
      };
      document.getElementById('nav-toggle').addEventListener('click', function () {
        document.querySelectorAll('nav ul').forEach(el => toggle(el));
        });
      const chapter = getLastChapter();
      gotoChapter(chapter, false); 
    });
}    
function prevChapter() {
    const idx =chapters.findIndex(c => c.startsWith(activeEpisode));
    let i = idx - 1;
    i = (i === -1) ? (chapters.length - 1) : i;
    const chapter = chapters[i];
    gotoChapter(chapter);
}
function nextChapter() {
    const idx =chapters.findIndex(c => c.startsWith(activeEpisode));
    let i = idx + 1;
    i = (i === chapters.length) ? 0 : i;
    const chapter = chapters[i];
    gotoChapter(chapter);
}
function gotoChapter(chapter, PleaseSpeak = true) {
   //activeEpisode = parseInt(chapter.substring(0,3));
   activeEpisode = chapter.substring(0,3);
   localStorage.setItem('wspa_activeEpisode'+title, activeEpisode);
   const loadchapterUrl = `loadchapter.html?book=${title}&episode=${activeEpisode}`;
   myBook.innerHTML=`
     <a href="javascript:window.open('${loadchapterUrl}','readaloud');" style="color:cyan;">&#128220;</a> 
     ${title} 
     <a href="javascript:prevChapter()" style="color:cyan;">&lArr;</a> 
     ${chapter.substring(4)}
     <a href="javascript:nextChapter()" style="color:cyan;">&rArr;</a> 
     `;
   document.title = `${title} ${chapter.substring(4)}`;
   fetch(contentUrl(chapter))
     .then(response => response.text())
     .then(data => {
       myContent.value = data;
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
  if (!localStorage.getItem('wspa_activeEpisode'+title)) {
    const start_episode = chapters[0].substring(0,3);
    localStorage.setItem('wspa_activeEpisode'+title,start_episode);
  }
  activeEpisode = localStorage.getItem('wspa_activeEpisode'+title);
  return chapters.find(c => c.startsWith(activeEpisode)); 
}
function speak(){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (myContent.value !== '') {
    pausing = false;  
    utterThis.voice = mySpeaker.filter(e => e.name === myVoice.value)[0];
    utterThis.text = myContent.value;
    utterThis.pitch = 1;
    utterThis.rate = rate.value;
    justCancel = true;
    synth.cancel();
    synth.speak(utterThis);
    justCancel = false;
  }
}
myVoice.onchange = function(){
  justCancel = true;
  synth.cancel();
  speak();
}

function pauseResume() {
  if (synth.speaking !== true) {
    return;
  }
  if (utterThis.voice && utterThis.voice.localService) {
    if (pausing) {
      utterThis.rate = rate.value;
      synth.resume();
      } else {
        synth.pause();  
    }
    pausing = !pausing;
    return;
  }
  synth.pause();
  if (synth.paused !== true) {
     justCancel = true;
     synth.cancel();
  }
}
