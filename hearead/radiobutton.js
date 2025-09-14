const vtArray = [ 
['qmttsaloud.html', 'tts','HotPink'], 
['ibook.html','txt', 'cyan']
];
const description = {
'qmttsaloud.html' : `For the best audio effect, please use the latest version of Microsoft Edge and activate by using Read Aloud, especially Android devices. Google Chrome should work in all platform. Safari of ios and MS Edge on Android are the only choices for supporting mobile screen off feature.  Please refer to the Web Speech API at <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API">SpeechSynthesis</a>。`,
'ibook.html' : 'Please use the Read Aloud feature of the latest Microsoft Edge.'
}
function insertRadioAtTopOfBody() {
  document.body.innerHTML = radioForm(vtArray) + document.body.innerHTML;
  selectRadioButton(type);
  document.querySelector('ul').style.backgroundColor = vtArray.filter( e => e.includes(type))[0][2];
  document.querySelector('p').innerHTML = description[type];
}
function radioChange(radio) {
    const selectedValue = radio.value;
    const selectedText = radio.parentElement.textContent.trim();
    const selectedBgcolor = window.getComputedStyle(radio.parentElement).backgroundColor;
    
//    console.log('Selected radio button value:', selectedValue);
//    console.log('Selected radio button text:', selectedText);
//    console.log(selectedBgcolor);
    const links = document.querySelectorAll('a');
    for (i=0; i < links.length; i++) {
       links[i].href = links[i].href.replace(`${type}?title`,`${selectedValue}?title`);
       links[i].innerText = links[i].innerText.replace(`${type}?title`,`${selectedValue}?title`);
    } 
    document.querySelector('ul').style.backgroundColor = selectedBgcolor;
    document.querySelector('p').innerHTML = description[selectedValue];
    type = selectedValue;
    const base = window.location.href.split('?')[0];
    const url = base.endsWith('group.html') ? `${base}?author=${document.title}&type=${type}` : `${base}?type=${type}` ;
    qrcode.makeCode(url);
}

function selectRadioButton(value) {
    const radioButton = document.querySelector(`input[name="fileType"][value="${value}"]`);
    if (radioButton) {
        radioButton.checked = true;
    }
}
const radioOption = (v,t, c) => `
            <label style="background-color: ${c}">
                <input type="radio" name="fileType" value="${v}" onchange="radioChange(this)">${t}
            </label>
`;
const radioForm = vtArr => `
    <form>
        <div class="radio-group">
           ${vtArr.map(e => {
             const [v, t, c] = e;
             return radioOption(v,t, c);
           }).join('\n')}
        </div>
    </form>
`;
