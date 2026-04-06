## Workflow to create People.m3u8 of RTHK using Dev-tools only.
Usage : Open DevTools after searching programme name on RTHK archive website, paste script, playlist auto‑downloads
1. Using the latest version of chromium based browswer (Microsoft Edge, Google Chrome or Firefox', go to https://www.rthk.hk/archive
2. Fill in the name of the programme in the searching box.
```
古今風雲人物
```
3. Open the dev-tools by pressing ctrl-shift-i . Clear console by the right-click menu. Paste the following javascript snippet.
```
// Set the programme name (works for audio or TV)
let progName = "古今風雲人物"; // audio podcast
// let progName = "長安的荔枝"; // TV series

function scrapeEpisodes() {
  const anchors = document.querySelectorAll(`a[title="${progName}"]`);
  const episodes = [];
  anchors.forEach(a => {
    const h = a.getAttribute("href");
    const fullUrl = h.startsWith("http") ? h : "https://www.rthk.hk" + h;
    const x = a.innerText.split('\n');
    if (!x[0]) return;
    const d = x[0].split('/'); // dd/mm/yyyy
    if (d.length !== 3) return;
    const yyyymmdd = d[2] + d[1] + d[0];
    const id = fullUrl.substring(fullUrl.lastIndexOf("/") + 1);
    episodes.push({id, date: yyyymmdd, url: fullUrl});
  });
  episodes.sort((a, b) => a.date.localeCompare(b.date));
  return episodes;
}

async function getEpisodeMeta(ep) {
  const res = await fetch(ep.url);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");

  // Title parsing for episode name
  const parts = doc.title.split("|");
  const episodeTitle = parts[parts.length - 1].trim();

  // Find the master.m3u8 link (audio or video)
  const match = html.match(/https:\/\/[^"]+master\.m3u8/);
  const m3u8Link = match ? match[0] : null;

  return {
    date: ep.date,
    episodeTitle,
    m3u8Link
  };
}

async function generatePlaylist() {
  const episodes = scrapeEpisodes();
  let m3u = "#EXTM3U\n";

  for (const ep of episodes) {
    const meta = await getEpisodeMeta(ep);
    if (meta.m3u8Link) {
      m3u += `#EXTINF:0, ${progName} — ${meta.episodeTitle} [${meta.date}]\n`;
      m3u += `${meta.m3u8Link}\n`;
    }
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

  console.log("Playlist generated and download triggered!");
}

// Run it
generatePlaylist();

```
4. After execution of the javascript function, People.m3u8 will be saved in the Download folder.
5. Load People.m3u8 in VLC or foobar2000. 
