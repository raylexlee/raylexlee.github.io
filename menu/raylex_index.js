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
function _outputHTML(playlistId) {
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
function outputHTML(playlistId) {
  SaveCurrentPlayer();
  _outputHTML(playlistId);
}
const b = document.getElementsByTagName('a');
let mOpeningVideoId = null;
while (mOpeningVideoId === null) {
  i = getRandomIntInclusive(0, b.length - 1);
  mOpeningVideoId = b[i].href.match(/\('(.*)'\)/);
}
genIframeHTML(mOpeningVideoId[1]);
const tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function SaveCurrentPlayer() {
  const url = player.getVideoUrl();
  const m = url.match(/list=([^&]+)&/);
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
  _outputHTML(mOpeningVideoId[1]);
}

function onPlayerStateChange(event) {
  SaveCurrentPlayer();
}