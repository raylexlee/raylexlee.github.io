## How to scrap the data from RTHK
The following steps refter to a Windows 11 with wsl. 
1. Using the latest version of chromium based browswer (Microsoft Edge, Google Chrome or Firefox', go to https://www.rthk.hk/archive
2. Fill in the name of the programme in the searching box.
```
長安的荔枝
```
3. Open the dev-tools by pressing ctrl-shift-i . Clear the dev-tool content by the right-click menu. Paste the following javascript snippet.
```
function raylex() {
b=document.getElementsByTagName('a'); 
s='https://www.rthk.hk/tv/dtt31/programme/thelitchiroad/episode/';
for (i=0; i<b.length; i++) {
t=b[i];
h=t.href;
x=t.innerText.split('\n');
if (!h.startsWith(s)) continue;
d=x[0].split('/');
c=d[2]+d[1]+d[0]+' '+h.substring(s.length)+' '+x[1];
console.log(c); } }
raylex()
```
4. After execution of the javascript function, save the log by right-click menu. Save the log with name as the, for latter operation.
5. Convert the.log into the.txt via wsl running
```
grep ^VM /mnt/c/Users/rayle/Downloads/the.log | awk '{print $2,$3,$4;}' | sort > the.txt
```
6. Generate The.txt and m3u file as playlist file of VLC, from the.txt by runnig 
```
./genThetxt.sh.txt > The.txt
./createM3uFromThetxt.sh.txt > 長安的荔枝.m3u
```
