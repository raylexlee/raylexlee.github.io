let type;
const querystring = location.search;
const params = (querystring != '') ? (new URL(document.location)).searchParams : 'none';
if (params === 'none') window.location = 'index.html?type=zhttskoob.html';
type =  params.get('type');
type = type ? type : 'zhttskoob.html';
document.body.onload = () => { 
  insertRadioAtTopOfBody();
  fetch(`pairs.txt`)
    .then(response => response.text())
    .then(data => {
      const AuthorBooks = data.replace(/\n+$/, "").split('\n');
      const book = {};
      AuthorBooks.forEach(AuthorBook => {
        const [Author, Book] = AuthorBook.split(" ");
        if (Author in book) {
          book[Author].push(Book);
        } else {  
            book[Author] = [ Book ];
          }
      });
      const li_a = a => `<li><a href='group.html?author=${a}&type=${type}'>${a.replace(/_/g," ")}</a></li>`;
      const li_b = a => `<li><a href='${type}?title=${a}'>${a.replace(/_/g," ")}</a></li>`;
      document.querySelector('ul').innerHTML = Object.keys(book)
        .map(e => (book[e].length === 1) ? li_b(book[e][0]) : li_a(e)).join('\n');
    });
 };
