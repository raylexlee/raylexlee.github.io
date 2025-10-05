let myPeriod, myEvent, myContent, myIntro`;
let events = [];
let periods = [];
let intro;
let content = {};
const lastEventInPeriodStored = g => `last5000yrsEventInPeriod${g}`
const lastEventStored = `last5000yrsEvent`
let lastEvent;
let lastPeriod;
const optionPeriod = g => `<option value="${g}" ${(g == lastPeriod) ? 'selected' : ''}>${g.replaceAll('_',' ')}</option>`;
const optionEvent = e => {
  const [P, E, T, B, I] = e.split(' ');
  return `<option value="${e}" ${(I == lastEvent) ? 'selected' : ''}>${E} ${T}</option>`};
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
  data = await fetchText(`events.txt`);
  events = data.split('\n');
  myPeriod = document.getElementById('myPeriod');
  myEvent = document.getElementById('myEvent');
  lastEvent = localStorage.getItem(lastEventStored);
  lastEvent = lastEvent ? lastEvent : '195';
  lastPeriod = events.filter(e => e.endsWith(lastEvent))[0].split(' ')[0];
  myPeriod.innerHTML = periods.map(g => optionPeriod(g)).join('\n');
  myEvent.innerHTML = events.filter(e => e.startsWith(lastPeriod+' ')).map(b => optionEvent(b)).join('\n');
  myPeriod.onchange = () => {
    lastEvent = localStorage.getItem(lastEventInPeriodStored(myPeriod.value));
    lastEvent = lastEvent ? lastEvent : events.filter(e => e.startsWith(myPeriod.value + ' '))[0].split(' ')[0];
    myEvent.innerHTML = event[myPeriod.value].map(b => optionEvent(b)).join('\n');
  }
}
const ReadAloud = () => { 
  lastEvent = myEvent.value;
  lastPeriod = myPeriod.value;
  localStorage.setItem(lastEventStored, lastEvent);
  localStorage.setItem(lastEventInPeriodStored(lastPeriod), lastEvent);
  window.location = `audiokoob.html?title=${myEvent.value}`; 
}
