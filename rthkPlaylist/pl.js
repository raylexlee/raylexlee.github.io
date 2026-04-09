async function getEpisodes(progName) {
  const res = await fetch(`${progName}.m3u8`);
  const m3u8 = await res.text();
  return await m3u8.split('\n#EXTINF:0, ').slice(1,).map(e => {
    const [t, m3u8Link] = e.split('\n');
    const [episodeTitle, dt] = t.slice(3 + progName.length,).split(' [');
    return {date : dt.substring(0,8), episodeTitle, m3u8Link}
  })
}
const eps = getEpisodes("古今風雲人物");

