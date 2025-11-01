let myGroup, myBook;
const book = {};
const lastBookInGroupStored = g => `lastHKttsBookInGroup${g}`
const lastBookStored = `lastHKttsBook`
let lastBook;
let lastGroup;
const optionGroup = g => `<option value="${g}" ${(g == lastGroup) ? 'selected' : ''}>${g.replaceAll('_',' ')}</option>`;
const optionBook = b => `<option value="${b}" ${(b == lastBook) ? 'selected' : ''}>${b.replaceAll('_',' ')}</option>`;
function isIPhone() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return /\b(iPhone)\b/.test(ua);
}
const getDeviceType = () => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const maxTouchPoints = navigator.maxTouchPoints;
const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
if (isSafari && isIPhone()) {
    document.querySelector('html').style.fontSize = '9vmin';
    return "iOS";
}
  // Detect Android
  if (/android/i.test(userAgent)) {
    document.querySelector('html').style.fontSize = '8vmin';
    return "Android";
  }

  // Detect iPad (including iPads running iPadOS 13+ which might report as MacIntel)
  if (/iPad/.test(platform) || (platform === 'MacIntel' && maxTouchPoints > 1)) {
    document.querySelector('html').style.fontSize = '6vmin';
    return "iOS";
  }

  // Detect iOS (including iPads running iPadOS 13+ which might report as MacIntel)
  if (/iPhone|iPod/.test(platform)) {
    document.querySelector('html').style.fontSize = '9vmin';
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
  const data = await fetchText(`pairs.txt`);
  const AuthorBooks = data.replace(/\n+$/, "").split('\n');
  AuthorBooks.forEach(AuthorBook => {
    const [Author, Book] = AuthorBook.split(" ");
    if (Author in book) {
      book[Author].push(Book);
    } else {  
        book[Author] = [ Book ];
     }
  });
  myGroup = document.getElementById('myGroup');
  myBook = document.getElementById('myBook');
  lastBook = localStorage.getItem(lastBookStored);
  lastBook = lastBook ? lastBook : book[Object.keys(book)[0]][0];
  lastGroup = Object.keys(book).filter(g => book[g].includes(lastBook))[0];
  myGroup.innerHTML = Object.keys(book).map(g => optionGroup(g)).join('\n');
  myBook.innerHTML = book[lastGroup].map(b => optionBook(b)).join('\n');
  myGroup.onchange = () => {
    lastBook = localStorage.getItem(lastBookInGroupStored(myGroup.value));
    lastBook = lastBook ? lastBook : book[myGroup.value][0];
    myBook.innerHTML = book[myGroup.value].map(b => optionBook(b)).join('\n');
  }
}
const ReadAloud = () => { 
  lastBook = myBook.value;
  lastGroup = myGroup.value;
  localStorage.setItem(lastBookStored, lastBook);
  localStorage.setItem(lastBookInGroupStored(lastGroup), lastBook);
  window.location = `audiokoob.html?title=${myBook.value}`; 
}
const zhttsAloud = () => { 
  lastBook = myBook.value;
  lastGroup = myGroup.value;
  localStorage.setItem(lastBookStored, lastBook);
  localStorage.setItem(lastBookInGroupStored(lastGroup), lastBook);
  window.location = `zhttsaloud.html?title=${myBook.value}`; 
}
