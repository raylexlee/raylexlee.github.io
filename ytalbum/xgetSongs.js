const xgetsongs = arg => {
    const link = `https://youtu.be/${arg.link}`;
    const album = arg.albumObj;
    const bashEscapePattern = /[\]\['&!?,\s()]/g;
    const escapePattern = bashEscapePattern;
    const pattern = XRegExp(album.regex, 'x');
    const hasTime = /\(\?<m>/.test(album.regex);
    const hasHour = /\(\?<h>/.test(album.regex);
    const hasArtist = /\(\?<a>/.test(album.regex);
    const hasYear = /\(\?<y>/.test(album.regex);
    const TimeTitles = album.timetitles.map(timetitle => {
        const raylex = XRegExp.exec(timetitle, pattern);
        const r = raylex.groups;
        const hour = hasHour ? r.h.replace(/:$/,'') : '0';
        const Time = hasTime ? `${60*hour + 1*r.m}.${r.s}` : '';
        const Start = hasTime ? (3600*hour + 60*r.m + 1*r.s) : 0;
        const Title = r.t.replace(escapePattern, '\\$&');
        const Artist = hasArtist ? r.a.replace(escapePattern, '\\$&') : '';
        const Year = hasYear ? r.y : '';
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
    const mkdirLine = `mkdir /mnt/d/NewMusic/${artist}`;
    const dlmp3Line = `youtube-dl --extract-audio --audio-format mp3 --audio-quality 5 -o '${artist}.%(ext)s' ${link}`;
    const albumFile = `${artist}.mp3`;
    const spltLine = hasTime 
      ? `mp3splt -o @a-@t -d /mnt/d/NewMusic/${artist} -g ${TitleArg} ${albumFile} ${TimeArg}`
      : `mp3splt -s -o @a-@t -d /mnt/d/NewMusic/${artist} -g ${TitleArg} ${albumFile}`;
    return {shscript: `${mkdirLine}\n${dlmp3Line}\n${spltLine}\n`,
            TimeTitles: TimeTitles} ;  
}
