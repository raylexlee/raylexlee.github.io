const panoIframe = loc => `<iframe width="800" height="400" allowfullscreen style="border-style:none;"
src="https://cdn.pannellum.org/2.5/pannellum.htm#panorama=https%3A//raylexlee.github.io/wypath_campus_tour/dest_pano/${loc}.jpg&autoLoad=true"></iframe>`;
const maparea = imageMapResize();
maparea.forEach(a => a.onclick=function(item,index) {
    item.preventDefault();
    console.log(item.path[0].alt);
    document.getElementById('pano').innerHTML = panoIframe(item.path[0].alt);
});
// console.log(maparea);