window.ignore_heading = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
'•', 'Morning', 'Afternoon', 'Evening', 'Night', 'Notes', 'Fun', 'COMIC_TEST','COMIC_TEST.',
'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ]    
window.getSpeakerMsg = function(text) {
    let speaker, msg;
    const b = text.split(': ').filter(x => x && !x.startsWith('$') && !ignore_heading.includes(x))
    if (b.length === 0) return ['', ''];
    if (b.length === 1) {
       speaker = 'Narrator';
       msg = b[0];
    } else {
       const testSpeaker = b[0].replace(' ','_');
       if (testSpeaker in window.characterMap) {
         let last = b.length - 1;
         msg = b[last];
         speaker = testSpeaker;
       } else {
            speaker = 'Narrator';
            msg = b.join(' ');
         }
      }
   return [speaker, msg]
}

