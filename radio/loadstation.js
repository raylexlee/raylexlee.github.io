let station, group;
let title, stations;
let activeEpisode;
const querystring = location.search;
const params = (querystring != '') ? (new URL(document.location)).searchParams : 'none';
if (params === 'none') window.location ='index.html?title=广东';
title =  params.get('title');
title = title ? title : '广东`';
document.addEventListener("DOMContentLoaded", function(event) {
  myInit();
});
async function fetchText(file) {
  const response = await fetch(file);
  const text = await response.text();
  return text;
}
const streamUrl = id => `https://lhttp.qingting.fm/live/${id}/64k.mp3`;
const optionElement = a => `<option value="${streamUrl(a[1])}">${a[0]}</option>`;
const groupOptionElement = a => `<option value="${a}" ${(a === title) ? 'selected' : ''}>${a}</option>`;
async function myInit() {
  station = document.getElementById('station');
  group = document.getElementById('group');
  const data = await fetchText(`text/${title}.txt`);
  stations = data.replace(/\n+$/, "").split("\n");
  station.innerHTML = stations.map(line => {
    a = line.split(' ');
    return optionElement(a);
  }).join('\n');
  const gdata = await fetchText('groups.txt');
  const groups = gdata.replace(/\n+$/, "").split("\n");
  group.innerHTML = groups.map(line => {
    const a = line.split(' ');
    return groupOptionElement(a[0]);
  }).join('\n');
  group.onchange = function() {
    window.location = `index.html?title=${group.value}`; 
  }
}
