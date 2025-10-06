let myPeriod, myEvent, myContent, myIntro;
let Events = {};
let periods = [];
let intro = '';
let Content = {};
const lastEventInPeriodStored = g => `last5000yrsEventInPeriod${g}`
const lastEventStored = `last5000yrsEvent`
let lastEvent;
let lastPeriod;
const optionPeriod = g => `<option value="${g}" ${(g == lastPeriod) ? 'selected' : ''}>${g.replaceAll('_',' ')}</option>`;
const optionEvent = e => `<option value="${e.join(' ')}" ${(e[3] == lastEvent) ? 'selected' : ''}>${e[0]} ${e[1]}</option>`;
const getDeviceType = () => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const maxTouchPoints = navigator.maxTouchPoints;

  // Detect Android
  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // Detect iOS (including iPads running iPadOS 13+ which might report as MacIntel)
  if (/iPad|iPhone|iPod/.test(platform) || (platform === 'MacIntel' && maxTouchPoints > 1)) {
    return "iOS";
  }

  // If neither Android nor iOS, return "Other"
  return "Other";
};
function isEdgeAndroid() {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('edg') && userAgent.includes('android');
}
async function fetchText(file) {
  const response = await fetch(file);
  const text = await response.text();
  return text;
}
async function fetchJSON(file) {
  const response = await fetch(file);
  const data = await response.json(); // Parses JSON into JS object
  return data;
}
document.addEventListener("DOMContentLoaded", function(event) { myInit(); });
async function myInit() { 
  const  myFootlineSetting = document.getElementById('myFootlineSetting');
  const  myFootline = document.getElementById('myFootline');
  const deviceType = getDeviceType();
  if (deviceType !== "Other") {
    const minHeight = (deviceType === 'iOS') ? '80px' : '70px';
    myFootline.style.minHeight = minHeight;
    myFootlineSetting.style.minHeight = minHeight;    
  } else {
    myFootline.style.display = 'none';
  }
  let data = await fetchText(`periods.txt`);
  periods = data.split('\n');
  periods.forEach(p => { Event[p] = [] });
  data = await fetchText(`events.txt`);
  const events = data.split('\n');
  events.forEach(e => { const a = e.split(' '); Event[a[0]].push(a.slice(1)) });
  myPeriod = document.getElementById('myPeriod');
  myEvent = document.getElementById('myEvent');
  myIntro = document.getElementById('myIntro');
  myContent = document.getElementById('myContent');
  lastEvent = localStorage.getItem(lastEventStored);
  lastEvent = lastEvent ? lastEvent : '195';
  lastPeriod = periods.filter(p => Event[p].map(e => e[3]).includes(lastEvent))[0];
  Content = await fetchJSON(`text/${lastPeriod}.json`);
  myPeriod.innerHTML = periods.map(g => optionPeriod(g)).join('\n');
  myEvent.innerHTML = Event[lastPeriod].map(b => optionEvent(b)).join('\n');
  myIntro.value = await fetchText(`text/${lastPeriod}.txt`);
  myContent.value = Content[myEvent.value.split(' ')[0]];
  myPeriod.onchange = async () => {
    myIntro.value = await fetchText(`text/${myPeriod.value}.txt`);
    Content = await fetchJSON(`text/${myPeriod.value}.json`);
    lastEvent = localStorage.getItem(lastEventInPeriodStored(myPeriod.value));
    lastEvent = lastEvent ? lastEvent : Event[myPeriod.value][0][3];
    myEvent.innerHTML = Event[myPeriod.value].map(b => optionEvent(b)).join('\n');
    const e = myEvent.value.split(' ');
    myContent.value = (e[0] in Content) ? Content[e[0]] : `#${e[3]} ${e[0]} ${e[1]}`;
  }
  myEvent.onchange = () => {
    const e = myEvent.value.split(' ');
    myContent.value = (e[0] in Content) ? Content[e[0]] : `#${e[3]} ${e[0]} ${e[1]}`;
  }
}
