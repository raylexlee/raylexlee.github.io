var Album, videoIds, arg;
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
const IframeHTML = videoId => `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`; 
const optSong = timeTitle => {
  const start = ('Start' in timeTitle) ? timeTitle.Start : '';
  const song = ('Artist' in timeTitle ) ? `${timeTitle.Artist}-${timeTitle.Title}` : timeTitle.Title;
  return start 
      ? `<option value="${start}">${timestamp(timeTitle.Time)} ${song.replace(/\\/g, '')}`
      : `<option value="">${song.replace(/\\/g, '')}`;
};
function outputHTML(arg) {
    const link = arg.link;
    const album = arg.albumObj;
    const GetShScriptFunc = /\(\?<t>/.test(album.regex) ? xgetsongs : getsongs;
    const r = GetShScriptFunc(arg);
    document.getElementById("mySong").innerHTML = r.TimeTitles.map(id => optSong(id)).join('\n')
    document.getElementById('myAlbum').value = link;
    document.getElementById('musicvideo').innerHTML = IframeHTML(link);
    document.getElementById('myScript').value = r.shscript;
} 
function gotoAlbum() {
    const videoId = document.getElementById("myAlbum").value;
    outputHTML({link: videoId, albumObj: Album[videoId]})
}
function gotoSong() {
    const start = document.getElementById("mySong").value;
    if (start) {
        const videoId = document.getElementById("myAlbum").value;
        const link = `${videoId}?start=${start}&autoplay=1`;
        document.getElementById('musicvideo').innerHTML = IframeHTML(link);
    }
}
const timestamp = splitTime => {
  const s = splitTime.split('.');
  const r = s[0] % 60;
  const d = (s[0] - r) / 60;
  const h = (d===0) ? '' : `${d}:`;
  return `${h}${r}:${s[1]}`; 
};
const optAlbum = videoId => `<option value="${videoId}">${Album[videoId].album}`;
fetch('album.json')
    .then(response => response.json())
    .then(data => { 
      Album = data;
      videoIds = Object.keys(Album);
      document.getElementById("myAlbum").innerHTML = videoIds.map(id => optAlbum(id)).join('\n')
      const i = getRandomIntInclusive(0, videoIds.length - 1);
      arg = {link: videoIds[i], albumObj: Album[videoIds[i]]};
      outputHTML(arg);
    });
