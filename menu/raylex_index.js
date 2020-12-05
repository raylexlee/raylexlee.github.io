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
  if (playlistId.startsWith('PL')) {
    player.loadPlaylist({list: playlistId,
                     listType: 'playlist',
                     index: 0,
                     startSeconds: 0});
  }  else {
    player.loadVideoById({videoId: playlistId,
                      startSeconds: 0,
                      endSeconds: 0});  
  }
}
const b = document.getElementsByTagName('a');
let m = null;
while (m === null) {
  i = getRandomIntInclusive(0, b.length - 1);
  m = b[i].href.match(/\('(.*)'\)/);
}
genIframeHTML(m[1]);
const tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

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