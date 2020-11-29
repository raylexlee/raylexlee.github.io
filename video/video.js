var Playlist, playlistIds, arg;
const Category = {
  "song":"Single Song", 
  "album":"Album", 
  "game":"Gaming Tutorial", 
  "code":"Coding Tutorial", 
  "radio":"Radio Drama", 
  "drama":"Video Drama", 
  "book":"Audio-book"
};
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
const optPlaylist = id => {
  const fullTitle = `${Playlist[id].title}(${Playlist[id].videoCount})`;
  const length = (fullTitle.charCodeAt(0) > 255) ? 10 : 20
  return `<option value="${id}" title="${fullTitle}">${fullTitle.substr(0,length)}`;
}; 
const optCategory = categoryId => `<option value="${categoryId}">${Category[categoryId]}`;
function handleClick() {
  const categoryId = document.getElementById("category").value;
  const videoIds = playlistIds.filter(id => Playlist[id].category === categoryId);
  const i = getRandomIntInclusive(0, videoIds.length - 1);
  document.getElementById("myPlaylist").innerHTML = videoIds
    .map(id => optPlaylist(id)).join('\n');
  outputHTML(videoIds[i]);  
}
fetch('video.json')
    .then(response => response.json())
    .then(data => { 
      Playlist = data;
      document.getElementById("category").innerHTML = Object.keys(Category)
        .map(id => optCategory(id)).join('\n');
      playlistIds = Object.keys(Playlist);
      const i = getRandomIntInclusive(0, playlistIds.length - 1);
      document.getElementById("category").value = Playlist[playlistIds[i]].category;
      document.getElementById("myPlaylist").innerHTML = playlistIds
        .filter(id => Playlist[id].category === Playlist[playlistIds[i]].category)
        .map(id => optPlaylist(id)).join('\n');
      outputHTML(playlistIds[i]);
    });
