#!/usr/bin/env bash
EID=${1?'missing episode id eg 24153'}
EPISODES_URL='https://www.rthk.hk/radio/radio1/programme/People/episode/'"$EID"
curl -s -o temp.html $EPISODES_URL
dos2unix -q temp.html
cat temp.html | pup 'meta[name="episodeName"] attr{content}'
cat temp.html | pup 'meta[name="description"] attr{content}'
rm temp.html
