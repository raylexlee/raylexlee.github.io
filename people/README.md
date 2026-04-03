## How to scrap the data from RTHK
The following steps refter to a Windows 11 with wsl. 
1. Using the latest version of chromium based browswer (Microsoft Edge, Google Chrome or Firefox', go to https://www.rthk.hk/archive
2. Fill in the name of the programme in the searching box.
```
古今風雲人物
```
3. Open the dev-tools by pressing ctrl-shift-i . Clear the dev-tool content by the right-click menu. Paste the following javascript snippet.
```
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
raylex()
```
4. After execution of the javascript function, save the log by right-click menu. Save the log with persons, for latter operation.
5. Convert persons.log into persons.txt via wsl running
```
grep ^VM /mnt/c/Users/rayle/Downloads/persons.log | awk '{print $2,$3,$4;}' | sort > persons.txt
```
6. Generate People.txt and data files in two subfolders, text and person, from persons.txt by runnig 
```
./genPeopletxt.sh.txt > People.txt
./createPersonText.sh.txt
```
