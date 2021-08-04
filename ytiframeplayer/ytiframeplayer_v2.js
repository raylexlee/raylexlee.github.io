let player;
let Songs = [];
const howtoId = ['cg7OJWTGnaY', 'cg7OJWTGnaY']

const lsTime = ytId => `${ytId}Time`;
const lsIndex = ytId => `${ytId}Index`;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
const IframeHTML = (playlistId, isList = false) =>
  '<iframe id="idIframe" width="560" height="315" src="https://www.youtube-nocookie.com/embed/' +
  (isList ?
    ('playlistseries?enablejsapi=1&list=' + playlistId) :
    (playlistId + '?enablejsapi=1')) +
  '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

function genIframeHTML(playlistId, isList) {
  document.querySelector(".videoWrapper").innerHTML = IframeHTML(playlistId, isList);
}
function _outputHTML(playlistId, isList) {
  if (isList) {
    if (!localStorage.getItem(lsTime(playlistId))) {
      localStorage.setItem(lsTime(playlistId), 0.0);
      localStorage.setItem(lsIndex(playlistId), "0");
      }
    const Time = localStorage.getItem(lsTime(playlistId));
    const Index = localStorage.getItem(lsIndex(playlistId));
    player.loadPlaylist({list: playlistId,
                     listType: 'playlist',
                     index: Index,
                     startSeconds: Time});
    player.setLoop(true);                 
  }  else {
    if (!localStorage.getItem(lsTime(playlistId))) {
      localStorage.setItem(lsTime(playlistId), 0.0);
      }
    const Time = localStorage.getItem(lsTime(playlistId));
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
genIframeHTML(init_videoId, init_isAlist);
const tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function SaveCurrentPlayer(startOver = false) {
  const url = player.getVideoUrl();
  console.log(url);
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
  player = new YT.Player('idIframe', {
    events: {
      'onReady': onPlayerReady,
      'onError': onPlayerError,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  // _outputHTML(mOpeningVideoId[1]);
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
