function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
const IframeHTML = playlistId => 
  '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/'
  + (playlistId.startsWith("PL") ? 'playlistseries?list=' : '') + playlistId 
  + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
function outputHTML(playlistId) {
  document.querySelector(".videoWrapper").innerHTML = IframeHTML(playlistId);
}
const b = document.getElementsByTagName('a');
let m = null;
while (m === null) {
  i = getRandomIntInclusive(0, b.length - 1);
  m = b[i].href.match(/\('(.*)'\)/);
}
outputHTML(m[1]);