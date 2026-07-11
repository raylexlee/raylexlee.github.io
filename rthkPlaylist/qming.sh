for i in $(ls *m3u8)
do
j=$(grep net/m4a/radio/archive/radio[12345]/ $i | head -1)
if [[ -n "$j" ]]; then
  sed 's#.*radio\([12]\)/\([^/]*\)/.*#'"$(tr -d .m3u8 <<< $i)"' \1 \2 0 true#' <<< $j
fi
done
