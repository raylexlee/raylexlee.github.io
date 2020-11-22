var Playlist, playlistIds, arg;
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
const IframeHTML = playlistId => `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/playlistseries?list=${playlistId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`; 
function outputHTML(playlistId) {
    document.getElementById('myPlaylist').value = playlistId;
    document.getElementById('radiodrama').innerHTML = IframeHTML(playlistId);
} 
function gotoPlaylist() {
    const playlistId = document.getElementById("myPlaylist").value;
    outputHTML(playlistId);
}
const optPlaylist = playlistId => `<option value="${playlistId}">${Playlist[playlistId].title}(${Playlist[playlistId].videoCount}集)`;
fetch('playlist.json')
    .then(response => response.json())
    .then(data => { 
      Playlist = data;
      playlistIds = Object.keys(Playlist);
      document.getElementById("myPlaylist").innerHTML = playlistIds.map(id => optPlaylist(id)).join('\n')
      const i = getRandomIntInclusive(0, playlistIds.length - 1);
      outputHTML(playlistIds[i]);
    });
