let nDigits = 3;
let title, myContent, audio, myChapter, myRange, myBook, myAutoplay;
let chapters;
let mySync;
let activeEpisode;
let currentTime;
const querystring = location.search;
const params = (querystring != '') ? (new URL(document.location)).searchParams : 'none';
if (params === 'none') window.location = 'audiokoob.html?title=紅樓夢';
title =  params.get('title');
title = title ? title : '紅樓夢';
document.addEventListener("DOMContentLoaded", function(event) {
  myInit();
});
const getDeviceType = () => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const maxTouchPoints = navigator.maxTouchPoints;

  // Detect Android
  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // Detect iOS (including iPads running iPadOS 13+ which might report as MacIntel)
  if (/iPad|iPhone|iPod/.test(platform) || (platform === 'MacIntel' && maxTouchPoints > 1)) {
    return "iOS";
  }

  // If neither Android nor iOS, return "Other"
  return "Other";
};
function isEdgeAndroid() {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('edg') && userAgent.includes('android');
}
async function fetchText(file) {
  const response = await fetch(file);
  const text = await response.text();
  return text;
}
const optionChapter = c => `<option value="${c}" ${c.startsWith(activeEpisode) ? 'selected' : ''}>${c.substring(1+nDigits).replaceAll('_',' ')}</option>`;
const soundUrl = chapter => `https://www.tingshucantonese.net/audio/${title}/${chapter.substring(0,3)}.mp3`;
const contentUrl = chapter => `text/${title}/${chapter.substring(0,3)}.txt`;
async function myInit() {
  document.title = title;
  myContent = document.getElementById('myContent');
  audio = document.getElementById('audio');
  myChapter = document.getElementById('myChapter');
  myRange = document.getElementById('myRange'); 
  mySpeed = document.getElementById('mySpeed'); 
  myBook = document.getElementById('myBook');
  myAutoplay = document.getElementById('myAutoplay');
  myRange.oninput = function() {
    const v = myRange.value;
    myContent.style.fontSize = `${20 + parseInt(v)}px`;
  };
  mySpeed.oninput = function() {
    const v = mySpeed.value;
    audio.playbackRate = (85 + parseInt(v)) / 100;
  }
const  myFootlineSetting = document.getElementById('myFootlineSetting');
const  myFootline = document.getElementById('myFootline');
  const deviceType = getDeviceType();
  if (deviceType !== "Other") {
    const minHeight = (deviceType === 'iOS') ? '80px' : '70px';
    myFootline.style.minHeight = minHeight;
    myFootlineSetting.style.minHeight = minHeight;    
  } else {
    myFootline.style.display = 'none';
  }
  audio.onplay = function (e) { 
    if (currentTime > audio.currentTime) {
      audio.currentTime = currentTime;
    }
    const pageTime = myContent.offsetHeight / myContent.scrollHeight * audio.duration / audio.playbackRate;
    console.log(pageTime);
    SyncAudioWithContent();
    mySync = setInterval(SyncAudioWithContent, Math.round(pageTime*700));
  };
  audio.onpause = function (e) {
    localStorage.setItem('currentTime'+title, audio.currentTime);
    updateQR(activeEpisode, audio.currentTime);
    clearInterval(mySync);
  };
  audio.onseeked = () => { currentTime = audio.currentTime; }
  audio.onended = function (e) {
    if (myAutoplay.checked) {
      nextChapter();
    }
  }
  const data = await fetchText(`text/${title}/coverparameters.txt`)
  chapters = data.replace(/\n+$/, "").split('\n');
  const chapter = getLastChapter();
  myChapter.innerHTML = chapters.map(c => optionChapter(c)).join('\n');
  myChapter.onchange = () => { gotoChapter(myChapter.value); }
  gotoChapter(chapter); 
}    
function updateQR(e,t) {
  const base = decodeURI(document.location.href.split('?')[0]);
  qrcode.makeCode(`${base}?title=${title}&episode=${e}&time=${t}`);
}
function prevChapter() {
    const m = audio.firstElementChild.src.match(/\/([0-9]{3})\.mp3$/);
    let i = chapters.findIndex(c => c.startsWith(m[1])) - 1;
    i = (i === -1) ? (chapters.length - 1) : i;
    const chapter = chapters[i];
    myChapter.value = chapter;
    currentTime = 0.0;
    localStorage.setItem('currentTime'+title, 0.0);
    gotoChapter(chapter);
}
function nextChapter() {
    const m = audio.firstElementChild.src.match(/\/([0-9]{3})\.mp3$/);
    let i = 1 + chapters.findIndex(c => c.startsWith(m[1]));
    i = (i === chapters.length) ? 0 : i;
    const chapter = chapters[i];
    myChapter.value = chapter;
    currentTime = 0.0;
    localStorage.setItem('currentTime'+title, 0.0);
    gotoChapter(chapter);
}
function SyncAudioWithContent() {
    const adjustment = 0.3;
    const portion = audio.currentTime / audio.duration ;
    myContent.scrollTop = portion * myContent.scrollHeight - adjustment * myContent.offsetHeight;
  }
async function gotoChapter(chapter) {
   audio.firstElementChild.setAttribute('src', soundUrl(chapter));
   audio.load();
   activeEpisode = parseInt(chapter.substring(0,3));
   localStorage.setItem('activeEpisode'+title, activeEpisode);
   const loadchapterUrl = `loadchapter.html?book=${title}&episode=${chapter.substring(0,3)}`;
   myBook.innerHTML = title.replaceAll('_',' ');
   document.title = `${title.replaceAll('_',' ')} ${chapter.substring(4).replaceAll('_',' ')}`;
   const data = await fetchText(contentUrl(chapter))
   myContent.value = data;
   myContent.scrollTop = 0.0;
   if (myAutoplay.checked) {
     audio.play();
     audio.currentTime = currentTime;
     SyncAudioWithContent();
   }
}
function getLastChapter() {
  const e = params.get('episode');
  const t = params.get('time');
  if (e && t) {
    localStorage.setItem('activeEpisode'+title,e);
    localStorage.setItem('currentTime'+title, t);
  }
  if (!localStorage.getItem('activeEpisode'+title)) {
    const start_episode = parseInt(chapters[0].substring(0,3));
    localStorage.setItem('activeEpisode'+title,start_episode);
    localStorage.setItem('currentTime'+title, 0.0);
  }
  activeEpisode = localStorage.getItem('activeEpisode'+title);
  currentTime = localStorage.getItem('currentTime'+title);
  return chapters.find(c => c.startsWith(activeEpisode.padStart(3, '0'))) 
}
function speak() { audio.play(); }
function pauseResume() { audio.pause(); }
