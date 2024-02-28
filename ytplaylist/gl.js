function raylex() {
b=document.getElementsByTagName('a'); 
for (i=0; i<b.length; i++) {
t=b[i].innerText.replaceAll(' ','_'); h=b[i].href;
if (t.startsWith('\n')) continue;
if (/list=PL/.test(h) == false) continue;
if (/^[1-9隨全华現查已_]/.test(t)) continue;
s=h.indexOf('PL'); h=h.substr(s); e=h.indexOf('&');
c=t+' '+h.slice(0,e);
console.log(c); } }
