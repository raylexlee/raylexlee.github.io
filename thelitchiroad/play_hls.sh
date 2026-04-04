#!/bin/bash
# play_hls.sh - Interactive ffplay for HLS master playlists

URL="$1"

if [ -z "$URL" ]; then
  echo "Usage: $0 <master.m3u8 URL>"
  exit 1
fi

echo "=== Probing streams ==="
ffprobe -hide_banner "$URL" 2>&1 | grep -E "Stream|Program"

echo
echo "Enter audio stream index (e.g. 0 for ch1, 1 for ch2): "
read ASTREAM
echo "Enter video stream index (e.g. 6 for 640x360, 9 for 1920x1080): "
read VSTREAM

echo
echo "Launching ffplay with audio=$ASTREAM video=$VSTREAM ..."
ffplay "$URL" -ast "$ASTREAM" -vst "$VSTREAM"

