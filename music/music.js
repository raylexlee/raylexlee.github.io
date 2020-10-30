function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
const IframeHTML = videoId => `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`; 
function outputHTML() {
    const i = getRandomIntInclusive(0, videoIds.length - 1);
    document.getElementById('myAlbum').value = videoIds[i];
    document.getElementById('musicvideo').innerHTML = IframeHTML(videoIds[i]);
} 
function gotoAlbum() {
  const videoId = document.getElementById("myAlbum").value;
  document.getElementById('musicvideo').innerHTML = IframeHTML(videoId);
}
const optAlbum = videoId => `<option value="${videoId}">${Album[videoId].album}`;
var Album, videoIds;
fetch('album.json')
    .then(response => response.json())
    .then(data => { 
      Album = data;
      videoIds = Object.keys(Album);
      document.getElementById("myAlbum").innerHTML = videoIds.map(id => optAlbum(id)).join('\n')
      outputHTML();
    });