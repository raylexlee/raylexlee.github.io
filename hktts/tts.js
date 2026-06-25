const synth = window.speechSynthesis;
const btnSpeak = document.getElementById('btnSpeak');
const btnStop = document.getElementById('btnStop');
const voiceSelect = document.getElementById('myVoice');
const myContent = document.getElementById('myContent');
const rate = document.querySelector('#rate');
let voices = [];
let utterThis;

function populateVoiceList() {
  voices = synth.getVoices().filter(v => !v.localService && v.lang.startsWith('en') && 'AU_US_GB_CA_IE_NZ_HK'.includes(v.lang.slice(3,5)));
  var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
 btnStop.innerText = '暫停';
 btnStop.onclick = pauseResume;
 utterThis = new SpeechSynthesisUtterance('Create utter this');
 utterThis.onpause = function (event) {
   console.log(event.charIndex);
   console.log('SpeechSynthesisUtterance.onpause');
 }
 utterThis.onend = function (event) {
   console.log('SpeechSynthesisUtterance.onend');
 }
 utterThis.onerror = function (event) {
   console.error('SpeechSynthesisUtterance.onerror');
 }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (myContent.value !== '') {
    // utterThis.text = myContent.value;
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
       utterThis.text = randomDate() + ' listen ' + voices[i].name;
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = 1;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}
async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    speak()
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

voiceSelect.onchange = function(){
  const name = voiceSelect.value.split(' ')[1];
  copyTextToClipboard(name)
}

function pauseResume() {
  if (synth.speaking !== true) {
    return;
  }
  if (synth.paused) {
    utterThis.rate = rate.value;
    synth.resume();
    return;
  }
  synth.pause();
  if (synth.paused !== true) synth.cancel();
}
function moveToPrevOption() {
  synth.cancel();
  const selectElement = voiceSelect;
  
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
  synth.cancel();
  const selectElement = voiceSelect;
  
  // Calculate the next index, looping back to 0 if at the end
  const nextIndex = (selectElement.selectedIndex + 1) % selectElement.options.length;
  
  // Update the select element
  selectElement.selectedIndex = nextIndex;
  
  // Optional: Trigger a 'change' event if other scripts rely on it
  selectElement.dispatchEvent(new Event('change'));
}
function randomDate() {
// 1. Define your date range (e.g., between year 2000 and 2025)
const start = new Date(1000, 0, 1).getTime();
const end = new Date(3025, 11, 31).getTime();

// 2. Generate a random timestamp between start and end
const randomTimestamp = Math.floor(Math.random() * (end - start + 1)) + start;

// 3. Create a Date object from the timestamp
const randomDate = new Date(randomTimestamp);

// 4. Format the date to "Long" format
const longFormatDate = randomDate.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long' // Optional: Includes "Monday", "Tuesday", etc.
});

return longFormatDate; 
// Example Output: "Thursday, March 15, 2018"

}
