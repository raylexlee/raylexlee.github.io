let title, myContent, audio, myChapterList, myRange, myBook, myAutoplay;
let chapters;
// let mySync;
let activeEpisode;
let currentTime;
document.addEventListener("DOMContentLoaded", function(event) {
  myInit();
});
const soundUrl = chapter => `https://raylex.rhkcloud.com/audio/${title}/${chapter.substring(0,3)}.mp3`;
const contentUrl = chapter => `text/${title}/${chapter.substring(0,3)}.txt`;
function myInit() {
  title = document.title;
  myContent = document.getElementById('myContent');
  audio = document.getElementById('audio');
  myChapterList = document.getElementById('myChapterList');
  myRange = document.getElementById('myRange'); 
  mySpeed = document.getElementById('mySpeed'); 
  myBook = document.getElementById('myBook');
  myAutoplay = document.getElementById('myAutoplay');
  const optChapter = chapter => `<li><a href="javascript:gotoChapter('${chapter}')">${chapter.substring(4)}</a></li>`;
  let backto = 'index';
  const querystring = location.search;
  if (querystring != '') {
    const params = (new URL(document.location)).searchParams;
    const caller =  params.get('caller');
    backto = caller ? caller : backto;
  }
  const optIndexHtml = `<li><a href="${backto}.html">返　回　前　目　錄</a></li>`;
  myRange.oninput = function() {
    const v = myRange.value;
    myContent.style.fontSize = `${20 + parseInt(v)}px`;
  };
  mySpeed.oninput = function() {
    const v = mySpeed.value;
    audio.playbackRate = (85 + parseInt(v)) / 100;
  }
  audio.onplay = function (e) { 
    if (currentTime > audio.currentTime) {
      audio.currentTime = currentTime;
    }
    const pageTime = myContent.offsetHeight / myContent.scrollHeight * audio.duration / audio.playbackRate;
    console.log(pageTime);
    SyncAudioWithContent();
    // mySync = setInterval(SyncAudioWithContent, Math.round(pageTime*700));
  };
  audio.onpause = function (e) {
    localStorage.setItem('currentTime'+title, audio.currentTime);
//    clearInterval(mySync);
  };
  audio.onended = function (e) {
    if (myAutoplay.checked) {
      nextChapter();
    }
  }
  fetch(`text/${title}/coverparameters.txt`)
    .then(response => response.text())
    .then(data => {
      chapters = data.replace(/\n+$/, "").split('\n');
      myChapterList.innerHTML=`${optIndexHtml}\n${chapters.map(c => optChapter(c)).join('\n')}`; 
      ProcessMenu();
      document.getElementById('nav-toggle').onclick = function () {
        this.classList.toggle('active');
      };
      document.getElementById('nav-toggle').addEventListener('click', function () {
        document.querySelectorAll('nav ul').forEach(el => toggle(el));
        });
      const chapter = getLastChapter();
      gotoChapter(chapter); 
    });
}    
function prevChapter() {
    const m = audio.firstElementChild.src.match(/\/([0-9]{3})\.mp3$/);
    let i = chapters.findIndex(c => c.startsWith(m[1])) - 1;
    i = (i === -1) ? (chapters.length - 1) : i;
    const chapter = chapters[i];
    currentTime = 0.0;
    localStorage.setItem('currentTime'+title, 0.0);
    gotoChapter(chapter);
}
function nextChapter() {
    const m = audio.firstElementChild.src.match(/\/([0-9]{3})\.mp3$/);
    let i = 1 + chapters.findIndex(c => c.startsWith(m[1]));
    i = (i === chapters.length) ? 0 : i;
    const chapter = chapters[i];
    currentTime = 0.0;
    localStorage.setItem('currentTime'+title, 0.0);
    gotoChapter(chapter);
}
function SyncAudioWithContent() {
    const adjustment = 0.3;
    const portion = audio.currentTime / audio.duration ;
    myContent.scrollTop = portion * myContent.scrollHeight - adjustment * myContent.offsetHeight;
  }
function gotoChapter(chapter) {
   audio.firstElementChild.setAttribute('src', soundUrl(chapter));
   audio.load();
   activeEpisode = parseInt(chapter.substring(0,3));
   localStorage.setItem('activeEpisode'+title, activeEpisode);
   const loadchapterUrl = `loadchapter.html?book=${title}&episode=${chapter.substring(0,3)}`;
   myBook.innerHTML=`
     <a href="javascript:window.open('${loadchapterUrl}','readaloud');" style="color:cyan;">&#128220;</a> 
     ${title} 
     <a href="javascript:prevChapter()" style="color:cyan;">&lArr;</a> 
     ${chapter.substring(4)}
     <a href="javascript:nextChapter()" style="color:cyan;">&rArr;</a> 
     `;
   document.title = `${title} ${chapter.substring(4)}`;
   fetch(contentUrl(chapter))
     .then(response => response.text())
     .then(data => {
       myContent.value = data;
       myContent.scrollTop = 0.0;
       if (myAutoplay.checked) {
          audio.play();
          audio.currentTime = currentTime;
          SyncAudioWithContent();
       }
     });
}
function toggle(elem) {
  elem.style.display = (elem.style.display === 'none') ? 'block' : 'none';
}

function ProcessMenu() {
  document.querySelectorAll('nav ul li > a:not(:only-child)')
    .forEach(el => el.onclick = function (e) {
      const nd = this.nextElementSibling;
      document.querySelectorAll('.nav-dropdown')
        .forEach(function(elem) { 
          if (elem === nd) {
            toggle(nd);
          } else {
            elem.style.display = 'none';
          }});
      e.stopPropagation();
    });
  document.documentElement.onclick = function () {
    document.querySelectorAll('.nav-dropdown').forEach(el => el.style.display = 'none');
  };
}
function getLastChapter() {
  if (!localStorage.getItem('activeEpisode'+title)) {
    const start_episode = parseInt(chapters[0].substring(0,3));
    localStorage.setItem('activeEpisode'+title,start_episode);
    localStorage.setItem('currentTime'+title, 0.0);
  }
  activeEpisode = localStorage.getItem('activeEpisode'+title);
  currentTime = localStorage.getItem('currentTime'+title);
  return chapters.find(c => c.startsWith(activeEpisode.padStart(3, '0'))) 
}
