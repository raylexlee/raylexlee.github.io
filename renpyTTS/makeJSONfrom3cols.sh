#!/usr/bin/env bash
GAME=${1?'missing game name eg ReclaimingtheLost..'}
grep ^[a-z] "$GAME"_3col.txt | awk '{print $1,$3;}' > "$GAME".txt
./genJSON.sh "$GAME"
