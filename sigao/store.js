let myGroup, myBook;
const book = {};
const lastBookInGroupStored = g => `lastSigaoBookInGroup${g}`
const lastBookStored = `lastSigaoBook`
let lastBook;
let lastGroup;
const optionGroup = g => `<option value="${g}" ${(g == lastGroup) ? 'selected' : ''}>${g}</option>`;
const optionBook = b => `<option value="${b}" ${(b == lastBook) ? 'selected' : ''}>${b}</option>`;
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
document.addEventListener("DOMContentLoaded", function(event) { myInit(); });
async function myInit() { 
const  myFootlineSetting = document.getElementById('myFootlineSetting');
const  myFootline = document.getElementById('myFootline');
const deviceType = getDeviceType();

  if (deviceType !== "Other") {
    myFootline.style.minHeight = '70px';
    myFootlineSetting.style.minHeight = '70px';    
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
  lastBook = lastBook ? lastBook : '瑪竇福音-Matthew';
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
  window.location = `zhttsaloud.html?title=${myBook.value}`; 
}
