function raylex() {
b=document.getElementsByTagName('a') 
for (i=0; i<b.length; i++) {
t=b[i].innerText; h=b[i].href;
if (!t.match(/《/)) continue;
s=h.indexOf('PL'); e=h.indexOf('&pp');
c=t.replaceAll(' ','_')+' '+h.slice(s,e)
console.log(c); } }
