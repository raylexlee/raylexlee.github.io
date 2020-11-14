const panoIframe = loc => `<iframe width="800" height="500" allowfullscreen style="border-style:none;"
    src="https://cdn.pannellum.org/2.5/pannellum.htm#panorama=https%3A//raylexlee.github.io/wypath_campus_tour/dest_pano/${loc}.jpg&autoLoad=true"></iframe>`;
const maps = imageMapResize();
maps[0].onclick = function (MapClick) {
    MapClick.preventDefault();
    document.getElementById('pano').innerHTML = panoIframe(MapClick.target.alt);
};
document.getElementById('pano').innerHTML = panoIframe("1");