const proxyurl = "https://peaceful-earth-25999.herokuapp.com/";
const url = "http://podcast.rthk.hk/podcast/item_all.php?pid=287&lang=zh-CN"; // site that doesn’t send Access-Control-*
const reBody = new XRegExp('^.*<body[^>]*>(.*)<\\/body>.*$','s')
const reScript = new XRegExp('<script[^>]*>.*?<\\/script>','gs')
fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/http://podcast.rthk.hk/podcast/item_all.php?pid=287&lang=zh-CN
.then(response => response.text())
.then(function(contents) {  
    const responseText = contents.replace(reBody, '$1').replace(reScript, '');
    console.log(responseText)})
.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
