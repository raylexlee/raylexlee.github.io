let episode,drama, group;
let title, chapter, mode; 
const Drama = []; 
const Group = {};
let lastRadioDramaTitle, lastMode;
let activeEpisode;
let currentTime;
const querystring = location.search;
const params = (querystring != '') ? (new URL(document.location)).searchParams : 'none';
if (params === 'none') {
  title = localStorage.getItem('lastRadioDramaTitle');
  if (!title) title = radiodrama.title;
  window.location = `index.html?title=${title}`;
}
title =  params.get('title');
title = title ? title : radiodrama.title;
  const e = params.get('episode');
  const t = params.get('time');
  if (e && t) {
    localStorage.setItem('activeEpisode'+title,e);
    localStorage.setItem('currentTime'+title, t);
    window.location = `index.html?title=${title}`;
  }
if (!localStorage.getItem('activeEpisode'+title)) {
  localStorage.setItem('activeEpisode'+title, '1');
  localStorage.setItem('currentTime'+title, 0.0);
}
activeEpisode = localStorage.getItem('activeEpisode'+title);
currentTime = localStorage.getItem('currentTime'+title);
function updateQR(t,e,T,m) {
  const base = document.location.href.split('?')[0];
  qrcode.makeCode(`${base}?title=${t}&episode=${e}&time=${T}&mode=${m}`);
}
async function fetchText(file) {
  const response = await fetch(file);
  const text = await response.text();
  return text;
}
        function playRadio() {
            const radio = document.getElementById("radio");
            const drama = document.getElementById("drama");
            const episode = document.getElementById("episode");
            const dramaValue = drama.value;
            const episodeValue = episode.value;
            document.title = `${dramaValue} - ${episodeValue}`;
            // localStorage.setItem('lastStream'+title,document.title.replace(/ /g,'_'));
            radio.firstElementChild.setAttribute('src', radiodrama.url);
            radio.load();
            radio.play();
            //updateQR(title, drama[drama.selectedIndex].innerText.replace(/ /g,'_'), document.body.classList.value);
        }

        function stopRadio() {
            const radio = document.getElementById("radio");
            radio.pause();
        }

        function toggleDarkMode() {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem('lastMode',document.body.classList.value);
            updateQR(title, drama[drama.selectedIndex].innerText.replace(/ /g,'_'), document.body.classList.value);
        }
document.addEventListener("DOMContentLoaded", function(event) {
  myInit();
});
async function myInit() {
  const gdata = await fetchText('groups.txt');
  gdata.replace(/\n+$/, "").split("\n").forEach(line => {
    const [category, rdrama] = line.split(' ');
    if (category in Group) { Group[category].push(rdrama) } else { Group[category] = [ rdrama ] }
  });
  const ddata = await fetchText('radiodrama.txt');
  ddata.replace(/\n+$/, "").split("\n").forEach(line => { Drama.push(line) });
  const filterDrama = Drama.filter(d => d.startsWith(title+' '))
   if (filterDrama.length == 0) window.location = `index.html?title=${radiodrama.title}`;
   radiodrama.currentDrama = filterDrama[0];
   radiodrama.currentEpisode = activeEpisode;
   radiodrama.currentTime = currentTime;
mode =  params.get('mode');
mode = mode ? mode : '';
if ((mode === '') && (localStorage.getItem('lastMode'))) mode = localStorage.getItem('lastMode');

const optionElement = a => `<option value="${a}" ${(a === title) ? 'selected' : ''}>${a}</option>`;
const episodeOptionElement = a => `<option value="${a}" ${(a === parseInt(activeEpisode)) ? 'selected' : ''}>${a}</option>
`;
const groupOptionElement = a => `<option value="${a}" ${(Group[a].includes(title)) ? 'selected' : ''}>${a}</option>`;
  drama = document.getElementById('drama');
  group = document.getElementById('group');
  episode = document.getElementById('episode');
  for (let i=1; i <= radiodrama.episodes; i++) episode.innerHTML += episodeOptionElement(i);
  drama.innerHTML = Group[Object.keys(Group).filter(g => Group[g].includes(title))[0]].map( a => optionElement(a)).join('\n');
  group.innerHTML = Object.keys(Group).map(a => groupOptionElement(a)).join('\n');
  group.onchange = function() {
    drama.innerHTML = Group[group.value].map(a => optionElement(a)).join('\n');
    drama.onchange();
  }
  drama.onchange = function() {
    const n = Drama.filter(d => d.startsWith(drama.value+' '))[0].split(' ')[2];
    const nn = parseInt(n);
    episode.innerHTML = '';
    for (let i = 1; i <= nn; i++) episode.innerHTML += episodeOptionElement(i); 
  }
  if (mode) toggleDarkMode();
}
