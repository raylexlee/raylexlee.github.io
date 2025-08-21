#!/usr/bin/env bash
TXT=${1?'missing text file'}
TITLE=${2?'missing title ...'}
SRT=$(sed 's/txt$/srt/' <<< $TXT)
VTT=$(sed 's/txt$/vtt/' <<< $TXT)
MP3=$(sed 's/txt$/mp3/' <<< $TXT)
SVG=$(sed 's/txt$/svg/' <<< $TXT)
start=$(date +%s)
edge-tts --voice zh-HK-WanLungNeural --rate=-15% --file $TXT --write-media $MP3 --write-subtitles $SRT
echo WEBVTT > $VTT
sed 's/,/./g' < $SRT >> $VTT
sed 's/RaylexLee/'"$TITLE"'/' < RaylexLee.svg > $SVG
echo $(sed 's#.*/\([^/]*\)\.txt$#\1#' <<< $TXT) $TITLE >> pair.txt
end=$(date +%s)
echo ==== $((end = start))s $MP3
