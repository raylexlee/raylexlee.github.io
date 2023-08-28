const getsongs = arg => {
    const link = `https://youtu.be/${arg.link}`;
    const album = arg.albumObj;
    const bashEscapePattern = /[\]\['&!?,\s()]/g;
    const escapePattern = bashEscapePattern;
    const pattern = new RegExp(album.regex);
    const hasTime = /\\d/.test(album.regex);
    const TimeTitles = album.timetitles.map(timetitle => {
        const rArray = pattern.exec(timetitle);
        const r = rArray ? rArray : [];
        let Time, Title, Start, TitleStr;
        r[1] = r[1] ? r[1] : '0';
        if (!hasTime) {
            // No timestamp of the songs : This means mp3splt -s works perfect for this album:)
            return {Time: '', Title: r[1].replace(escapePattern, '\\$&')};
        }
        r[2] = r[2] ? r[2] : '0';
        if (/^\d/.test(r[1])) {
            Title = r[r.length-1];
            Time = (r.length === 5) 
                ? `${60*(r[1].replace(/:$/,'')) + 1*r[2]}.${r[3]}`
                : `${r[1]}.${r[2]}`;
            Start = (r.length === 5) 
                ? (3600*(r[1].replace(/:$/,'')) + 60*r[2]+ 1*r[3])
                : (60*r[1] + 1*r[2]);
        } else {
            Title = r[1];
            Time = (r.length === 5) 
                ? `${60*(r[2].replace(/:$/,'')) + 1*r[3]}.${r[4]}`
                : `${r[2]}.${r[3]}`;
            Start = (r.length === 5) 
                ? (3600*(r[2].replace(/:$/,'')) + 60*r[3] + 1*r[4])
                : (60*r[2] + 1*r[3]);
        }
        TitleStr = Title ? Title : '';
        return {Start: Start, Time: Time, Title: TitleStr.replace(escapePattern, '\\$&')};
    });
    const Times = TimeTitles.map(e => e.Time);
    const artist = album.singer.replace(escapePattern, '\\$&');
    const alBum = album.album.replace(escapePattern, '\\$&');
    const Titles = TimeTitles.map( (e, idx) => 
        (idx === 0 )  ? `%[@a=${artist},@b=${alBum},@t=${e.Title},@g=13]` : `[@t=${e.Title}]`);
    const TimeArg = `${Times.join(" ")} EOF`;
    const TitleArg = Titles.join('');
    const mkdirLine = `mkdir /mnt/d/NewMusic/${artist}`;
    const dlmp3Line = `yt-dlp --extract-audio --audio-format mp3 --audio-quality 5 -o '${artist}.%(ext)s' ${link}`;
    const albumFile = `${artist}.mp3`;
    const spltLine = hasTime 
      ? `mp3splt -o @a-@t -d /mnt/d/NewMusic/${artist} -g ${TitleArg} ${albumFile} ${TimeArg}`
      : `mp3splt -s -o @a-@t -d /mnt/d/NewMusic/${artist} -g ${TitleArg} ${albumFile}`;
    return {shscript: `${mkdirLine}\n${dlmp3Line}\n${spltLine}\n`, 
            TimeTitles: TimeTitles};  
}
