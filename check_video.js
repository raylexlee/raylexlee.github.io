function outputHTML(category, title, vtype) {
  const avpromo_ = document.getElementById('avpromo');
  const video_ = document.createElement('video');
  video_.setAttribute('controls', true);
  video_.setAttribute('width','90%');
  video_.setAttribute('height', 'auto');
  const vmid = `${category}${title.padStart(5,'0')}`;
  const cover = `https://pics.dmm.co.jp/digital/video/${vmid}/${vmid}pl.jpg`;
  video_.setAttribute('poster', cover);
  const source_ = document.createElement('source');
  source_.setAttribute('type','video/mp4');
  video_.appendChild(source_);
  avpromo_.appendChild(video_);
  const vpath = `${category}${title}`;
  const video = `https://cc3001.dmm.co.jp/litevideo/freepv/${vpath[0]}/${vpath.slice(0,3)}/${vpath}/${vpath}_${vtype}.mp4`;
  source_.setAttribute('src', video);
  // source_.onerror = ErrorRemedy;
  video_.volume = 0;
  // document.title = jav.code().toUpperCase();
}
const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const url = av => `https://www.dmm.co.jp/service/digitalapi/-/html5_player/=/cid=${av}/mtype=AhRVShI_/service=digital/floor=videoa/mode=/`; 
const video = new XRegExp(
  '^.*/(?<category>[0-9a-z_]*[a-z])(?<title>[0-9]{3,5})_(?<vtype>.*)\.mp4\"\}\]', 's');	
function GetAvp() {
  const avnbr = document.getElementById('avnbr');  
  fetch(proxyurl + url(avnbr.value.toLowerCase())) // https://cors-anywhere.herokuapp.com/url(av#)
    .then(response => response.text())
    .then(function(contents) {  
      const match = XRegExp.exec(contents, video);
      outputHTML(match.category, match.title, match.vtype);
      console.log(match.category);
      console.log(match.title);
      console.log(match.vtype);
    } )
    .catch(() => console.log('Can’t access ' + url(avnbr.value) + ' response. Blocked by browser?'));
}