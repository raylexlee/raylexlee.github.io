const vtArray = [ 
['zhttskoob.html', 'tts','HotPink'], 
['audiobook.html','audio','LawnGreen'], 
['book.html','txt', 'cyan']
];
const description = {
'zhttskoob.html' : `為獲得最佳語音效果，請使用最新版本的 Microsoft Edge。其他瀏覽器可能適用, 特別是 ios 和 android 設備。詳情請參考 Web Speech API 的 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#speechsynthesis_2">SpeechSynthesis</a>。`,
'audiobook.html' : "全本有得睇，有得聽廣東話照讀，四大名著，三言兩拍及其他經典文學",
'book.html' : '請使用最新版本 Microsoft Edge 的大聲朗讀'
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
       links[i].href = links[i].href.replace(`${type}?title`,`${selectedValue}?title`).replace(`type=${type}`,`type=${selectedValue}`);
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
