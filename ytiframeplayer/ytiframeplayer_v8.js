let player;
let txtExportModule;
let Songs = [];
const legend = {
"en":"Thanks for using iframe to watch YouTube video with minimal and quiet advertisement. The following link starts with youtube id",
"zh-cn":"感谢您使用 iframe 以最少且安静的广告观看 YouTube 视频。以下链接以 youtube id 开头",
"zh-hk":"感謝您使用 iframe 以最少且安靜的廣告觀看 YouTube 視頻。以下鏈接以 youtube id 開頭",
"zh-tw":"感謝您使用 iframe 以最少且安靜的廣告觀看 YouTube 視頻。以下鏈接以 youtube id 開頭",
"ja":"最小限の静かな広告でYouTubeビデオを視聴するためにiframeを使用していただきありがとうございます。次のリンクはyoutube idで始まります",
"ko":"iframe을 사용하여 최소한의 조용한 광고로 YouTube 동영상을 시청해주셔서 감사합니다. 다음 링크는 youtube id로 시작합니다.",
"ru":"Благодарим за использование iframe для просмотра видео на YouTube с минимальной и тихой рекламой. Следующая ссылка начинается с идентификатора YouTube",
"fr":"Merci d'avoir utilisé iframe pour regarder une vidéo YouTube avec une publicité minimale et silencieuse. Le lien suivant commence par l'identifiant youtube",
"th":"ขอบคุณที่ใช้ iframe เพื่อดูวิดีโอ YouTube ที่มีโฆษณาน้อยที่สุดและเงียบ ลิงค์ต่อไปนี้ขึ้นต้นด้วย youtube id",
"nl":"Bedankt voor het gebruik van iframe om YouTube-video's te bekijken met minimale en stille advertenties. De volgende link begint met youtube id",
"it":"Grazie per aver utilizzato iframe per guardare i video di YouTube con pubblicità minima e silenziosa. Il seguente link inizia con l'id di YouTube",
"ml":"കുറഞ്ഞതും നിശബ്ദവുമായ പരസ്യത്തോടെ YouTube വീഡിയോ കാണാൻ iframe ഉപയോഗിച്ചതിന് നന്ദി. ഇനിപ്പറയുന്ന ലിങ്ക് യൂട്യൂബ് ഐഡിയിൽ തുടങ്ങുന്നു",
"la":"Thanks for using iframe to watch YouTube video with minimal and quiet advertisement. Vinculum sequens incipit cum YouTube id",
"pt":"Obrigado por usar iframe para assistir a vídeos do YouTube com publicidade mínima e silenciosa. O seguinte link começa com o id do youtube",
"pl":"Dziękujemy za użycie iframe do oglądania filmów na YouTube z minimalną i cichą reklamą. Poniższy link zaczyna się od identyfikatora youtube",
"cs":"Děkujeme, že používáte iframe ke sledování videa YouTube s minimální a tichou reklamou. Následující odkaz začíná youtube id",
"es":"Gracias por usar iframe para ver videos de YouTube con publicidad mínima y silenciosa. El siguiente enlace comienza con la identificación de youtube",
"de":"Vielen Dank, dass Sie iframe verwenden, um YouTube-Videos mit minimaler und leiser Werbung anzusehen. Der folgende Link beginnt mit der YouTube-ID",
"sv":"Tack för att du använder iframe för att titta på YouTube -video med minimal och tyst reklam. Följande länk börjar med youtube -id",
"el":"Σας ευχαριστούμε που χρησιμοποιήσατε το iframe για να παρακολουθήσετε βίντεο στο YouTube με ελάχιστη και αθόρυβη διαφήμιση. Ο παρακάτω σύνδεσμος ξεκινά με το αναγνωριστικό του youtube",
"hi":"कम से कम और शांत विज्ञापन के साथ YouTube वीडियो देखने के लिए iframe का उपयोग करने के लिए धन्यवाद। निम्न लिंक यूट्यूब आईडी से शुरू होता है",
"id":"Terima kasih telah menggunakan iframe untuk menonton video YouTube dengan iklan minimal dan senyap. Tautan berikut dimulai dengan id youtube",
"lo":"ຂອບໃຈທີ່ໃຊ້ iframe ເພື່ອເບິ່ງວິດີໂອ YouTube ດ້ວຍການໂຄສະນາ ໜ້ອຍ ທີ່ສຸດແລະງຽບສະຫງົບ. ລິ້ງຕໍ່ໄປນີ້ເລີ່ມຕົ້ນດ້ວຍ id youtube",
"fi":"Kiitos, että käytit iframea YouTube -videon katsomiseen minimaalisella ja hiljaisella mainoksella. Seuraava linkki alkaa youtuben tunnuksella",
"ne":"न्यूनतम र शान्त विज्ञापन संग YouTube भिडियो हेर्न iframe को लागी धन्यवाद। निम्न लि you्क youtube id बाट सुरु हुन्छ",
"tr":"Minimum ve sessiz reklamlarla YouTube videosunu izlemek için iframe kullandığınız için teşekkür ederiz. Aşağıdaki bağlantı youtube kimliği ile başlar",
"vi":"Cảm ơn bạn đã sử dụng iframe để xem video YouTube với quảng cáo tối thiểu và yên tĩnh. Liên kết sau bắt đầu bằng id youtube"
};

const howtoId = ['VyaYyItkoGU', 'cg7OJWTGnaY']

const lsTime = ytId => `${ytId}Time`;
const lsIndex = ytId => `${ytId}Index`;
const shareLink = queryString => `https://raylexlee.github.io/ytiframeplayer/${queryString}`;


function ShareIframe() {
  const last_playlistId = localStorage.getItem("last_playlistId");
  const queryStr = last_playlistId ? `?videoid=${last_playlistId}` : ''; 
  const url = shareLink(queryStr);
  const QR = document.getElementById('qrcode');
  if (url !== QR.title) {
    qrcode.clear(); // clear the code.
    qrcode.makeCode(url); // make another code.
  }
  let language = navigator.language.toLowerCase();
  language = language.startsWith('zh') ? language : language.substring(0,2);
  language = (Object.keys(legend).indexOf(language) === -1) ? 'en' : language;
  const shareData = {
      title: document.title,
      text: `${legend[language]} ${last_playlistId}`,
      url: shareLink(queryStr)
    };
  navigator.share(shareData)
    .then(() => {
          document.getElementById('shareLink').innerText = navigator.language;  
          console.log('ok')
          }
        )
        .catch((e) => {
          document.getElementById('shareLink').innerText = shareData.url;  
          console.log(e)
        }
        )
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
function _outputHTML(playlistId, isList) {
  if (isList) {
    if (!localStorage.getItem(lsTime(playlistId))) {
      localStorage.setItem(lsTime(playlistId), 0.0);
      localStorage.setItem(lsIndex(playlistId), "0");
      }
    const strTime = localStorage.getItem(lsTime(playlistId));
    const Time = parseFloat(strTime);
    const strIndex = localStorage.getItem(lsIndex(playlistId));
    const Index = parseInt(strIndex);
    player.loadPlaylist({list: playlistId,
                     listType: 'playlist',
                     index: Index,
                     startSeconds: Time});
    player.setLoop(true);                 
  }  else {
    if (!localStorage.getItem(lsTime(playlistId))) {
      localStorage.setItem(lsTime(playlistId), 0.0);
      }
    const strTime = localStorage.getItem(lsTime(playlistId));
    const Time = parseFloat(strTime);
    player.loadVideoById({videoId: playlistId,
                      startSeconds: Time});  
  }
}
function ComposeCode() {
  txtExportModule = `module.export = {
  playlistId : '${player.getPlaylistId()}',
  videoIds : [${player.getPlaylist()}]
}`; 
  document.getElementById('myScript').value = txtExportModule;
}
function outputHTML(playlistId, isList) {
  SaveCurrentPlayer();
  _outputHTML(playlistId, isList);
}
function getPasteVideoId(url) {
  const be = 'https://youtu.be/';
  const pl = 'https://youtube.com/playlist';
  const wa = 'https://youtube.com/watch';
  if (url.startsWith(be)) {
    const s = 1 + url.lastIndexOf('/');
    const Q = url.indexOf('?');  
    return url.substr(s, Q - s);
  }
  if (url.startsWith(pl)) {
    const params = (new URL(url)).searchParams;
    return params.get('list');
  }
  if (url.startsWith(wa)) {
    const params = (new URL(url)).searchParams;
    return params.get('v');
  }
  return '';
}
function PlayYT() {
  const pasteText = document.getElementById('videoId');
  const url = pasteText.value;
  let videoId = getPasteVideoId(url);
  if (videoId === "") {
    if (!localStorage.getItem("last_playlistId")) {
      localStorage.setItem("last_playlistId", howtoId[getRandomIntInclusive(0,1)]);
    } 
    videoId = localStorage.getItem("last_playlistId");
  }
  localStorage.setItem("last_playlistId", videoId);
  const isAlist = videoId.startsWith('PL') || videoId.startsWith('OL');
  _outputHTML(videoId, isAlist);
}
const querystring = location.search;
if (querystring.startsWith('?videoid=')) {
  const params = (new URL(document.location)).searchParams;
  localStorage.setItem("last_playlistId", params.get('videoid'));
} else {
    if (!localStorage.getItem("last_playlistId")) {
      localStorage.setItem("last_playlistId", howtoId[getRandomIntInclusive(0,1)]);
    }
}   
const init_videoId = localStorage.getItem("last_playlistId");
const init_isAlist = init_videoId.startsWith("PL") || init_videoId.startsWith("OL");
const tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function SaveCurrentPlayer(startOver = false) {
  const url = player.getVideoUrl();
  const m = url.match(/list=([^&]+)&/);
  if (m !== null) {
    localStorage.setItem("last_playlistId", m[1]);
    localStorage.setItem(lsTime(m[1]), player.getCurrentTime());
    localStorage.setItem(lsIndex(m[1]), player.getPlaylistIndex());
    if (startOver) {
      localStorage.setItem(lsTime(m[1]), 0);
      localStorage.setItem(lsIndex(m[1]), 0);
      // player.playVideoAt(0);
    }
    return;
    }
  const v = url.match(/v=([^=]+)$/);
  if (v !== null) {
    localStorage.setItem("last_playlistId", v[1]);
    localStorage.setItem(lsTime(v[1]), player.getCurrentTime());
    if (startOver) {
      localStorage.setItem(lsTime(v[1]), 0);
      //player.playVideo();
      if (player.getPlaylist() === null) player.loadVideoById(v[1], 0);
    }
    return;
    } 
}

function onYouTubeIframeAPIReady() {
// <div class="videoWrapper"><div id="ytVideo"></div></div>
  player = new YT.Player('ytVideo', {
    height: '315',
    width: '560',
    videoId: init_videoId,
    events: {
      'onReady': onPlayerReady,
      'onError': onPlayerError,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  _outputHTML(init_videoId, init_isAlist);
}

function onPlayerStateChange(event) {
  switch (event.data) {
    case 0:
    case 1:
    case 2:
      SaveCurrentPlayer(event.data === 0);
      break;
  }
}

function onPlayerError(event) {
  console.log(player.getVideoUrl());
}

function playSongsRandom() {
  if (Songs.length === 0) fillUpSongs();
  player.loadPlaylist(getRandomsWithin(Songs.length, 20).map(i => Songs[i]), 0, 0);
  player.setLoop(true);                 
}

function fillUpSongs() {
  const b = document.getElementsByTagName('a');
  let m = null;
  let i = -1;
  while (m === null) {
    i++;
    m = b[i].href.match(/\('(.*)'\)/);
  }
  while (m !== null) {
    Songs.push(m[1]);
    i++;
    m = b[i].href.match(/\('(.*)'\)/);
  }
}

function getRandomsWithin(Length, Number) {
  const arr = [];
  while (arr.length < Number) {
    const r = Math.floor(Math.random() * Length);
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}
