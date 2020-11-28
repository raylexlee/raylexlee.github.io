var Playlist, playlistIds, arg;
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
const IframeHTML = playlistId =>  playlistId.startsWith("PL") 
  ? `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/playlistseries?list=${playlistId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` 
  : `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${playlistId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`; 
function outputHTML(playlistId) {
    document.getElementById('myPlaylist').value = playlistId;
    document.getElementById('ytVideo').innerHTML = IframeHTML(playlistId);
} 
function gotoPlaylist() {
    const playlistId = document.getElementById("myPlaylist").value;
    outputHTML(playlistId);
}
const optPlaylist = playlistId => `<option value="${playlistId}">${Playlist[playlistId].title}(${Playlist[playlistId].videoCount})`;
function handleClick(myRadio) {
  document.getElementById("myPlaylist").innerHTML = playlistIds
    .filter(id => Playlist[id].category === myRadio.value)
    .map(id => optPlaylist(id)).join('\n');
}
fetch('video.json')
    .then(response => response.json())
    .then(data => { 
      Playlist = data;
      playlistIds = Object.keys(Playlist);
      const i = getRandomIntInclusive(0, playlistIds.length - 1);
      document.getElementById(Playlist[playlistIds[i]].category).checked = true;
      document.getElementById("myPlaylist").innerHTML = playlistIds
        .filter(id => Playlist[id].category === Playlist[playlistIds[i]].category)
        .map(id => optPlaylist(id)).join('\n');
      outputHTML(playlistIds[i]);
    });
