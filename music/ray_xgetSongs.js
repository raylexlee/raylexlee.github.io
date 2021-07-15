const xgetsongs = arg => {
    const link = `https://www.youtube.com/watch?v=${arg.link}`;
    const album = arg.albumObj;
    const bashEscapePattern = /[\]\['&!?,\s()]/g;
    const escapePattern = bashEscapePattern;
    const pattern = XRegExp(album.regex, 'x');
    const hasTime = /\(\?<m>/.test(album.regex);
    const hasHour = /\(\?<h>/.test(album.regex);
    const hasArtist = /\(\?<a>/.test(album.regex);
    const hasYear = /\(\?<y>/.test(album.regex);
    const TimeTitles = album.timetitles.map(timetitle => {
        const r = XRegExp.exec(timetitle, pattern);
        const k = Object.keys(r);
        const v = (fld = 'y', isStr = true) => (k.indexOf(fld) == -1) ? (isStr ? '' : '0') :  r[fld];
        const hour = hasHour ? v('h').replace(/:$/,'') : '0';
        const Time = hasTime ? `${60*hour + 1*v('m', false)}.${v('s', false)}` : '';
        const Start = hasTime ? (3600*hour + 60*v('m', false) + 1*v('s', false)) : 0;
        const Title = v('t').replace(escapePattern, '\\$&');
        const Artist = hasArtist ? v('a').replace(escapePattern, '\\$&') : '';
        const Year = hasYear ? v('y') : '';
        return hasTime 
            ? {Start: Start, Time: Time, Title: Title, Artist: Artist, Year: Year}
            : {Time: Time, Title: Title, Artist: Artist, Year: Year};
    });
    const Times = TimeTitles.map(e => e.Time);
    const artist = album.singer.replace(escapePattern, '\\$&');
    const alBum = album.album.replace(escapePattern, '\\$&');
    const Titles = TimeTitles.map( (e, idx) => { 
        let TitleStr = (idx === 0 )  ? `@b=${alBum},@t=${e.Title},@g=13` : `@t=${e.Title}`;
        TitleStr = hasYear ? `${TitleStr},@y=${e.Year}` : TitleStr;
        TitleStr = hasArtist ? `${TitleStr},@a=${e.Artist}` 
                             : ((idx === 0) ? `${TitleStr},@a=${artist}` : TitleStr);
        return (idx === 0) ? `%[${TitleStr}]` : `[${TitleStr}]`;                     
    }); 
    const TimeArg = `${Times.join(" ")} EOF`;
    const TitleArg = Titles.join('');
    const mkdirLine = `mkdir ~/NewMusic/${artist}`;
    const dlmp3Line = `youtube-dl --extract-audio --audio-format mp3 --audio-quality 5 -o 'album.%(ext)s' ${link}`;
    const albumFile = 'album.mp3';
    const spltLine = hasTime 
      ? `mp3splt -o @a-@t -d ~/NewMusic/${artist} -g ${TitleArg} ${albumFile} ${TimeArg}`
      : `mp3splt -s -o @a-@t -d ~/NewMusic/${artist} -g ${TitleArg} ${albumFile}`;
    return {shscript: `${mkdirLine}\n${dlmp3Line}\n${spltLine}\nrm album.mp3\n`,
            TimeTitles: TimeTitles} ;  
}