let type;
const querystring = location.search;
const params = (querystring != '') ? (new URL(document.location)).searchParams : 'none';
if (params === 'none') window.location = 'index.html?type=qmttskoob.html';
type =  params.get('type');
type = type ? type : 'qmttskoob.html';
document.body.onload = () => { 
  insertRadioAtTopOfBody();
  fetch(`triples.txt`)
    .then(response => response.text())
    .then(data => {
      const AuthorBooks = data.replace(/\n+$/, "").split('\n');
      const book = [];
      AuthorBooks.forEach(AuthorBook => {
        const [Lang, Author, Book] = AuthorBook.split(" ");
        book.push([Lang, Book]);
      });
      console.log(book.map(e => Language[e[0]][0]).join(", "));
      const li_b = a => `<li>${a[0]} ${Language[a[0]].join(" ")} 
<a href='qmttskoob.html?title=${a[1]}&lang=${a[0]}'>qmttskoob.html?title=${a[1]}&lang=${a[0]}</a></li>`;
      document.querySelector('ul').innerHTML = book
        .map(e =>   li_b(e)).join('\n');
    });
 };
