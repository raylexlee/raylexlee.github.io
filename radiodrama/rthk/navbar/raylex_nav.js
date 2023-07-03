function toggle(elem) {
  elem.style.display = (elem.style.display === 'none') ? 'block' : 'none';
}

function ProcessMenu() {
  document.querySelectorAll('nav ul li > a:not(:only-child)')
    .forEach(el => el.onclick = function (e) {
      const nd = this.nextElementSibling;
      document.querySelectorAll('.nav-dropdown')
        .forEach(function(elem) { 
          if (elem === nd) {
            toggle(nd);
          } else {
            elem.style.display = 'none';
          }});
      e.stopPropagation();
    });
  document.documentElement.onclick = function () {
    document.querySelectorAll('.nav-dropdown').forEach(el => el.style.display = 'none');
  };
}
if (document.readyState !== 'loading') {
  ProcessMenu();
} else {
  document.addEventListener('DOMContentLoaded', ProcessMenu);
}
document.getElementById('nav-toggle').onclick = function () {
  this.classList.toggle('active');
  };
document.getElementById('nav-toggle').addEventListener('click', function () {
  document.querySelectorAll('nav ul').forEach(el => toggle(el));
  });
