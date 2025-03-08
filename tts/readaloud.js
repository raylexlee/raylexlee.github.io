let adjustment = 0.5;
const googleLimit = 57;
let crPosition=[];
let nCharsRow, lineHeight; 
let rowsLine=[]; 
let numCharsLine=[];
let punctuationPosition=[];
let punctuationArray=[];
let positionIndex = 0;
const notAndroid = false;
let utterThis = new SpeechSynthesisUtterance('Create utter this');
 utterThis.onend = function (e) {
   if (justCancel) {
     justCancel = false;
     return;
   }
   positionIndex++;
   if (positionIndex === punctuationPosition.length) {
     positionIndex = 0;
   }
   speak();
 }
 utterThis.onerror = function (event) {
   console.error('SpeechSynthesisUtterance.onerror');
 }
// utterThis.onboundary = SyncAudioWithContent;
  myContent.style.lineHeight=2;
  myContent.onselect = e => {
    if (programSelect >= 1) {
       programSelect--;
       return;
    }
    for (let i = 0; i < punctuationPosition.length; i++) {
      if (punctuationPosition[i] >= myContent.selectionStart) {
         positionIndex = i;
         speak();
         console.log('onselect ',i);
         break;
      }
    }
  }
  myContent.onchange = gotoChapter;
//  myRange.oninput = function() {
//    const v = myRange.value;
//    myContent.style.fontSize = `${20 + parseInt(v)}px`;
//   CalculateScrollData(); // for rowsLine[], lineHeight, nCharsRow
// };
  document.body.onunload = function() {
    if (synth.speaking) {
      justCancel = true;
      synth.cancel();
    }
  };
function gotoChapter(PleaseSpeak = true) {
       if (myContent.value == '') return;
       currentVoice = nowVoice();
       myContent.value = myContent.value.split('\n').filter(e => e.length >= 1).join('\n');
       numCharsLine=myContent.value.split('\n').map(e => e.length);
       rowsLine = Array(numCharsLine.length);
       CalculateScrollData(); // for rowsLine[], lineHeight, nCharsRow
       new ResizeObserver(CalculateScrollData).observe(myContent);
       crPosition=[];
       for (let valueIndex=0; valueIndex < myContent.value.length; valueIndex++) 
         if (myContent.value[valueIndex] === '\n') {
           crPosition.push(valueIndex);
         }
       punctuationArray = myContent.value.match(punctuationRegex);
       punctuationPosition=[];
       let punctuationIndex = 0;
       let lastPunctuationPosition = 0;
       for (let valueIndex=0; valueIndex < myContent.value.length; valueIndex++) 
         if (myContent.value[valueIndex] === punctuationArray[punctuationIndex]) {
           if (valueIndex > (lastPunctuationPosition + googleLimit)) { 
               let a = lastPunctuationPosition;
               while ((a + googleLimit) < valueIndex) {
                 a += googleLimit;
                 punctuationPosition.push(a);
               }
           }
           punctuationPosition.push(valueIndex);
           lastPunctuationPosition = valueIndex;
           punctuationIndex++;
         }
         if (synth.speaking) { 
           justCancel = true;
           synth.cancel();
         }
         if (PleaseSpeak) speak();
}
function speak(){
    if (synth.speaking) {
    //    console.error('speechSynthesis.speaking');
        return;
    }
    if (myContent.value !== '') {
    const start = (positionIndex >= 1) ? (punctuationPosition[positionIndex - 1] + 1) : 0;
    const stop = punctuationPosition[positionIndex];
    utterThis.voice = currentVoice;
    utterThis.text = myContent.value.substring(start, stop);
    utterThis.pitch = 1;
    utterThis.rate = rate.value;
    justCancel = true;
    synth.cancel();
    synth.speak(utterThis);
    justCancel = false;
    ScrollText(start);
    programSelect = 1;
    myContent.select();
    programSelect = 2;
    myContent.setSelectionRange(start, stop);
  }
}

function ScrollText(charIndex)  {
//  const fontSize = parseFloat(window.getComputedStyle(myContent).fontSize)
//  const nCharsRow = Math.floor(myContent.clientWidth / fontSize)
//  const lineHeight = myContent.scrollHeight / numCharsLine.map(e => Math.ceil(e / nCharsRow)).reduce((a,b) => a + b);
  let lineIndex;
  for (lineIndex=0; lineIndex < crPosition.length; lineIndex++)
    if (charIndex <= crPosition[lineIndex]) break;
  let topRow = 0;
  if (lineIndex >=1)
    topRow = rowsLine[lineIndex - 1];
    // topRow = numCharsLine.slice(0, lineIndex).map(e => Math.ceil(e / nCharsRow)).reduce((a,b) => a + b);
  const lastRow = Math.ceil(((lineIndex === 0) ? charIndex : (charIndex - crPosition[lineIndex-1])) / nCharsRow);
  myContent.scrollTop = (lineHeight * (topRow + lastRow)) - (adjustment * myContent.clientHeight);
}
function CalculateScrollData() {
  const fontSize = parseFloat(window.getComputedStyle(myContent).fontSize)
  nCharsRow = Math.floor(myContent.clientWidth / fontSize)
  rowsLine[0] = Math.ceil(numCharsLine[0] / nCharsRow);
  let lineIndex = 1;
  while (lineIndex < numCharsLine.length) {
    rowsLine[lineIndex] = rowsLine[lineIndex - 1] + Math.ceil(numCharsLine[lineIndex] / nCharsRow);
    lineIndex++;
  }
  lineHeight = myContent.scrollHeight / rowsLine[rowsLine.length - 1];
}
