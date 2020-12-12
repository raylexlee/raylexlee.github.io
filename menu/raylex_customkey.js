document.onkeydown = (keyDownEvent) => {
  const keyPressed = keyDownEvent.key;
  keyDownEvent.preventDefault();  
  if (keyPressed === 'q') {
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
    textHint.getElementById("idHint").value 
      = `youtube-dl --extract-audio --audio-format mp3 --audio-quality 7 -o ${outputFilename} ${videoLink}`; 
    textHint.select();
    textHint.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");  
  }  
};