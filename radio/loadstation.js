let station, group;
let title, stream, mode, stations, groups;
let lastTitle, lastStream, lastMode;
async function fetchText(file) {
  const response = await fetch(file);
  const text = await response.text();
  return text;
}
        function playRadio() {
            const radio = document.getElementById("radio");
            const station = document.getElementById("station");
            const stationValue = station.value;
            document.title = station[station.selectedIndex].innerText;
            localStorage.setItem('lastStream'+title,document.title.replace(/ /g,'_'));
            radio.src = stationValue;
            radio.play();
        }

        function stopRadio() {
            const radio = document.getElementById("radio");
            radio.pause();
            radio.currentTime = 0;
        }

        function toggleDarkMode() {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem('lastMode',document.body.classList.value);
        }
document.addEventListener("DOMContentLoaded", function(event) {
  myInit();
});
async function myInit() {
  const gdata = await fetchText('groups.txt');
  groups = gdata.replace(/\n+$/, "").split("\n").map(line => line.split(" ")[0]);
const querystring = location.search;
const params = (querystring != '') ? (new URL(document.location)).searchParams : 'none';
if (params === 'none') {
  lastTitle = '广东';
  if (localStorage.getItem('lastTitle')) lastTitle = localStorage.getItem('lastTitle');
  window.location =`index.html?title=${lastTitle}`;
}
title =  params.get('title');
title = title ? title : '广东';
if (groups.includes(title)) { 
  localStorage.setItem('lastTitle',title)
} else {
  title = localStorage.getItem('lastTitle') ? localStorage.getItem('lastTitle') : '广东';  
}
stream =  params.get('stream');
stream = stream ? stream : 'none';
if ((stream === 'none') && (localStorage.getItem('lastStream'+title))) stream = localStorage.getItem('lastStream'+title);
mode =  params.get('mode');
mode = mode ? mode : '';
if ((mode === '') && (localStorage.getItem('lastMode'))) mode = localStorage.getItem('lastMode');
if (mode) toggleDarkMode();
const qingtingUrl = id => `https://lhttp.qingting.fm/live/${id}/64k.mp3`;
const streamUrl = id => (id[0] === 'h') ? id : qingtingUrl(id);
const optionElement = a => `<option value="${streamUrl(a[1])}" ${(a[0] === stream) ? 'selected' : ''}>${a[0].replace(/_/g,' ')}</option>`;
const groupOptionElement = a => `<option value="${a}" ${(a === title) ? 'selected' : ''}>${a}</option>`;
  station = document.getElementById('station');
  group = document.getElementById('group');
  const data = await fetchText(`text/${title}.txt`);
  stations = data.replace(/\n+$/, "").split("\n");
  station.innerHTML = stations.map(line => {
    a = line.split(' ');
    return optionElement(a);
  }).join('\n');
  group.innerHTML = groups.map(a => groupOptionElement(a)).join('\n');
  group.onchange = function() {
    window.location = `index.html?title=${group.value}`; 
  }
}
