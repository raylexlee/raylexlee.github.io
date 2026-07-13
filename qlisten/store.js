let mySpeak;
let audio, myRange, myAutoplay;
let myPeriod, myEvent, myContent, myIntro;
const pid = {};
let intro = '';
let qEvent = [];
let Content = {};
let currentTime;
const lastEventInPeriodStored = g => `qlistenEventInPeriod${g}`
const lastPeriodStored = `qlistenPeriod`
const currentTimeStored = g => `qlistenCurrentTime${g}`;
let lastEvent; // yyyymmdd
let lastPeriod; // People
// r = 1,2,3,4,5 (radio) b = hktoday, 12oclocknews, ..., newspaper
const soundUrl = (r,b,i) => `https://rthkaod2022.akamaized.net/m4a/radio/archive/radio${r}/${b}/m4a/${i}.m4a/master.m3u8`;
// i = yyyymmdd
const optionPeriod = g => `<option value="${g}" ${(g == lastPeriod) ? 'selected' : ''}>${pid[g].name}</option>`;
const optionEvent = e => `<option value="${e}" ${(e == lastEvent) ? 'selected' : ''}>${e}</option>`;
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
  audio.onplay = function (e) { 
    if (currentTime > audio.currentTime) {
      audio.currentTime = currentTime;
    }
  };
  audio.onpause = function (e) {
    const eid = myEvent.value;
    const p = myPeriod.value;
    localStorage.setItem(lastEventInPeriodStored(p), eid);
    localStorage.setItem(lastPeriodStored, p); 
    localStorage.setItem(currentTimeStored(p) , audio.currentTime);
    updateQR(p, eid, audio.currentTime);
    mySpeak.innerHTML = '<a href="javascript:speak()" style="color:red;">&#9654;</a>';
  };
  audio.onplay = function () {
    mySpeak.innerHTML = '<img src="playing.svg" />';
  }
  audio.onseeked = () => { currentTime = audio.currentTime; }
  audio.onended = function (e) {
    if (myAutoplay.checked) {
      moveToNextOption();
    } else {
      currentTime = 0.0;
      audio.play();
    }
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
  let data = await fetchText(`programme.txt`);
  const periods = data.split('\n');
  periods.forEach(p => {
      const [name, radio, id, weekday] = p.split(' ');
      pid[id] = {
          radio : radio,
          name : name,
          weekday : parseInt(weekday)
      }
  });
  myPeriod = document.getElementById('myPeriod');
  myEvent = document.getElementById('myEvent');
  myIntro = document.getElementById('myIntro');
  myContent = document.getElementById('myContent');
  getLastPeriod(); 
  myPeriod.innerHTML = Object.keys(pid).map(g => optionPeriod(g)).join('\n');
  myEvent.innerHTML = qEvent.map(b => optionEvent(b)).join('\n');
  myPeriod.onchange = () => {
    lastPeriod = myPeriod.value;
    getLastEvent;
    gotoChapter();
  }
  myEvent.onchange = () => {
    gotoChapter();
  }
  gotoChapter();
}
function updateQR(p, e,t) {
  const base = decodeURI(document.location.href.split('?')[0]);
  qrcode.makeCode(`${base}?pid=${p}&episode=${e}&time=${t}`);
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
   const id = myPeriod.value;
   const ymd = myEvent.value;
   const R = pid[id].radio;
   audio.firstElementChild.setAttribute('src', soundUrl(R, id, ymd));
   audio.load();
   document.title = `${pid[id].name}-${ymd}`;
   if (myAutoplay.checked) {
     audio.play();
     audio.currentTime = currentTime;
   }
}
function getLastPeriod() {
const querystring = location.search;
const params = (querystring != '') ? (new URL(document.location)).searchParams : 'none';
if (params !== 'none') {
  const d = params.get('pid');
  const e = params.get('episode');
  const t = params.get('time');
  if (d && e && t) {
    localStorage.setItem(lastPeriodStored, d);
    localStorage.setItem(lastEventInPeriodStored(d), e);
    localStorage.setItem(currentTimeStored(d), t);
  }
}
  if (!localStorage.getItem(lastPeriodStored)) {
    localStorage.setItem(lastPeriodStored, 'People');
    localStorage.setItem(currentTimeStored('People'), 0.0);
  }
  lastPeriod = localStorage.getItem(lastPeriodStored);
  getLastEvent();
  return 
}
function getLastEvent() {
  const pgm = pid[lastPeriod];
  qEvent = getLast14Dates(pgm.weekday);
  if (!localStorage.getItem(lastEventInPeriodStored(lastPeriod))) {
    localStorage.setItem(lastEventInPeriodStored(lastPeriod), qEvent[0]);
    localStorage.setItem(currentTimeStored(lastPeriod), 0.0);
  }
  lastEvent = localStorage.getItem(lastEventInPeriodStored(lastPeriod));
  lastEvent = (lastEvent < qEvent[0]) ? qEvent[0] : lastEvent;
  currentTime = localStorage.getItem(currentTimeStored(lastPeriod));
}
function getLast14Dates(weekday = -1, exclude = false) {
    const dates = [];
    const d = new Date();
    
    // Map weekday = 7 to Mon-Fri array [1, 2, 3, 4, 5]
    let targetDays = weekday === 7 ? [1, 2, 3, 4, 5] : [weekday];
    if (weekday === 8) targetDays = [2, 3, 4, 5, 6];
    while (dates.length < 14) {
        const currentDay = d.getDay();
        
        // Match conditions handling standard weekdays, 7 (Mon-Fri), and exclusion
        const isMatch = targetDays.includes(-1) || 
                        (!exclude && targetDays.includes(currentDay)) || 
                        (exclude && !targetDays.includes(currentDay));

        if (isMatch) {
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            
            dates.push(`${yyyy}${mm}${dd}`);
        }
        
        d.setDate(d.getDate() - 1);
    }

    return dates.reverse();
}
function speak() { audio.play(); }
function pauseResume() { audio.pause(); }
