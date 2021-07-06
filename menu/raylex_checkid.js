function firstFiveSecons(playlistId) {
  if (playlistId.startsWith('PL')) {
    const Time = 0;
    const Index = ;
    player.loadPlaylist({list: playlistId,
                     listType: 'playlist',
                     index: Index,
                     startSeconds: Time,
                     endSeconds: 5});
  }  else {
    const Time = 0;
    player.loadVideoById({videoId: playlistId,
                     startSeconds: Time,
                     endSeconds: 5});
  }
}
const Vids = [];
function fillUpVids() {
  const b = document.getElementsByTagName('a');
  let m = null;
  let i = -1;
  for (i=0; i < b.length; i++) {
    m = b[i].href.match(/\('(.*)'\)/);
    if (m === null) {
      continue;
    }
    Vids.push(m[1]);
  }
}
function onPlayer5sStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    ProcessNext();
  }
}

function onPlayer5sError(event) {
  document.getElementById('idError').value += `\n${player.getVideoUrl()}`;
  ProcessNext();
}

function ProcessNext() {
   if (Vids.length == 0) {
      player.events.onError = onPlayerError;
      player.events.onStateChange = onPlayerStateChange;
      return 0;
   }
   firstFiveSeconds(Vids.pop());
}

function StartChecking() {
   player.events.onError = onPlayer5sError;
   player.events.onStateChange = onPlayer5sStateChange;
   ProcessNext();
}
