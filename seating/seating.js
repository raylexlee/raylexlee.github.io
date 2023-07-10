let lastclick = undefined;
function handleClick(element) {
  if (lastclick === element.alt) {
    lastclick = undefined;
    status.innerHTML = statusDateTime;
    return;
  }
  if (lastclick === undefined) {
    lastclick = element.alt;
    status.innerHTML = podcasts[images[lastclick]];
    return;
  }
  const a = lastclick;
  const b = element.alt;
  [images[a],images[b]] = [images[b], images[a]];
  lastclick = undefined;
  status.innerHTML = statusDateTime;
  refresh();
};
const container = document.getElementsByClassName("grids-container")[0];
const status = document.querySelector('p');
const statusDateTime = status.innerHTML;
const images = Object.keys(podcasts).sort(() => .5 - Math.random()).slice(0,33);
images.push("empty");
images.push("empty");
images.push("empty");
const imgSrc= p => (p === "empty") ? "empty.svg" : `https://podcast.rthk.hk/podcast/upload_photo/item_photo/1400x1400_${p}.jpg`; 
const imgCap= i => (images[i] === "empty") ? "empty" : `${podcasts[images[i]]}`;
const refresh = () => {
const grids = images.map((p, i) => `<div><figure>
<img onclick="handleClick(this)" src="${imgSrc(p)}" alt="${i}" \>
<figcaption>${imgCap(i)}</figcaption>
</figure></div>`).join("\n");
container.innerHTML=grids;
};
refresh();
