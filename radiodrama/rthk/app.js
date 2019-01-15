var audio;
var playlist;
var tracks;
var current;
var title;
var activeEpisode;
var currentTime;
if (!localStorage.getItem('activeEpisode')) {
    localStorage.setItem('activeEpisode', "1");
    localStorage.setItem('currentTime', 0.0);
}
activeEpisode = localStorage.getItem('activeEpisode');
currentTime = localStorage.getItem('currentTime');
if (document.readyState !== 'loading' ) {
  eventHandler();
} else {
  document.addEventListener( 'DOMContentLoaded', eventHandler);  
}  
function eventHandler(){

init();
function init(){
    title = document.title;
    audio = document.getElementById('audio');
    playlist = document.getElementById('playlist');
    FillPlaylist();	
    tracks = playlist.querySelectorAll('a');
    audio.volume = .10;
    for (var link of tracks) {
        link.addEventListener('click', function(e){ 
        e.preventDefault();
        var link = this;
        current.classList.remove('active');
        current = link.parentNode;
        current.classList.add('active');
        currentTime = 0.0;
        localStorage.setItem('currentTime', 0.0);
        run(link, audio);
        });
    }
    audio.addEventListener('ended',function(e){
        current.classList.remove('active');
        current= current.nextElementSibling;
        if(current == null){
            current = playlist.firstElementChild;
        }
        current.classList.add('active');
        link = current.firstElementChild;
        currentTime = 0.0;
        localStorage.setItem('currentTime', 0.0);
        run(link,audio);
    });
    audio.addEventListener('play',function(e){
        if (currentTime > audio.currentTime) {
            audio.currentTime = currentTime;
        }
    });
    audio.addEventListener('pause',function(e){
        localStorage.setItem('currentTime', audio.currentTime);
    });
    document.title = title + ' - ' + activeEpisode;
    audio.play();
    audio.currentTime = currentTime;
}
function run(link, player){
        document.title = title + ' - ' + activeEpisode;
        player.src = link.href;
        localStorage.setItem('activeEpisode', link.innerHTML);
        audio.load();
        audio.play();
        audio.currentTime = currentTime;
}
function FillPlaylist() {
    var i;
    for (i=1; i<=radiodrama.episodes; i++) { 	
       var div_ = document.createElement("DIV");
       var a_ = document.createElement("A");
       var drama = radiodrama.program_infix;
       var pad = radiodrama.digit;
       if (pad == 4) {
           var episode = "abcdefghijklmnopqrstuvxywz".charAt(i-1);	    
       } else {
           var episode = i.toString();
           if (pad > 0) {
	          episode = episode.padStart(pad, '0');
           }
       }       
       a_.setAttribute("href", "http://rthk9.rthk.hk/radiodrama/mp3/"+ drama + episode + ".mp3");
       var i_ = document.createTextNode(i.toString());
       a_.appendChild(i_);
       div_.appendChild(a_);
       if (i.toString() == activeEpisode) {
      div_.setAttribute("class","active");     
      current = div_;
	  audio.firstElementChild.setAttribute("src", a_.attributes[0].value);     
	  audio.load();     
       }	       
       playlist.appendChild(div_);
    }	    
}
}	