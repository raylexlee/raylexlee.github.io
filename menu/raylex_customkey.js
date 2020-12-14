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
  if (Songs.length === 0) fillUpSongs();
  player.loadPlaylist(getRandomsWithin(Songs.length, 20).map(i => Songs[i]), 0, 0);
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