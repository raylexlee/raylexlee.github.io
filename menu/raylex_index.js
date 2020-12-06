let player;

const lsTime = ytId => `${ytId}Time`;
const lsIndex = ytId => `${ytId}Index`;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
const IframeHTML = playlistId =>
  '<iframe id="idIframe" width="560" height="315" src="https://www.youtube-nocookie.com/embed/' +
  (playlistId.startsWith("PL") ?
    ('playlistseries?enablejsapi=1&list=' + playlistId) :
    (playlistId + '?enablejsapi=1')) +
  '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

function genIframeHTML(playlistId) {
  document.querySelector(".videoWrapper").innerHTML = IframeHTML(playlistId);
}
function outputHTML(playlistId) {
  SaveCurrentPlayer();
  if (playlistId.startsWith('PL')) {
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
  }  else {
    if (!localStorage.getItem(lsTime(playlistId))) {
      localStorage.setItem(lsTime(playlistId), 0.0);
      }
    const Time = localStorage.getItem(lsTime(playlistId));
    player.loadVideoById({videoId: playlistId,
                      startSeconds: Time});  
  }
}
const b = document.getElementsByTagName('a');
let m = null;
while (m === null) {
  i = getRandomIntInclusive(0, b.length - 1);
  m = b[i].href.match(/\('(.*)'\)/);
}
genIframeHTML(m[1]);
if (m[1].StartsWith("PL")) { 
  if (!localStorage.getItem(lsTime(m[1]))) {
    localStorage.setItem(lsTime(m[1]), 0.0);
    localStorage.setItem(lsIndex(m[1]), "0");
    }
  } else {
  if (!localStorage.getItem(lsTime(m[1]))) {
    localStorage.setItem(lsTime(m[1]), 0.0);
    }
}
const tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function SaveCurrentPlayer() {
  const url = player.getVideoUrl();
  const m = url.match(/list=([^&]+)&v=/);
  if (m !== null) {
    localStorage.setItem(lsTime(m[1]), player.getCurrentTime());
    localStorage.setItem(lsIndex(m[1]), player.getPlaylistIndex());
    return;
    }
  const v = url.match(/v=([^=]+)$/);
  if (v !== null) {
    localStorage.setItem(lsTime(v[1]), player.getCurrentTime());
    return;
    } 
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('idIframe', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  document.getElementById('idIframe').style.borderColor = '#FF6D00';
}

function changeBorderColor(playerStatus) {
  var color;
  if (playerStatus == -1) {
    color = "#37474F"; // unstarted = gray
  } else if (playerStatus == 0) {
    color = "#FFFF00"; // ended = yellow
  } else if (playerStatus == 1) {
    color = "#33691E"; // playing = green
  } else if (playerStatus == 2) {
    color = "#DD2C00"; // paused = red
  } else if (playerStatus == 3) {
    color = "#AA00FF"; // buffering = purple
  } else if (playerStatus == 5) {
    color = "#FF6DOO"; // video cued = orange
  }
  if (color) {
    document.getElementById('idIframe').style.borderColor = color;
  }
}

function onPlayerStateChange(event) {
  changeBorderColor(event.data);
}
