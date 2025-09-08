function raylex() {
b=document.getElementsByTagName('a'); 
for (i=0; i<b.length; i++) {
t=b[i].innerText; h=b[i].href;
if (!/^\d\d\d/.test(t)) continue;
k=`mv ${t.substr(0,3)}.mp3 '${t}.mp3'`
console.log(k)
}}
