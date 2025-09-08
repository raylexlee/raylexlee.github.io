let myHeadline;
let myContent;
let nDigits = 3;
let title, chapters;
let activeEpisode;
const querystring = location.search;
const params = (querystring != '') ? (new URL(document.location)).searchParams : 'none';
if (params === 'none') window.location = 'book.html?title=阿Q正傳';
title =  params.get('title');
title = title ? title : '阿Q正傳';
document.addEventListener("DOMContentLoaded", function(event) {
  myInit();
});
async function fetchText(file) {
  const response = await fetch(file);
  const text = await response.text();
  return text;
}
const contentUrl = chapter => `text/${title}/${chapter.substring(0,nDigits)}.txt`;
const coverparametersUrl = `text/${title}/coverparameters.txt`;
async function myInit() {
  myContent = document.getElementById('myContent');
  myHeadline = document.getElementById('myHeadline');
  const data = await fetchText(coverparametersUrl);
  chapters = data.replace(/\n+$/, "").split("\n");
  nDigits = chapters[0].indexOf(" ");      
  const chapter = getLastChapter();
  gotoChapter(chapter); 
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
async function gotoChapter(chapter) {
   activeEpisode = chapter.substring(0,nDigits);
   localStorage.setItem('book_activeEpisode'+title, activeEpisode);
   const headline=isHead => `<h5>
     <a href="javascript:prevChapter()" style="color:cyan;">&lArr;</a> 
     ${isHead ? chapter.substring(1 + nDigits).replace("_"," ") : '&nbsp'}
     <a href="javascript:nextChapter()" style="color:cyan;">&rArr;</a> 
     </h5>`;
   document.title = `${title} ${chapter.substring(1 + nDigits)}`;
const data = await fetchText(contentUrl(chapter));
       const paragraphs = data.replace(/\n+$/, "").split('\n');

       myHeadline.innerHTML = `${headline(true)}`;
       myContent.value = paragraphs.join('\n');
}
function getLastChapter() {
  if (!localStorage.getItem('book_activeEpisode'+title)) {
    const start_episode = chapters[0].substring(0,nDigits);
    localStorage.setItem('book_activeEpisode'+title,start_episode);
  }
  activeEpisode = localStorage.getItem('book_activeEpisode'+title);
  return chapters.find(c => c.startsWith(activeEpisode)); 
}
