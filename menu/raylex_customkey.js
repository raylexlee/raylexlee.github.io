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