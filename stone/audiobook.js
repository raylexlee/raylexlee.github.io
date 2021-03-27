import * as id3 from './js/id3.js';
var audio;
var playlist;
var tracks;
var current;
var title;
var activeEpisode;
var currentTime;
title = document.title;
if (!localStorage.getItem('activeEpisode'+title)) {
  localStorage.setItem('activeEpisode'+title, '1');
  localStorage.setItem('currentTime'+title, 0.0);
}
activeEpisode = localStorage.getItem('activeEpisode'+title);
currentTime = localStorage.getItem('currentTime'+title);
if (document.readyState !== 'loading' ) {
  eventHandler();
} else {
  document.addEventListener( 'DOMContentLoaded', eventHandler);  
}  
function eventHandler(){

  init();
  function init(){
    SetGridColumn();
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
        localStorage.setItem('currentTime'+title, 0.0);
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
      localStorage.setItem('currentTime'+title, 0.0);
      run(link,audio);
    });
    audio.addEventListener('play',function(e){
      if (currentTime > audio.currentTime) {
        audio.currentTime = currentTime;
      }
    });
    audio.addEventListener('pause',function(e){
      localStorage.setItem('currentTime'+title, audio.currentTime);
    });
    document.title = title + ' - ' + activeEpisode;
    audio.play();
    audio.currentTime = currentTime;
  }
  function run(link, player){
    player.src = link.href;
    localStorage.setItem('activeEpisode'+title, link.innerHTML);
    activeEpisode = link.innerHTML;
    document.title = title + ' - ' + activeEpisode;
    audio.load();
    id3.fromUrl(link.href).then( tags => {
      document.getElementById('chapter').innerHTML=`${tags.title ? tags.title+'<br>' : ''}`;
      document.getElementById('artistalbum').innerHTML=
            `${tags.artist} | ${tags.album}<br>${tags.comments ? tags.comments+'<br>' : ''}
             Recorded in ${tags["recording-time"]}
            `;
    });
    audio.play();
    audio.currentTime = currentTime;
  }
  function FillPlaylist() {
    let i;
    const last_episode = episodes + start_episode - 1;
    for (i=start_episode; i <= last_episode; i++) { 	
      var div_ = document.createElement('DIV');
      var a_ = document.createElement('A');
      const pad = 3;
      a_.setAttribute('href', `/audio/${title}/${i.toString().padStart(pad, '0')}.mp3`);
      if (i >= 100) a_.setAttribute('style', 'font-size: 75%');
      var i_ = document.createTextNode(i.toString());
      a_.appendChild(i_);
      div_.appendChild(a_);
      if (i.toString() == activeEpisode) {
        div_.setAttribute('class','active');     
        current = div_;
        audio.firstElementChild.setAttribute('src', a_.attributes[0].value);     
	audio.load();     
        id3.fromUrl(`/audio/${title}/${i.toString().padStart(pad, '0')}.mp3`).then( tags => {
          document.getElementById('chapter').innerHTML=`${tags.title ? tags.title+'<br>' : ''}`;
          document.getElementById('artistalbum').innerHTML=
            `${tags.artist} | ${tags.album}<br>${tags.comments ? tags.comments+'<br>' : ''}
             Recorded in ${tags["recording-time"]}
            `;
        });
      }	       
      playlist.appendChild(div_);
    }	    
  }
  function SetGridColumn() {
    var colNum = 10;
    const n = episodes;
    switch (n) {
    case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9:
      colNum = n;
      break;
    case 11: case 12:
      colNum = 6;
      break;
    case 13: case 14:
    case 21:
      colNum = 7;
      break;
    case 15: case 16:
    case 22: case 23: case 24:
    case 31: case 32:
      colNum = 8;
      break;
    case 17: case 18:
    case 25: case 26: case 27:
    case 33: case 34: case 35: case 36:
    case 41: case 42: case 43: case 44: case 45:
    case 51: case 52: case 53: case 54:
    case 61: case 62: case 63:
    case 71: case 72:
    case 81: 
      colNum = 9;
      break;
    }
    document.documentElement.style.setProperty('--colNum', colNum);
  }
}	
