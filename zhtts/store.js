let myGroup, myBook;
const book = {};
const lastBookInGroupStored = g => `lastZhttsBookInGroup${g}`
const lastBookStored = `lastZhttsBook`
let lastBook;
let lastGroup;
const optionGroup = g => `<option value="${g}" ${(g == lastGroup) ? 'selected' : ''}>${g}</option>`;
const optionBook = b => `<option value="${b}" ${(b == lastBook) ? 'selected' : ''}>${b}</option>`;
async function fetchText(file) {
  const response = await fetch(file);
  const text = await response.text();
  return text;
}
document.addEventListener("DOMContentLoaded", function(event) { myInit(); });
async function myInit() { 
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
  lastBook = lastBook ? lastBook : '紅樓夢';
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
