var Playlist, playlistIds, videoIds, englishLength, chineseLength ;
const EnglishName = "raylex@HK.";
const ChineseName = "香港李潤明";
const Category = {
  "song":"Single Song", 
  "album":"Album", 
  "game":"Gaming Tutorial", 
  "code":"Coding Tutorial", 
  "radio":"Radio Drama", 
  "drama":"Video Drama", 
  "book":"Audio-book"
};
/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 * 
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 * 
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text, font) {
    // re-use canvas object for better performance
    let canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    let context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}
function GetTextLengths() {
  const winWidth = window.outerWidth * 0.55;
  const myFont = document.getElementById("myPlaylist").style.font;
  const englishWidth = getTextWidth(EnglishName, myFont) / 10;
  const chineseWidth = getTextWidth(ChineseName, myFont) / 5;
  englishLength = Math.floor(winWidth / englishWidth);
  chineseLength = Math.floor(winWidth / chineseWidth);
}
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
    try {
       document.getElementById('ytVideo').innerHTML = IframeHTML(playlistId);
    } catch(err) {
      document.getElementById('errMessage').innerText = err.message;
    }  
} 
function gotoPlaylist() {
    const playlistId = document.getElementById("myPlaylist").value;
    outputHTML(playlistId);
}
const optPlaylist = id => {
  const fullTitle = `${Playlist[id].title}(${Playlist[id].videoCount})`;
  const length = (fullTitle.charCodeAt(0) > 255) ? chineseLength : englishLength;
  return `<option value="${id}" title="${fullTitle}">${fullTitle.substr(0,length)}`;
}; 
const optCategory = categoryId => `<option value="${categoryId}">${Category[categoryId]}`;
function handleClick() {
  const categoryId = document.getElementById("category").value;
  videoIds = playlistIds.filter(id => Playlist[id].category === categoryId);
  const i = getRandomIntInclusive(0, videoIds.length - 1);
  document.getElementById("myPlaylist").innerHTML = videoIds
    .map(id => optPlaylist(id)).join('\n');
  outputHTML(videoIds[i]);  
}
function handleResize() {
  GetTextLengths();
  const myPlaylist = document.getElementById("myPlaylist");
  const oldValue = myPlaylist.value;
  myPlaylist.innerHTML = videoIds.map(id => optPlaylist(id)).join('\n');
  myPlaylist.value = oldValue;
}
fetch('video.json')
    .then(response => response.json())
    .then(data => { 
      Playlist = data;
      document.getElementById("category").innerHTML = Object.keys(Category)
        .map(id => optCategory(id)).join('\n');
      playlistIds = Object.keys(Playlist);
      const i = getRandomIntInclusive(0, playlistIds.length - 1);
      GetTextLengths();
      document.getElementById("category").value = Playlist[playlistIds[i]].category;
      videoIds = playlistIds .filter(id => Playlist[id].category === Playlist[playlistIds[i]].category)
      document.getElementById("myPlaylist").innerHTML = videoIds
        .map(id => optPlaylist(id)).join('\n');
      outputHTML(playlistIds[i]);
    });
