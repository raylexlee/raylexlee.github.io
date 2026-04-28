for i in $(ls *m3u8); do sed '1,3 d' $i >> ~/raylexlee.github.io/rthkPlaylist/$i; done
