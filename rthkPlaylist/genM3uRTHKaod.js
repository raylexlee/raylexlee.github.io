function scrapeEpisodes(progName) {
  const anchors = document.querySelectorAll(`a[title="${progName}"]`);
  const episodes = [];
  anchors.forEach(a => {
    const h = a.getAttribute("href");
    const fullUrl = h.startsWith("http") ? h : "https://www.rthk.hk" + h;
    const x = a.innerText.substring(0, 10);
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

  return {
    date: ep.date,
    episodeTitle,
    m3u8Link
  };
}

async function generatePlaylist(progName = "古今風雲人物") {
  const episodes = scrapeEpisodes(progName);
  let m3u = "#EXTM3U\n";

const seen = new Set();
for (const ep of episodes) {
  const meta = await getEpisodeMeta(ep);
  if (meta.m3u8Link && !seen.has(meta.date)) {
    seen.add(meta.date);
    m3u += `#EXTINF:0, ${progName} — ${meta.episodeTitle} [${meta.date}]\n${meta.m3u8Link}\n`;
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
// generatePlaylist("長安的荔枝");

