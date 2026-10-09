// Adapted from qlisten/ostore.js
const DEFAULT = '香港';
let mySpeak;
let audio, myRange, myAutoplay;
let myPeriod, myEvent, myContent, myIntro;
let intro = '';
let qEvent = [];
let Content = {};
const lastEventInPeriodStored = g => `radioEventInPeriod${g}`
const lastPeriodStored = `radioPeriod`
let lastEvent; // 香港電台第1台
let lastPeriod; // DEFAULT 香港
const qingtingUrl = id => `https://lhttp.qingting.fm/live/${id}/64k.mp3`;
const streamUrl = id => (id[0] === 'h') ? id : qingtingUrl(id);
const optionPeriod = g => `<option value="${g}" ${(g.split(' ')[0] == lastPeriod) ? 'selected' : ''}>${g.split(' ')[0]}</option>`;
const optionEvent = e => `<option value="${e}" ${(e.split(' ')[0] == lastEvent) ? 'selected' : ""}>${e.split(' ')[0]}</option>`;
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
  audio = document.getElementById('audio');
  mySpeak = document.getElementById('mySpeak');
  myAutoplay = document.getElementById('myAutoplay');
  audio.onpause = function (e) {
    const [ename, eid] = myEvent.value.split(' ');
    const [pname, pid] = myPeriod.value.split(' ');
    localStorage.setItem(lastEventInPeriodStored(pname), ename);
    localStorage.setItem(lastPeriodStored, pname); 
    updateQR(pname, ename);
    mySpeak.innerHTML = '<a href="javascript:speak()" style="color:red;">&#9654;</a>';
  };
  audio.onplay = function () {
    mySpeak.innerHTML = '<img src="playing.svg" />';
  }
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
  let data = await fetchText(`groups.txt`);
  const periods = data.replace(/\n+$/, "").split('\n');
  myPeriod = document.getElementById('myPeriod');
  myEvent = document.getElementById('myEvent');
  myIntro = document.getElementById('myIntro');
  myContent = document.getElementById('myContent');
  await getLastPeriod(); 
  myPeriod.innerHTML = periods.map(g => optionPeriod(g)).join('\n');
  myPeriod.onchange = async () => {
    lastPeriod = myPeriod.value.split(' ')[0];
    await getLastEvent();
    gotoChapter();
  }
  myEvent.onchange = () => {
    gotoChapter();
  }
  gotoChapter();
}
function updateQR(p, e) {
  const base = decodeURI(document.location.href.split('?')[0]);
  qrcode.makeCode(`${base}?pid=${p}&episode=${e}`);
}
function moveToPrevOption() {
  const selectElement = myEvent;
  
  // Calculate the next index, looping back to 0 if at the end
  const nextIndex = selectElement.selectedIndex
                   ? (selectElement.selectedIndex - 1)
                   : (selectElement.options.length - 1);
  
  // Update the select element
  selectElement.selectedIndex = nextIndex;
  
  // Optional: Trigger a 'change' event if other scripts rely on it
  selectElement.dispatchEvent(new Event('change'));
}
function moveToNextOption() {
  const selectElement = myEvent;
  
  // Calculate the next index, looping back to 0 if at the end
  const nextIndex = (selectElement.selectedIndex + 1) % selectElement.options.length;
  
  // Update the select element
  selectElement.selectedIndex = nextIndex;
  
  // Optional: Trigger a 'change' event if other scripts rely on it
  selectElement.dispatchEvent(new Event('change'));
}

function gotoChapter() {
   const [ pname, pid ] = myPeriod.value.split(' ');
   const [ ename, eid ] = myEvent.value.split(' ');
   audio.setAttribute('src', streamUrl(eid));
   audio.load();
   document.title = ename.replace('_',' ');
   if (myAutoplay.checked) {
     audio.play();
   }
}
async function getLastPeriod() {
const querystring = location.search;
const params = (querystring != '') ? (new URL(document.location)).searchParams : 'none';
if (params !== 'none') {
  const d = params.get('pid');
  const e = params.get('episode');
  if (d && e) {
    localStorage.setItem(lastPeriodStored, d);
    localStorage.setItem(lastEventInPeriodStored(d), e);
  }
}
  if (!localStorage.getItem(lastPeriodStored)) {
    localStorage.setItem(lastPeriodStored, DEFAULT);
  }
  lastPeriod = localStorage.getItem(lastPeriodStored);
  await getLastEvent();
  return 
}
async function getLastEvent() {
  qEvent = await getLast14Dates();
  if (!localStorage.getItem(lastEventInPeriodStored(lastPeriod))) {
    localStorage.setItem(lastEventInPeriodStored(lastPeriod), qEvent[0]);
  }
  lastEvent = localStorage.getItem(lastEventInPeriodStored(lastPeriod));
  if (!qEvent.includes(lastEvent)) {
     lastEvent = qEvent[0];
  }  
  myEvent.innerHTML = qEvent.map(b => optionEvent(b)).join('\n');
}
async function getLast14Dates() {
  let data = await fetchText(`text/${lastPeriod}.txt`);
  const events = data.replace(/\n+$/, "").split('\n');
  return events
}
function speak() { audio.play(); }
function pauseResume() { audio.pause(); }
