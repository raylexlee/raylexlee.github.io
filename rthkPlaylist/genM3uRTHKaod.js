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

