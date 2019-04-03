const proxyurl = "https://peaceful-earth-25999.herokuapp.com/";
const url = "http://podcast.rthk.hk/podcast/item_epi.php?pid=287"; // site that doesn’t send Access-Control-*
const re = new XRegExp('<body(.*)<\\/body>','s')
fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/http://esda.wyk.edu.hk/status/staff.html
.then(response => response.text())
.then(function(contents) {  
    const responseText = responseText.replace(re, '$1');
    console.log(responseText)})
.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
