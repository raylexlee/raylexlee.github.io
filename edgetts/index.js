async function fetchText(file) {
  const response = await fetch(file);
  const text = await response.text();
  return text;
}
document.body.onload = async () => { 
  const data = await fetchText('pair.txt');
  const TitleNames = data.replace(/\n+$/, "").split('\n');
  const name = {};
  TitleNames.forEach(TitleName => {
    const [Title, Name] = TitleName.split(" ");
    name[Title] = Name;
    });
  const url = a => `mp3vtt.html?title=${a}&name=${name[a]}`;
  const li_b = a => `<li><a href='${url(a)}'>${url(a)}</a></li>`;
  document.querySelector('ul').innerHTML = Object.keys(name)
        .map(e =>   li_b(e)).join('\n');
  document.getElementById('code').innerHTML = await fetchText('makeEdgeTTS.sh');
 };
