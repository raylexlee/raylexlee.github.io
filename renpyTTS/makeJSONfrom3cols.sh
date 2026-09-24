#!/usr/bin/env bash
GAME=${1?'missing game name eg ReclaimingtheLost..'}
grep ^[A-Za-z] "$GAME"_3col.txt | awk '{print $1,$3;}' > "$GAME".txt
./genJSON.sh "$GAME"
git add -A
git commit -m 'Update voice matching'
git push origin master
