#!/usr/bin/env bash
GAME=${1?'missing game name eg ReclaimingtheLost..'}
awk '{print $1,$2;}' < "$GAME"_3col.txt > "$GAME".txt
./genJSON.sh "$GAME"
