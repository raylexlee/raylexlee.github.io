let lastclick = undefined;
function handleClick(element) {
  if (lastclick === element.alt) {
    lastclick = undefined;
    status.innerText = statusDateTime;
    return;
  }
  if (lastclick === undefined) {
    lastclick = element.alt;
    status.innerText = podcasts[images[lastclick]];
    return;
  }
  const a = lastclick;
  const b = element.alt;
  [images[a],images[b]] = [images[b], images[a]];
  lastclick = undefined;
  status.innerText = statusDateTime;
  refresh();
};
const container = document.getElementsByClassName("grids-container")[0];
const status = document.querySelector('p');
const statusDateTime = status.innerText;
const images = Object.keys(podcasts).sort(() => .5 - Math.random()).slice(0,24);
const refresh = () => {
const grids = images.map((p, i) => `<div>
<img onclick="handleClick(this)" src="https://podcast.rthk.hk/podcast/upload_photo/item_photo/1400x1400_${p}.jpg" alt="${i}">
</div>`).join("\n");
container.innerHTML=grids;
};
refresh();