let Songs = [];
document.onkeydown = (keyDownEvent) => {
  const keyPressed = keyDownEvent.key;
  keyDownEvent.preventDefault();
  switch (keyPressed) {
    case 'q':
      copyHintToClipboard();
      break;
    case 'p':
      playSongsRandom();
      break;
  }
};

function copyHintToClipboard() {
  const url = player.getVideoUrl();
  const m = url.match(/list=([^&]+)&/);
  let videoLink, outputFilename;
  if (m === null) {
    const v = url.match(/v=([^=]+)$/);
    videoLink = `https://www.youtube.com/watch?v=${v[1]}`;
    outputFilename = "'%(title)s.%(ext)s'";
  } else {
    videoLink = `https://www.youtube.com/playlist?list=${m[1]}`;
    outputFilename = "'%(playlist_index)s-%(title)s.%(ext)s'";
  };
  const textHint = document.getElementById("idHint");
  textHint.innerText = `youtube-dl --extract-audio --audio-format mp3 --audio-quality 7 -o ${outputFilename} ${videoLink}`;
  const r = document.createRange();
  r.selectNode(textHint);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
}

function playSongsRandom() {
  if (Songs.length === 0) {
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
  const arr = [];
  while(arr.length < 10){
    const r = Math.floor(Math.random() * Songs.length;
    if(arr.indexOf(r) === -1) arr.push(r);
  }

  player.loadPlaylist(arr.map(i => Songs[i]));
  player.setShuffle(true);
  player.playVideo(); 
}