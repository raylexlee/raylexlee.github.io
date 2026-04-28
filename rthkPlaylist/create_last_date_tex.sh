echo last_date = { > lastDate.py
for i in $(ls *m3u8) 
do 
  j=$(sed 's#\(.*\).....$#\1#' <<< $i) 
  tail -2 $i | head -1 | sed 's#.*\(....\)\(..\)\(..\).$#\1\2\3 \3/\2/\1 '"$j"'#' 
  tail -2 $i | head -1 | sed 's#.*\(....\)\(..\)\(..\).$#='"$j"'=: =\3/\2/\1=,#' | sed 's#=#"#g'>> lastDate.py 
done | sort > last_date.txt
echo }>> lastDate.py
