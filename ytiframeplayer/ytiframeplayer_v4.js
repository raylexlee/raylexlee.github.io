let player;
const howtoId = ['VyaYyItkoGU', 'cg7OJWTGnaY']

const lsTime = ytId => `${ytId}Time`;
const lsIndex = ytId => `${ytId}Index`;

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
    player.loadPlaylist({list: playlistId,
                     listType: 'playlist',
                     index: Index,
                     startSeconds: Time});
    player.setLoop(true);                 
  }  else {
    if (!localStorage.getItem(lsTime(playlistId))) {
      localStorage.setItem(lsTime(playlistId), 0.0);
      }
    const strTime = localStorage.getItem(lsTime(playlistId));
    const Time = parseFloat(strTime);
    player.loadVideoById({videoId: playlistId,
                      startSeconds: Time});  
  }
}
function outputHTML(playlistId, isList) {
  SaveCurrentPlayer();
  _outputHTML(playlistId, isList);
}
function PlayYT() {
  const pasteText = document.getElementById('videoId');
  const url = pasteText.value;
  let isAlist=false;
  const m = url.match(/^https:\/\/youtube\.com\/playlist\?list=(.*)$/);
  let videoId = '';
  if (m !== null) {
    videoId = m[1];
    isAlist = true; 
  } else {
    const v = url.match(/^https:\/\/youtu\.be\/(.*)$/);
    if (v !== null) videoId = v[1];    
  }
  if (videoId === "") {
    if (!localStorage.getItem("last_playlistId")) {
      localStorage.setItem("last_playlistId", howtoId[getRandomIntInclusive(0,1)]);
    } 
    videoId = localStorage.getItem("last_playlistId");
    isAlist = videoId.startsWith("PL") || videoId.startsWith("OL");
  }
  localStorage.setItem("last_playlistId", videoId);
  _outputHTML(videoId, isAlist);
}
if (!localStorage.getItem("last_playlistId")) {
  localStorage.setItem("last_playlistId", howtoId[getRandomIntInclusive(0,1)]);
} 
const init_videoId = localStorage.getItem("last_playlistId");
const init_isAlist = init_videoId.startsWith("PL") || init_videoId.startsWith("OL");
const tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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
