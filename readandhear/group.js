document.addEventListener("DOMContentLoaded", function(event) {
  myInit();
});
function myInit() {
  const b = document.getElementsByTagName('a');
  for (i=0; i < b.length; i++) {
     b[i].href = `${b[i].href}?caller=${document.title}`;
  }
}
