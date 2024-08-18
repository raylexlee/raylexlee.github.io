let player;
let txtExportModule;
let Songs = [];
const legend = {
"en":"Thanks for using iframe to watch YouTube video with minimal and quiet advertisement. The following link starts with youtube id",
"zh-cn":"感谢您使用 iframe 以最少且安静的广告观看 YouTube 视频。以下链接以 youtube id 开头",
"zh-hk":"感謝您使用 iframe 以最少且安靜的廣告觀看 YouTube 視頻。以下鏈接以 youtube id 開頭",
"zh-tw":"感謝您使用 iframe 以最少且安靜的廣告觀看 YouTube 視頻。以下鏈接以 youtube id 開頭",
"ja":"最小限の静かな広告でYouTubeビデオを視聴するためにiframeを使用していただきありがとうございます。次のリンクはyoutube idで始まります",
};

const howtoId = ['VyaYyItkoGU', 'cg7OJWTGnaY']

const lsTime = ytId => `${ytId}Time`;
const lsIndex = ytId => `${ytId}Index`;
const shareLink = queryString => `https://raylexlee.github.io/ytiframeplayer/${queryString}`;


function ShareIframe() {
  const last_playlistId = localStorage.getItem("last_playlistId");
  const queryStr = last_playlistId ? `?videoid=${last_playlistId}` : ''; 
  const url = shareLink(queryStr);
  const QR = document.getElementById('qrcode');
  if (url !== QR.title) {
    qrcode.clear(); // clear the code.
    qrcode.makeCode(url); // make another code.
  }
  let language = navigator.language.toLowerCase();
  language = language.startsWith('zh') ? language : language.substring(0,2);
  language = (Object.keys(legend).indexOf(language) === -1) ? 'en' : language;
  const shareData = {
      title: document.title,
      text: `${legend[language]} ${last_playlistId}`,
      url: shareLink(queryStr)
    };
  navigator.share(shareData)
    .then(() => {
          document.getElementById('shareLink').innerText = navigator.language;  
          console.log('ok')
          }
        )
        .catch((e) => {
          document.getElementById('shareLink').innerText = shareData.url;  
          console.log(e)
        }
        )
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
function _outputHTML(playlistId, isList) {
  if (isList) {
    if (!localStorage.getItem(lsTime(playlistId))) {
      localStorage.setItem(lsTime(playlistId), 0.0);
      localStorage.setItem(lsIndex(playlistId), "0");
      }
    const strTime = localStorage.getItem(lsTime(playlistId));
    const Time = parseFloat(strTime);
    const strIndex = localStorage.getItem(lsIndex(playlistId));
    const Index = parseInt(strIndex);
    
    document.getElementById('ytVideo').innerHTML=`
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=OwnHHHeiyOACpkVM&amp;list=${playlistId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
`;
  }  else {
    if (!localStorage.getItem(lsTime(playlistId))) {
      localStorage.setItem(lsTime(playlistId), 0.0);
      }
    const strTime = localStorage.getItem(lsTime(playlistId));
    const Time = parseFloat(strTime);
    document.getElementById('ytVideo').innerHTML=`
<iframe width="560" height="315" src="https://www.youtube.com/embed/${playlistId}?si=4twp3hSS44xcWiKM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
`;
  }
}
function ComposeCode() {
  txtExportModule = `module.export = {
  playlistId : '${player.getPlaylistId()}',
  videoIds : [${player.getPlaylist()}]
}`; 
  document.getElementById('myScript').value = txtExportModule;
}
function outputHTML(playlistId, isList) {
  SaveCurrentPlayer();
  _outputHTML(playlistId, isList);
}
function getPasteVideoId(url) {
  const be = 'https://youtu.be/';
  const pl = 'https://youtube.com/playlist';
  const wa = 'https://youtube.com/watch';
  if (url.startsWith(be)) {
    const s = 1 + url.lastIndexOf('/');
    const Q = url.indexOf('?');  
    return url.substr(s, Q - s);
  }
  if (url.startsWith(pl)) {
    const params = (new URL(url)).searchParams;
    return params.get('list');
  }
  if (url.startsWith(wa)) {
    const params = (new URL(url)).searchParams;
    return params.get('v');
  }
  return '';
}
function PlayYT() {
  const pasteText = document.getElementById('videoId');
  const url = pasteText.value;
  let videoId = getPasteVideoId(url);
  if (videoId === "") {
    if (!localStorage.getItem("last_playlistId")) {
      localStorage.setItem("last_playlistId", howtoId[getRandomIntInclusive(0,1)]);
    } 
    videoId = localStorage.getItem("last_playlistId");
  }
  localStorage.setItem("last_playlistId", videoId);
  const isAlist = videoId.startsWith('PL') || videoId.startsWith('OL');
  _outputHTML(videoId, isAlist);
}
const querystring = location.search;
if (querystring.startsWith('?videoid=')) {
  const params = (new URL(document.location)).searchParams;
  localStorage.setItem("last_playlistId", params.get('videoid'));
} else {
    if (!localStorage.getItem("last_playlistId")) {
      localStorage.setItem("last_playlistId", howtoId[getRandomIntInclusive(0,1)]);
    }
}   
const init_videoId = localStorage.getItem("last_playlistId");
const init_isAlist = init_videoId.startsWith("PL") || init_videoId.startsWith("OL");
// const tag = document.createElement('script');
// tag.id = 'iframe-demo';
// tag.src = 'https://www.youtube.com/iframe_api';
// const firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
_outputHTML(init_videoId, init_isAlist) 
function SaveCurrentPlayer(startOver = false) {
  const url = player.getVideoUrl();
  const m = url.match(/list=([^&]+)&/);
  if (m !== null) {
    localStorage.setItem("last_playlistId", m[1]);
    localStorage.setItem(lsTime(m[1]), player.getCurrentTime());
    localStorage.setItem(lsIndex(m[1]), player.getPlaylistIndex());
    if (startOver) {
      localStorage.setItem(lsTime(m[1]), 0);
      localStorage.setItem(lsIndex(m[1]), 0);
      // player.playVideoAt(0);
    }
    return;
    }
  const v = url.match(/v=([^=]+)$/);
  if (v !== null) {
    localStorage.setItem("last_playlistId", v[1]);
    localStorage.setItem(lsTime(v[1]), player.getCurrentTime());
    if (startOver) {
      localStorage.setItem(lsTime(v[1]), 0);
      //player.playVideo();
      if (player.getPlaylist() === null) player.loadVideoById(v[1], 0);
    }
    return;
    } 
}

function onYouTubeIframeAPIReady() {
// <div class="videoWrapper"><div id="ytVideo"></div></div>
  player = new YT.Player('ytVideo', {
    height: '315',
    width: '560',
    videoId: init_videoId,
    events: {
      'onReady': onPlayerReady,
      'onError': onPlayerError,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  _outputHTML(init_videoId, init_isAlist);
}

function onPlayerStateChange(event) {
  switch (event.data) {
    case 0:
    case 1:
    case 2:
      SaveCurrentPlayer(event.data === 0);
      break;
  }
}

function onPlayerError(event) {
  console.log(player.getVideoUrl());
}

function playSongsRandom() {
  if (Songs.length === 0) fillUpSongs();
  player.loadPlaylist(getRandomsWithin(Songs.length, 20).map(i => Songs[i]), 0, 0);
  player.setLoop(true);                 
}

function fillUpSongs() {
  const b = document.getElementsByTagName('a');
  let m = null;
  let i = -1;
  while (m === null) {
    i++;
    m = b[i].href.match(/\('(.*)'\)/);
  }
  while (m !== null) {
    Songs.push(m[1]);
    i++;
    m = b[i].href.match(/\('(.*)'\)/);
  }
}

function getRandomsWithin(Length, Number) {
  const arr = [];
  while (arr.length < Number) {
    const r = Math.floor(Math.random() * Length);
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}
