const musicIframeHTML = videoId => `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`; 
const optSong = timeTitle => {
  const start = ('Start' in timeTitle) ? timeTitle.Start : '';
  const song = ('Artist' in timeTitle ) ? `${timeTitle.Artist}-${timeTitle.Title}` : timeTitle.Title;
  return start 
      ? `<option value="${start}">${timestamp(timeTitle.Time)} ${song.replace(/\\/g, '')}`
      : `<option value="">${song.replace(/\\/g, '')}`;
};
function Compile() {
    const pasteText = document.getElementById('videoId');
    const url = pasteText.value;
    let videoId = '';
    const v = url.match(/^https:\/\/youtu\.be\/(.*)$/);
    if (v !== null) videoId = v[1];
    if (videoId === '') return;    
    const regex = document.getElementById('myRegex').value;
    if (regex === '') return;
    const album = document.getElementById('myAlbum').value;
    if (album === '') return;
    const artist = document.getElementById('myArtist').value;
    if (artist === '') return;
    const timetitles = document.getElementById('myTimetitles').value;
    if (timetitles === '') return;
    const arg = { 
                   link: videoId,
                   albumObj : {
                                 album: album,
                                 singer: artist,
                                 regex: regex,
                                 timetitles: timetitles.replace(/\n+$/, "").split("\n")
                              }
                };
    const GetShScriptFunc = /\(\?<t>/.test(regex) ? xgetsongs : getsongs;
    const r = GetShScriptFunc(arg);
    document.getElementById("mySong").innerHTML = r.TimeTitles.map(id => optSong(id)).join('\n')
    document.getElementById('myScript').value = r.shscript;
} 
function gotoSong() {
    const start = document.getElementById("mySong").value;
    if (start) {
        const pasteText = document.getElementById('videoId');
        const url = pasteText.value;
        let videoId = '';
        const v = url.match(/^https:\/\/youtu\.be\/(.*)$/);
        if (v !== null) videoId = v[1];
        if (videoId === '') return;    
        const link = `${videoId}?start=${start}&autoplay=1`;
        document.querySelector(".videoWrapper").innerHTML = musicIframeHTML(link);
    }
}
const timestamp = splitTime => {
  const s = splitTime.split('.');
  const r = s[0] % 60;
  const d = (s[0] - r) / 60;
  const h = (d===0) ? '' : `${d}:`;
  return `${h}${r}:${s[1]}`; 
};
