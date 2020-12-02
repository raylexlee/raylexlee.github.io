function toggle(elem) {
  elem.style.display = (elem.style.display === 'none') ? 'block' : 'none';
}
document.querySelectorAll('nav ul li > a:not(:only-child)')
  .forEach(el =>  el.addEventListener('click', function(e) {
    const el = this;
    toggle(el.nextElementSubling);
    document.querySelectorAll('.nav-dropdown').filter((child) => child !== el.nextElementSubling)
      .forEach(element => {
        element.style.display = 'none';
      });
    e.stopPropagation();
  }));
document.documentElement.addEventListener('click', function() {
    document.querySelectorAll('.nav-dropdown').forEach(el => el.style.display = 'none');
  });
document.querySelector('#nav-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
  });
document.querySelector('#nav-toggle').addEventListener('click', function() {
    document.querySelectorAll('nav ul').forEach(el => toggle(el));
  });