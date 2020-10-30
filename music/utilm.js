function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
const IframeHTML = videoId => `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`; 
function outputHTML() {
    const i = getRandomIntInclusive(0, videoIds.length - 1);
    document.getElementById('musicvideo').innerHTML = IframeHTML(videoIds[i]);
} 
var Album, videoIds;
fetch('album.json')
    .then(response => response.json())
    .then(data => { 
      Album = data;
      videoIds = Object.keys(Album);
      outputHTML();
    });