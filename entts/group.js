const querystring = location.search;
const params = (querystring != '') ? (new URL(document.location)).searchParams : 'none';
if (params === 'none') window.location = '/';
document.title =  params.get('author');
document.addEventListener("DOMContentLoaded", function(event) {
  myInit();
});
function myInit() {
  const li_a = a => `<li><a href='enttsbook.html?title=${a}'>${a.replace(/_/g," ")}</a></li>`;
  document.querySelector('ul').innerHTML = book[document.title].map(e => li_a(e)).join('\n');
  const b = document.getElementsByTagName('a');
  for (i=0; i < b.length; i++) {
     b[i].href = `${b[i].href}&caller=${document.title}`;
  }
}
