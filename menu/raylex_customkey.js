document.onkeydown = (keyDownEvent) => {
  const keyPressed = keyDownEvent.key;  
  keyDownEvent.preventDefault();  
  if (keyPressed === 'a') {
    const url = player.getVideoUrl();
    const m = url.match(/list=([^&]+)&v=/);
    let videoLink, outputFilename;
    if (m === null) {
        const v = url.match(/v=([^=]+)$/);
        videoLink = `https://www.youtube.com/watch?v=${v[1]}`;
        outputFilename = "'%(title)s.%(ext)s'";
    } else {
        vidoeLink = `https://www.youtube.com/playlist?list=${m[1]}`;
        outputFilename = "'%(playlist_index)s-%(title)s.%(ext)s'";
    }
    document.getElementById("idHint").innerHTML 
      = `youtube-dl --extract-audio --audio-format mp3 --audio-quality 7 -o ${outputFilename} ${videoLink}`; 
  }  
};