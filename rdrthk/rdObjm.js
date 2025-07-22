const radiodrama = {
  set currentDrama(drama) {
    [this.group, this.title, this.program_infix, this.episodes, this.digit] = drama.split(' ');
    this.episodes = +this.episodes;
    this.digit = +this.digit;
    this.episode = 1;
    this.time = 0.0;
    localStorage.setItem('lastRadioDramaTitle', this.title);
    localStorage.setItem('lastTitleRadioDrama'+this.group, this.title);
    localStorage.setItem('activeEpisode'+this.title,this.episode);
    localStorage.setItem('currentTime'+this.title, this.time);
  },
  set stepEpisode(n) {
    this.episode += n;
    if (this.episode > this.episodes) this.episode = 1;
    if (this.episode < 1) this.episode = this.episodes;
    localStorage.setItem('activeEpisode'+this.title,this.episode);
  },
  set currentTime(t) {
    this.time = +t;
    localStorage.setItem('currentTime'+this.title, this.time);
  },
  set currentEpisode(e) {
    this.episode = +e;
    localStorage.setItem('activeEpisode'+this.title,this.episode);
  },
  get url() {
    const infix = this.program_infix;
    const base = (infix.indexOf('/') == -1) ? 'media' : 'mp3';
    const pad = this.digit;
    const i = this.episode;
    let episode;
    if (pad == 4) {
      episode = 'abcdefghijklmnopqrstuvwxyz'.charAt(i-1);	    
    } else {
      episode = i.toString();
      if (pad > 0) {
         episode = episode.padStart(pad, '0');
      }
    }       
    return `https://www.rthk.hk/radiodrama/${base}/${infix}${episode}.mp3`;
  },
  group: "中外經典",
  title: "雍正皇帝",
  program_infix: "1classics/king",
  episodes: 75,
  digit: 2,
  episode: 1,
  time: 0.0,
}
// 
// radiodrama.stepEpisode = 18;
// console.log(radiodrama.url);
// console.log(radiodrama.title);
// radiodrama.currentEpisode = '45';
// console.log(radiodrama.url);
// radiodrama.currentDrama = "三浦綾子之冰點 1classics/icepoint/ 39 2";
// console.log(radiodrama.url);
// console.log(Object.keys(radiodrama).map(e => `${typeof(radiodrama[e])} -> ${e}`));
// console.log(radiodrama);
