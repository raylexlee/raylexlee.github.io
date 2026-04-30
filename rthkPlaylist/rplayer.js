let nDigits = 8;
let title, myContent, audio, myChapter, mySpeak, myBook, myAutoplay;
let chapters;
let activeEpisode;
let currentTime;
let hls, currentLevel, audioTrack, audioLabel;
const querystring = location.search;
const params = (querystring != '') ? (new URL(document.location)).searchParams : 'none';
if (params === 'none') window.location = 'rplayer.html?title=古今風雲人物';
title =  params.get('title');
title = title ? title : '古今風雲人物';
const PLAYER_CURRENT_LEVEL = `RPLAYERcurrentLevel`;
const PLAYER_AUDIO_TRACK = `RPLAYERaudioTrack`;
const LAST_EPISODE = `rthkPlaylistLastEpisode${title}`;
const LAST_EPISODE_TIME = `rthkPlaylistLastEpisodeTime${title}`;
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
function initMediaHTML(link) {
  if (link.split('/').includes('tv')) {
    document.getElementById('radioRTHK').innerHTML =
      `
    <div>
      <label for="currentLevel">畫質</label>
      <input type="range" min="0" max="5" value="3" id="currentLevel" />
    </div>
    <div>
      <label for="audioTrack">音訊</label>
      <input type="range" min="0" max="1" value="0" id="audioTrack" aria-valuetext="粵" />
      <span id="audioLabel">粵</span>
    </div>
      `;
  audio = document.getElementById('player');
  currentLevel = document.getElementById('currentLevel');
  audioTrack = document.getElementById('audioTrack');
  audioLabel = document.getElementById("audioLabel");
hls = new Hls();
hls.loadSource(link);
hls.attachMedia(audio);
if (!localStorage.getItem(PLAYER_CURRENT_LEVEL)) {
  localStorage.setItem(PLAYER_CURRENT_LEVEL, currentLevel.value);
}
currentLevel.value = localStorage.getItem(PLAYER_CURRENT_LEVEL);
if (!localStorage.getItem(PLAYER_AUDIO_TRACK)) {
  localStorage.setItem(PLAYER_AUDIO_TRACK, audioTrack.value);
}
audioTrack.value = localStorage.getItem(PLAYER_AUDIO_TRACK);
      const labelText = audioTrack.value === '0' ? "粵" : "普";
      audioTrack.setAttribute("aria-valuetext", labelText);
      audioLabel.textContent = labelText;
hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
  audio.play();
  hls.currentLevel = parseInt(currentLevel.value, 10);
  hls.audioTrack = parseInt(audioTrack.value, 10);
});

currentLevel.oninput = function () {
  localStorage.setItem(PLAYER_CURRENT_LEVEL, currentLevel.value);
  hls.currentLevel = parseInt(currentLevel.value, 10)
}
audioTrack.oninput = function () {
  localStorage.setItem(PLAYER_AUDIO_TRACK, audioTrack.value);
      const val = parseInt(audioTrack.value, 10);
      hls.audioTrack = val;
      const labelText = val === 0 ? "粵" : "普";
      audioTrack.setAttribute("aria-valuetext", labelText);
      audioLabel.textContent = labelText;
}
  } else {
      document.getElementById('tvRTHK').innerHTML =
        `<p>經由香港電台網站串流而成, 並且優化收聽效果, 可以自動跳集, 記錄上次收聽時段。</p>`;
      audio = document.getElementById('audio');
    }
}
const kid = c => (nDigits === 8) ? c.date : c.m3u8Link.replace(/.*(000\d\d).*/,'$1');
const optionChapter = c => `<option value="${kid(c)}" ${(kid(c) === activeEpisode) ? 'selected' : ''}>${c.episodeTitle}</option>`;
async function myInit() {
  const chapter = await getLastChapter(); // fetch chpaters, activeEpisode, currenTime
  initMediaHTML(chapter.m3u8Link);
  document.title = title;
  myContent = document.getElementById('myContent');
  myChapter = document.getElementById('myChapter');
  mySpeak = document.getElementById('mySpeak'); 
  myBook = document.getElementById('myBook');
  myAutoplay = document.getElementById('myAutoplay');
const  myFootlineSetting = document.getElementById('myFootlineSetting');
const  myFootline = document.getElementById('myFootline');
  const deviceType = getDeviceType();
  if (deviceType !== "Other") {
    const minHeight = ((deviceType === 'iOS') || isEdgeAndroid()) ? '70px' : '60px';
    myFootline.style.minHeight = minHeight;
    myFootlineSetting.style.minHeight = minHeight;    
  } else {
    myFootline.style.display = 'none';
  }
  audio.onplay = function (e) { 
    if (currentTime > audio.currentTime) {
      audio.currentTime = currentTime;
    }
  };
  audio.onpause = function (e) {
    localStorage.setItem(LAST_EPISODE_TIME, audio.currentTime);
    updateQR(activeEpisode, audio.currentTime);
    mySpeak.innerHTML = '<a href="javascript:speak()" style="color:red;">&#9654;</a>';
  };
  audio.onplaying = function () {
    mySpeak.innerHTML = '<img src="playing.svg" />';
  }
  audio.onseeked = () => { currentTime = audio.currentTime; }
  audio.onended = function (e) {
    if (myAutoplay.checked) {
      nextChapter();
    }
  }
  myChapter.innerHTML = chapters.map(c => optionChapter(c)).join('\n');
  myChapter.onchange = () => { gotoChapter(myChapter.value); }
  myChapter.value = kid(chapter);
  gotoChapter(myChapter.value); 
}    
function updateQR(e,t) {
  const base = decodeURI(document.location.href.split('?')[0]);
  qrcode.makeCode(`${base}?title=${title}&episode=${e}&time=${t}`);
}
function prevChapter() {
    const m = myChapter.value;
    let i = chapters.findIndex(c => kid(c) === m) - 1;
    i = (i === -1) ? (chapters.length - 1) : i;
    const chapter = chapters[i];
    myChapter.value = kid(chapter); 
    currentTime = 0.0;
    localStorage.setItem(LAST_EPISODE_TIME, 0.0);
    gotoChapter(myChapter.value);
}
function nextChapter() {
    const m = myChapter.value;
    let i = 1 + chapters.findIndex(c => kid(c) === m);
    i = (i === chapters.length) ? 0 : i;
    const chapter = chapters[i];
    myChapter.value = kid(chapter); 
    currentTime = 0.0;
    localStorage.setItem(LAST_EPISODE_TIME, 0.0);
    gotoChapter(myChapter.value);
}
async function gotoChapter(id) {
   const chapter = chapters.find(c => id === kid(c));
   if (nDigits === 8) {
     audio.firstElementChild.setAttribute('src', chapter.m3u8Link)
     audio.load();
   } else {
hls.loadSource(chapter.m3u8Link);
     }
   activeEpisode = id;
   localStorage.setItem(LAST_EPISODE, activeEpisode);
   myBook.innerHTML = `${title} [${chapter.date}] ${(nDigits === 8) ? '' : id}`;
   document.title = chapter.episodeTitle;
   if (myAutoplay.checked) {
     audio.play();
     audio.currentTime = currentTime;
   }
}
async function getLastChapter() {
const date = new Date();
const yyyy = date.getFullYear() - 1;
const mm = String(date.getMonth() + 1).padStart(2, '0');
const dd = String(date.getDate()).padStart(2, '0');
const earliestDate = NoEarliestDate.includes(title) ? '20180901' : `${yyyy}${mm}${dd}`;

  const data = await fetchText(`${title}.m3u8`);
chapters = data.split('\n#EXTINF:0, ').slice(1,).map(e => {
    const [t, m3u8Link] = e.split('\n');
    const [episodeTitle, dt] = t.slice(3 + title.length,).split(' [');
    return {date : dt.substring(0,8), episodeTitle, m3u8Link}
    }).filter(e => e.date >= earliestDate);
  if (chapters.length === 0) window.location.href = "https://raylexlee.github.io/rthkPlaylist/";
  nDigits = chapters[0].m3u8Link.split('/').includes('tv') ? 5 : 8; 
  const e = params.get('episode');
  const t = params.get('time');
  if (e && t && (e >= chapters[0].date)) {
    localStorage.setItem(LAST_EPISODE,e);
    localStorage.setItem(LAST_EPISODE_TIME, t);
  }
  if (!localStorage.getItem(LAST_EPISODE)) {
    const start_episode = kid(chapters[0]);
    localStorage.setItem(LAST_EPISODE,start_episode);
    localStorage.setItem(LAST_EPISODE_TIME, 0.0);
  }
  activeEpisode = localStorage.getItem(LAST_EPISODE);
  currentTime = localStorage.getItem(LAST_EPISODE_TIME);
  if ((activeEpisode.length === 8) && (activeEpisode < chapters[0].date)) {
    activeEpisode = chapters[0].date;
    currentTime = 0.0;
  }
  if (nDigits === 8) {
     return chapters.find(e => e.date === activeEpisode) }
  if (activeEpisode.length === 8) {
    const chapter = chapters.find(e => e.date === activeEpisode);
    if (chapter) {
      activeEpisode = kid(chapter);
      return chapter
    }
  }
  const chapter = chapters.find(e => activeEpisode === kid(e));
  if (chapter) return chapter;
  activeEpisode = kid(chapters[0]); 
  currentTime = 0.0;
  return chapters[0]
}
function speak() { audio.play(); }
function pauseResume() { audio.pause(); }
