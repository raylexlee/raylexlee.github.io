function raylex() {
b=document.getElementsByTagName('a'); 
s='https://www.rthk.hk/radio/radio1/programme/People/episode/';
for (i=0; i<b.length; i++) {
t=b[i];
h=t.href;
x=t.innerText.split('\n');
if (!h.startsWith(s)) continue;
d=x[0].split('/');
c=d[2]+d[1]+d[0]+' '+h.substring(s.length)+' '+x[2];
console.log(c); } }
