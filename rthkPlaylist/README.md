## Workflow to create  香港故事創科夢工場2.m3u8 of RTHK using Dev-tools only.
Usage : Open DevTools after searching programme name on RTHK archive website, paste script, playlist auto‑downloads
1. Using the latest version of chromium based browswer (Microsoft Edge, Google Chrome or Firefox', go to https://www.rthk.hk/archive
2. Fill in the name of the programme in the searching box.
```
香港故事
```
3. Click on the item "香港故事: 創科夢工場 2" from the drop down list. Scroll down the list to get all episodes. Open the dev-tools by pressing ctrl-shift-i . Clear console by the right-click menu. Paste the following javascript snippet.
```
function scrapeEpisodes() {
  const archGrid = document.getElementById('archGrid');
  const anchors = archGrid.querySelectorAll('a')
  const episodes = [];
  anchors.forEach(a => {
    const h = a.getAttribute("href");
    const fullUrl = h.startsWith("http") ? h : "https://www.rthk.hk" + h;
    const x = a.getElementsByClassName("dateBlock picVer")[0].innerText;
    if (!x) return;
    const d = x.split('/'); // dd/mm/yyyy
    if (d.length !== 3) return;
    const yyyymmdd = d[2] + d[1] + d[0];
    episodes.push({date: yyyymmdd, url: fullUrl});
  });
  episodes.sort((a, b) => a.date.localeCompare(b.date));
  return episodes;
}

async function getEpisodeMeta(ep) {
  const res = await fetch(ep.url);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");

  // Episode title from <title>
  const parts = doc.title.split("|");
  const episodeTitle = parts[parts.length - 1].trim();

  // Collect all master.m3u8 links
  const fileMatches = [...html.matchAll(/https:\/\/[^"]+master\.m3u8/g)];
  let m3u8Link = null;

  if (fileMatches.length > 0) {
    // Pick the one with the shortest identifier (episode-specific)
    m3u8Link = fileMatches
      .map(m => m[0])
      .sort()[0];
  }
  if (ep.url.split('/').includes('radio') && ep.date < '20250401') {
      const fileMatchesp = [...html.matchAll(/https:\/\/[^"]+playlist\.m3u8/g)];

      if (fileMatchesp.length > 0) {
        // Pick the one with the shortest identifier (episode-specific)
        m3u8Link = fileMatchesp
          .map(m => m[0])
          .sort()[0];
      }
  }
  return {
    date: ep.date,
    episodeTitle,
    m3u8Link
  };
}

async function generatePlaylist() {
  const s1 = document.getElementById('s1');
  const progName = s1.value.replace(/[^\w\u4e00-\u9fff-]/g,'');
  const episodes = scrapeEpisodes();
const metas = [];
const seen = new Set();
for (const ep of episodes) {
  const meta = await getEpisodeMeta(ep);
  if (meta.m3u8Link && !seen.has(meta.m3u8Link)) {
    seen.add(meta.m3u8Link);
    metas.push(meta)
  }
}
if (metas[0].m3u8Link.split('/').includes('tv')) {
metas.sort((a, b) => a.m3u8Link.localeCompare(b.m3u8Link));
} else {
metas.sort((a, b) => a.date.localeCompare(b.date));
}
let m3u = "#EXTM3U\n";
for (const meta of metas) {
  m3u += `#EXTINF:0, ${progName} — ${meta.episodeTitle} [${meta.date}]\n${meta.m3u8Link}\n`;
}

  // Save as UTF-8 .m3u8
  const blob = new Blob([new TextEncoder().encode(m3u)], {type: "audio/x-mpegurl;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${progName}.m3u8`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  console.log(`${progName}.m3u8 generated and download triggered!`);
}

// Run it
generatePlaylist();


```
4. After execution of the javascript function, 香港故事創科夢工場2.m3u8 will be saved in the Download folder.
5. Load 香港故事創科夢工場2.m3u8 in VLC (video or audio streams) or foobar2000 (audio stream). 
6. Keep staying the RTHK archive page and search other programmes and scroll down to fetch all possible episodes. Move to the Devtools, hit UP ARROW to show generatePlaylist() and press RETURN to get your playlist. Repeat as many times as you wish. Performance never degrades. Enjoy! Have a nice day!
