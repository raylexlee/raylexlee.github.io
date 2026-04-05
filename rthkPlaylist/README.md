## Workflow to create People.m3u8 of RTHK using Dev-tools only.
Heavily guided by Copilot.
1. Using the latest version of chromium based browswer (Microsoft Edge, Google Chrome or Firefox', go to https://www.rthk.hk/archive
2. Fill in the name of the programme in the searching box.
```
古今風雲人物
```
3. Open the dev-tools by pressing ctrl-shift-i . Clear console by the right-click menu. Paste the following javascript snippet.
```
// Programme slug (change "People" to e.g. "free_as_the_wind_sunday")
const programmeSlug = "People";
const prefixLink = `https://www.rthk.hk/radio/radio1/programme/${programmeSlug}/episode/`;
const episodeLink = id => prefixLink + id;
const m3u8URL = yyyymmdd =>
  `https://rthkaod2022.akamaized.net/m4a/radio/archive/radio1/${programmeSlug}/m4a/${yyyymmdd}.m4a/index_0_a.m3u8`;

const prefixPath = `/radio/radio1/programme/${programmeSlug}/episode/`;

function scrapeEpisodes() {
  const anchors = document.querySelectorAll(`a[href*="${prefixPath}"]`);
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

async function getEpisodeMeta(id) {
  const res = await fetch(episodeLink(id));
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  const parts = doc.title.split("|");
  return {
    artist: parts[0] || "RTHK Radio",
    album: parts[1] || "RTHK Programme",
    episodeTitle: parts[2] || `Episode ${id}`
  };
}

async function buildEntry(ep) {
  const meta = await getEpisodeMeta(ep.id);
  const link = m3u8URL(ep.date);
  return `#EXTINF:0, ${meta.episodeTitle} [${ep.date}]\n${link}\n`;
}

async function generatePlaylist() {
  const episodes = scrapeEpisodes();
  let m3u = "#EXTM3U\n";
  for (const ep of episodes) {
    m3u += await buildEntry(ep);
  }

  // Explicit UTF-8 encoding and .m3u8 filename
  const blob = new Blob([new TextEncoder().encode(m3u)], {type: "audio/x-mpegurl;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${programmeSlug}.m3u8`;   // use .m3u8 extension
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
