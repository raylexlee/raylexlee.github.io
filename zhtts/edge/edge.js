let title, myContent, myChapterList, myBook;
let chapters;
let activeEpisode;

document.addEventListener("DOMContentLoaded", function(event) {
  
  window.open('', 'readaloud');
  myInit();
});
const contentUrl = chapter => `../text/${title}/${chapter.substring(0,3)}.txt`;
function myInit() {
  title = document.title;
  myContent = document.getElementById('myContent');
  myChapterList = document.getElementById('myChapterList');
  myBook = document.getElementById('myBook');
  const optChapter = chapter => `<li><a href="javascript:gotoChapter('${chapter}')">${chapter.substring(4)}</a></li>`;
  let backto = 'index';
  const querystring = location.search;
  if (querystring != '') {
    const params = (new URL(document.location)).searchParams;
    const caller =  params.get('caller');
    backto = caller ? caller : backto;
  }
  const optIndexHtml = `<li><a href="${backto}.html">返　回　前　目　錄</a></li>`;
  fetch(`../text/${title}/coverparameters.txt`)
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
    const idx =chapters.findIndex(c => c.startsWith(activeEpisode));
    let i = idx - 1;
    i = (i === -1) ? (chapters.length - 1) : i;
    const chapter = chapters[i];
    gotoChapter(chapter);
}
function nextChapter() {
    const idx =chapters.findIndex(c => c.startsWith(activeEpisode));
    let i = idx + 1;
    i = (i === chapters.length) ? 0 : i;
    const chapter = chapters[i];
    gotoChapter(chapter);
}
function gotoChapter(chapter) {
   activeEpisode = chapter.substring(0,3);
   localStorage.setItem('edge_activeEpisode'+title, activeEpisode);
   myBook.innerHTML=`${title} 
     <a href="javascript:prevChapter()" style="color:cyan;">&lArr;</a> 
     ${chapter.substring(4)}
     <a href="javascript:nextChapter()" style="color:cyan;">&rArr;</a> 
     `;
   document.title = `${title} ${chapter.substring(4)}`;
   fetch(contentUrl(chapter))
     .then(response => response.text())
     .then(data => {
       myContent.value = data;
       window.open(contentUrl(chapter), 'readaloud');
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
  if (!localStorage.getItem('edge_activeEpisode'+title)) {
    const start_episode = chapters[0].substring(0,3);
    localStorage.setItem('edge_activeEpisode'+title,start_episode);
  }
  activeEpisode = localStorage.getItem('edge_activeEpisode'+title);
  return chapters.find(c => c.startsWith(activeEpisode)); 
}
