var Playlist, playlistIds, videoIds, englishLength, chineseLength ;
const EnglishName = "raylex@HK.";
const ChineseName = "香港李潤明";
const Category = {
  "song":"Single Song", 
  "album":"Album", 
  "game":"Gaming Tutorial", 
  "code":"Coding Tutorial", 
  "radio":"Radio Drama", 
  "drama":"Video Drama", 
  "book":"Audio-book"
};
Playliest = {
  "scqLliarGpM": {
    "linktitle": "1984 Audiobook by George Orwell",
    "title": "1984 by George Orwell",
    "videoCount": "1",
    "category": "book"
  },
  "QDYfEBY9NM4": {
    "linktitle": "Let It Be (Remastered 2009)",
    "title": "Beatles - Let It Be",
    "videoCount": "1",
    "category": "song"
  },
  "PL5ZjCaHAPrSHz0VUSVI-8-AmbleG6XgRz&index=1": {
    "linktitle": "粤语古仔_张悦楷_三国演义第一回之一",
    "title": "粤语古仔_张悦楷_三国演义",
    "videoCount": "158",
    "category": "radio"
  },
  "PLiMesYvY0uhqX-dk60C8UK4kEF5jMTahI": {
    "linktitle": "【凯叔西游记 第一部】 第1集 石猴出世 | 凯叔讲故事",
    "title": "凯叔西游记",
    "videoCount": "136",
    "category": "book"
  },
  "PLiMesYvY0uhrhfmSpyP_yEj1OhtGJTEmg": {
    "linktitle": "【凯叔封神演义】宣传片 | 凯叔讲故事",
    "title": "凯叔封神演义",
    "videoCount": "133",
    "category": "book"
  },
  "PLq6JrsCpb3OV01kpEwJmUV54vAmvtlgQO": {
    "linktitle": "BBC Radio 4 - James Bond Radio Drama, Dr. No",
    "title": "BBC Radio 4 - James Bond",
    "videoCount": "9",
    "category": "radio"
  },
  "PLq6JrsCpb3OWQ__X6eW0TNa2JjfkAkmOf": {
    "linktitle": "You Only Live Twice Audiobook - Part I - Chapter 1- Scissors Cut Paper [Book #12 {#13}]",
    "title": "You Only Live Twice Audiobook",
    "videoCount": "22",
    "category": "book"
  },
  "PL9NnnYq7Myj3a-2LEYWKmHYDjf199QAzc": {
    "linktitle": "紅樓夢 第1回 [粵語]",
    "title": "紅樓夢 [粵語]",
    "videoCount": "101",
    "category": "book"
  },
  "PL9NnnYq7Myj0ugrjxmNQ7S3oXzFsUiaTo": {
    "linktitle": "封神榜 [廣東話] 全集完",
    "title": "封神榜 [廣東話]",
    "videoCount": "122",
    "category": "book"
  },
  "PL9NnnYq7Myj3WqZ1wXh8CXLRFvBEpucyu": {
    "linktitle": "窺破金瓶 [廣東話] 全集完",
    "title": "窺破金瓶 [廣東話]",
    "videoCount": "47",
    "category": "book"
  },
  "PL9NnnYq7Myj28GCppkIwoh6cHPSEZpjZO": {
    "linktitle": "吳承恩 - 西遊記 [廣東話] 全集完",
    "title": "西遊記 [廣東話]",
    "videoCount": "122",
    "category": "book"
  },
  "PL9NnnYq7Myj2965XAdB7OXBIMMcVLjbvX": {
    "linktitle": "水滸傳 - 蕩寇英雄錄 [廣東話] 全集完",
    "title": "水滸傳 - 蕩寇英雄錄 [廣東話] ",
    "videoCount": "122",
    "category": "book"
  },
  "PL9NnnYq7Myj0IHFfKlr06Auk0ZRzgcHfN": {
    "linktitle": "八仙全傳 01 [粵語]",
    "title": "八仙全傳  [廣東話]",
    "videoCount": "47",
    "category": "book"
  },
  "PL9NnnYq7Myj0KPMkJ1D-788xKvcQPadTD": {
    "linktitle": "[廣東話]黃易 - 尋秦記 001",
    "title": "尋秦記  [廣東話]",
    "videoCount": "248",
    "category": "book"
  },
  "PL9NnnYq7Myj0Miamt0vXlXGp5uneHi2V7": {
    "linktitle": "禹岩 - 極品家丁 001 [粵語]",
    "title": "極品家丁  [廣東話]",
    "videoCount": "521",
    "category": "book"
  },
  "PLkO_MwqGT7JSdnmhQDwfxKtB7waoE9hqh": {
    "linktitle": "笑傲江湖",
    "title": "笑傲江湖",
    "videoCount": "42",
    "category": "drama"
  },
  "PLlrxD0HtieHhW0NCG7M536uHGOtJ95Ut2": {
    "linktitle": "Beginner's Series to: JavaScript",
    "title": "Beginner's JavaScript",
    "videoCount": "51",
    "category": "code"
  },
  "U6UV8IlYO8g": {
    "linktitle": "Blue Balloon (The Hourglass Song) - Robby Benson",
    "title": "Blue Balloon",
    "videoCount": "1",
    "category": "song"
  },
  "tH2w6Oxx0kQ": {
    "linktitle": "Kansas - Dust in the Wind (Official Video)",
    "title": "Kansas - Dust in the Wind",
    "videoCount": "1",
    "category": "song"
  },
  "OAfxs0IDeMs": {
    "linktitle": "Heart - All I Wanna Do Is Make Love To You (Official Music Video)",
    "title": "Heart - All I Wanna Do Is Make Love To You",
    "videoCount": "1",
    "category": "song"
  },
  "Hb3Sx1Z-7rk": {
    "linktitle": "Cyndi Lauper - Time After Time (new cut)",
    "title": "Cyndi Lauper - Time After Time",
    "videoCount": "1",
    "category": "song"
  },
  "CdiQQqFPphI": {
    "linktitle": "Bruno mars Greatest Hits - The Best Of Bruno mars Playlist 2018 - YouTube",
    "title": "Bruno Mars - The Best Of Bruno Mars 2018",
    "videoCount": "1",
    "category": "album"
  },
  "ZB-VM6nhMDc": {
    "linktitle": "The best songs of Maroon5 (Maroon5 greatest hits) - YouTube",
    "title": "Maroon 5 - The best songs of Maroon 5",
    "videoCount": "1",
    "category": "album"
  },
  "nCXodc07C7I": {
    "linktitle": "黃家駒30首懷舊經典老歌(配歌詞字幕)可選歌",
    "title": "黃家駒 - Beyond 30首懷舊經典",
    "videoCount": "1",
    "category": "album"
  },
  "ZVr85Gjwi0k": {
    "linktitle": "高清音质❤经典粤语歌曲精选❤【梅艳芳 Anita Mui】",
    "title": "梅艷芳 - 梅艷芳经典粤语歌曲精选",
    "videoCount": "1",
    "category": "album"
  },
  "lzqSju8GHiA": {
    "linktitle": "高勝美精選38首經典老歌加配（歌詞字幕）可選歌",
    "title": "高勝美 - 高勝美 精選 38首經典",
    "videoCount": "1",
    "category": "album"
  },
  "CqCBe6yJgU0": {
    "linktitle": "青山 Qing Shan - 最佳精选歌曲 Zui Jia Xing Xuan Gequ",
    "title": "青山 - 青山 最佳精选歌曲",
    "videoCount": "1",
    "category": "album"
  },
  "5qrz-OwqIiE": {
    "linktitle": "陳百強 - 一生何求",
    "title": "陳百強 - 陳百強 一生何求",
    "videoCount": "1",
    "category": "album"
  },
  "OEUA1SK00hM": {
    "linktitle": "蔡國權 - 創作精選",
    "title": "蔡國權 - 蔡國權 - 創作精選",
    "videoCount": "1",
    "category": "album"
  },
  "ENHxj6FgMWg": {
    "linktitle": "鄧麗君 - 永恒鄧麗君柔情經典 (CD1)",
    "title": "鄧麗君 - 永恒鄧麗君柔情經典 (CD1)",
    "videoCount": "1",
    "category": "album"
  },
  "A8tl4cZq7V0": {
    "linktitle": "陳奕迅精選歌曲30首",
    "title": "陳奕迅 - 陳奕迅精選歌曲30首",
    "videoCount": "1",
    "category": "album"
  },
  "voC8FGsXIW0": {
    "linktitle": "陈慧娴30首最好听的歌",
    "title": "陳慧嫻 - 陳慧嫻精選歌曲30首",
    "videoCount": "1",
    "category": "album"
  },
  "QuZmkWVRKng": {
    "linktitle": "鄧麗君23首懷舊經典老歌配歌詞字幕可選歌",
    "title": "鄧麗君 - 鄧麗君精選歌曲",
    "videoCount": "1",
    "category": "album"
  },
  "2Ar1eYamxNs": {
    "linktitle": "許冠傑 - 懷舊永恆金曲精選 超值珍藏版 (Disc 1)",
    "title": "許冠傑 - 許冠傑精選歌曲",
    "videoCount": "1",
    "category": "album"
  },
  "A0PwQkBvRoM": {
    "linktitle": "蔡琴34首懷舊經典老歌加配歌詞字幕可選歌",
    "title": "蔡琴 - 蔡琴 34首懷舊經典",
    "videoCount": "1",
    "category": "album"
  },
  "V1WG9QLkO0U": {
    "linktitle": "王菲精選歌曲30首",
    "title": "王菲 - 王菲精選歌曲30首",
    "videoCount": "1",
    "category": "album"
  },
  "Z4iB7VTBaZo": {
    "linktitle": "楊丞琳精選歌曲30首",
    "title": "楊丞琳 - 楊丞琳精選歌曲30首",
    "videoCount": "1",
    "category": "album"
  },
  "SXkKJcNKOZQ": {
    "linktitle": "林憶蓮《華納最出色系列42首》專輯",
    "title": "林憶蓮 - 林憶蓮《華納最出色系列42首》",
    "videoCount": "1",
    "category": "album"
  },
  "sorV8ChkX30": {
    "linktitle": "李榮浩 - 耐聽歌曲串燒合輯 收藏必備",
    "title": "李榮浩 - 李榮浩 - 耐聽歌曲串燒合輯",
    "videoCount": "1",
    "category": "album"
  },
  "4LBdvR2rDpA": {
    "linktitle": "徐小鳳37首粵語懷舊經典老歌配歌詞字幕可選歌",
    "title": "徐小鳳 - 徐小鳳 37首粵語懷舊經典",
    "videoCount": "1",
    "category": "album"
  },
  "MyOaDyVhHdA": {
    "linktitle": "張學友32首歌配歌詞字幕可選歌",
    "title": "張學友 - 張學友 32首歌",
    "videoCount": "1",
    "category": "album"
  },
  "RrnYx-JuN0k": {
    "linktitle": "尤雅21首懷舊經典老歌配歌詞字幕可選歌",
    "title": "尤雅 - 尤雅 21首懷舊經典",
    "videoCount": "1",
    "category": "album"
  },
  "ufA8o7Jzeao": {
    "linktitle": "姚莉40首經典老歌加配歌詞字幕可選歌",
    "title": "姚莉 - 姚莉 40首經典",
    "videoCount": "1",
    "category": "album"
  },
  "jLCxjUBODas": {
    "linktitle": "周華健精選歌曲30首",
    "title": "周華健 - 周華健精選歌曲30首",
    "videoCount": "1",
    "category": "album"
  },
  "F3LfZt6d8J0": {
    "linktitle": "周璇33首懷舊經典老歌加配歌詞字幕可選歌",
    "title": "周璇 - 周璇 33首懷舊經典",
    "videoCount": "1",
    "category": "album"
  },
  "x4RhNN5q-2Y": {
    "linktitle": "吳鶯音42首懷舊經典老歌配歌詞字幕可選歌",
    "title": "吳鶯音 - 吳鶯音 42首懷舊經典",
    "videoCount": "1",
    "category": "album"
  },
  "Ib6PHRD9pL8": {
    "linktitle": "The Shadows - All the Best (FULL ALBUM - GREATEST ENGLISH ROCK BAND)",
    "title": "Shadows - The Shadows - All the Best",
    "videoCount": "1",
    "category": "album"
  },
  "XOQ31kuzSBo": {
    "linktitle": "60首張國榮歌曲",
    "title": "張國榮 - 60首張國榮歌曲",
    "videoCount": "1",
    "category": "album"
  },
  "_XUMVy1n_YQ": {
    "linktitle": "Simon & Garfunkel - 1966 - Sounds Of Silence",
    "title": "Simon Garfunkel - Simon & Garfunkel - 1966 - Sounds Of Silence",
    "videoCount": "1",
    "category": "album"
  },
  "o-qCCqjnWp0": {
    "linktitle": "Rod Stewart - 1979 - Greatest Hits",
    "title": "Rod Stewart - Rod Stewart - 1979 - Greatest Hits",
    "videoCount": "1",
    "category": "album"
  },
  "SiPmEP9gspY": {
    "linktitle": "Bread - 1977 - The Sound Of Bread",
    "title": "Bread - Bread - 1977 - The Sound Of Bread",
    "videoCount": "1",
    "category": "album"
  },
  "hyuIKLP1lOI": {
    "linktitle": "Peter Paul & Mary - The Best Of Peter Paul & Mary - Ten Years Together",
    "title": "Peter Paul & Mary - The Best Of Peter Paul & Mary: Ten Years Together",
    "videoCount": "1",
    "category": "album"
  },
  "lWbHG5iGZEA": {
    "linktitle": "Carole King - 1971 - Tapestry",
    "title": "Carole King - Tapestry (1971)",
    "videoCount": "1",
    "category": "album"
  },
  "DhoP6Q50vvQ": {
    "linktitle": "CCR Greatest Hits - Best Songs of CCR (HQ)",
    "title": "CCR - CCR Greatest Hits",
    "videoCount": "1",
    "category": "album"
  },
  "aVqtBaU2X6M": {
    "linktitle": "Best Songs Of Lobo │Lobo Greatest Hits   YouTube",
    "title": "Lobo - Best Songs Of Lobo",
    "videoCount": "1",
    "category": "album"
  },
  "wVIeokUatKY": {
    "linktitle": "A.B.B.A - Forever Gold (1996) Disco 1",
    "title": "ABBA - A.B.B.A - Forever Gold (1996) Disco 1",
    "videoCount": "1",
    "category": "album"
  },
  "DMsDB5r0SS8": {
    "linktitle": "A.B.B.A - Forever Gold (1996) Disco 02",
    "title": "ABBA - A.B.B.A - Forever Gold (1996) Disco 2",
    "videoCount": "1",
    "category": "album"
  },
  "gZCLHpBpU6M": {
    "linktitle": "America - 1975 - Greatest Hits - History",
    "title": "America - America - 1975 - History",
    "videoCount": "1",
    "category": "album"
  },
  "T7Wm0X3ia8g": {
    "linktitle": "Jim Croce - 1980 - His Greatest Songs",
    "title": "Jim Croce - Jim Croce - 1980 - His Greatest Songs",
    "videoCount": "1",
    "category": "album"
  },
  "S643jMNqY2U": {
    "linktitle": "S̰t̰ḛḛl̰y̰ ̰d̰a̰n̰-̰1̰9̰7̰4̰ ̰ Pretzel Logic Full Album",
    "title": "S̰t̰ḛḛl̰y̰ ̰d̰a̰n̰ - 1̰9̰7̰4̰ ̰ Pretzel Logic",
    "videoCount": "1",
    "category": "album"
  },
  "Cn8q5BdIh0k": {
    "linktitle": "Steely D̰a̰n̰-C̰a̰n̰'̰t buy a thrill 1972 Full Album HQ",
    "title": "S̰t̰ḛḛl̰y̰ ̰d̰a̰n̰ - Can'̰t buy a thrill 1972",
    "videoCount": "1",
    "category": "album"
  },
  "LzEZiyO_dp4": {
    "linktitle": "Steel̰y̰ ̰Dan -Countdow̰n̰ to Ecstas̰y̰ 1973 Full Album HQ",
    "title": "S̰t̰ḛḛl̰y̰ ̰d̰a̰n̰ - Countdow̰n̰ to Ecstas̰y̰ 1973",
    "videoCount": "1",
    "category": "album"
  },
  "MAktNj5Eh8o": {
    "linktitle": "(全附歌詞, 開字幕) 林夕填詞金曲60首 (PART 1), 這些耳熟能詳的歌詞都是他的手筆, 也曾經是你的最愛嗎",
    "title": "林夕詞 - 林夕填詞金曲60首第一​輯",
    "videoCount": "1",
    "category": "album"
  },
  "tjj4zBeMfTc": {
    "linktitle": "(全附歌詞) 林夕填詞金曲60首 (PART 2), 這些歌曲曾經陪伴你成長嗎",
    "title": "林夕詞 - 林夕填詞金曲60首第二​輯",
    "videoCount": "1",
    "category": "album"
  },
  "pNVvHUcWuEs": {
    "linktitle": "90後不能沒有聽過的廣東歌 #1【高音質 | 可自選歌曲】懷舊廣東歌 香港粵語 抖音 KKBOX Chinese Classic Romantic Songs",
    "title": "90後 - 90後廣東歌 1",
    "videoCount": "1",
    "category": "album"
  },
  "UHMUtaX1d0A": {
    "linktitle": "Westlife, Backstreet Boys, NSYNC, MLTR Greatest Hits Playlist Full album 2020 - Best of NSYNC",
    "title": "Boy Bands - Boy Bands Vol. 1",
    "videoCount": "1",
    "category": "album"
  },
  "kHjzuqq3b44": {
    "linktitle": "Bob Dylan Greatest Hits - Best Songs of Bob Dylan (HQ)",
    "title": "Bob Dylan - Best Songs of Bob Dylan",
    "videoCount": "1",
    "category": "album"
  },
  "SUQD8MwEOfs": {
    "linktitle": "The Beatles - 1964 - Beatles For Sale",
    "title": "The Beatles - 1964 - Beatles For Sale",
    "videoCount": "1",
    "category": "album"
  },
  "PLLZb-p7tKKmvZaIXrbkix87ZC1ctpbvij": {
    "linktitle": "《菩提》廣播劇",
    "title": "《菩提》廣播劇",
    "videoCount": "20",
    "category": "radio"
  },
  "PLLZb-p7tKKmuofA3xFy2jv9oXOCLRXwCN": {
    "linktitle": "《群鶯亂飛》廣播劇",
    "title": "《群鶯亂飛》廣播劇",
    "videoCount": "25",
    "category": "radio"
  },
  "PLLZb-p7tKKmtrLUe5JI7eimGPyycgYmLX": {
    "linktitle": "《三毛流浪記》廣播劇",
    "title": "《三毛流浪記》廣播劇",
    "videoCount": "20",
    "category": "radio"
  },
  "PLLZb-p7tKKmu3tzMA4IH3YkD1gA7G7-5r": {
    "linktitle": "《幾度夕陽紅》廣播劇",
    "title": "《幾度夕陽紅》廣播劇",
    "videoCount": "30",
    "category": "radio"
  },
  "PLLZb-p7tKKmvL35U69x5932vqdljTzyYy": {
    "linktitle": "《遙遠的路》廣播劇",
    "title": "《遙遠的路》廣播劇",
    "videoCount": "40",
    "category": "radio"
  },
  "PLLZb-p7tKKmvcnkvvXbP-Ue9wYAMrVnZi": {
    "linktitle": "《李娃傳》廣播劇",
    "title": "《李娃傳》廣播劇",
    "videoCount": "15",
    "category": "radio"
  },
  "PLLZb-p7tKKmt93cQV6JACqZeClfLrOHua": {
    "linktitle": "《無怨》廣播劇",
    "title": "《無怨》廣播劇",
    "videoCount": "20",
    "category": "radio"
  },
  "PLKXdE2GkrkoZcIX7-jT_rnuNaE-GMAqGI": {
    "linktitle": "廣播劇-岑凱倫",
    "title": "廣播劇-岑凱倫",
    "videoCount": "64",
    "category": "radio"
  },
  "PLKXdE2GkrkoZcQ9yof-93MkNjXn5gjBNW": {
    "linktitle": "廣播劇-嚴沁",
    "title": "廣播劇-嚴沁",
    "videoCount": "127",
    "category": "radio"
  },
  "PLKXdE2Gkrkoaumdz7JnnucDPjPkhbeQ97": {
    "linktitle": "廣播劇-依達",
    "title": "廣播劇-依達",
    "videoCount": "31",
    "category": "radio"
  },
  "PLKXdE2GkrkoYtS0_0s-6eWk7aTa2DO4-O": {
    "linktitle": "廣播劇-亦舒",
    "title": "廣播劇-亦舒",
    "videoCount": "31",
    "category": "radio"
  },
  "PLK28k95g3JRfKvQIO3H9BgbOM1-w866Ij": {
    "linktitle": "The Twilight Zone - Volume 1",
    "title": "The Twilight Zone Radio Dramas",
    "videoCount": "10",
    "category": "radio"
  },
  "PLK28k95g3JRfirJ65DxzxGRhn_u5BWD_b": {
    "linktitle": "The Twilight Zone - Volume 2",
    "title": "The Twilight Zone - Volume 2",
    "videoCount": "10",
    "category": "radio"
  },
  "PLK28k95g3JRer_I7D2fn40Vy6UfAWSgNG": {
    "linktitle": "The Twilight Zone Volume 3",
    "title": "The Twilight Zone Volume 3",
    "videoCount": "10",
    "category": "radio"
  },
  "PLK28k95g3JRfzXlsOi_xTkTssWDwIQ5GE": {
    "linktitle": "The Twilight Zone Volume 4",
    "title": "The Twilight Zone Volume 4",
    "videoCount": "10",
    "category": "radio"
  },
  "PLK28k95g3JRfoYOX5n3h3BzFj9YSv2cap": {
    "linktitle": "The Twilight Zone Vol 5",
    "title": "The Twilight Zone Vol 5",
    "videoCount": "10",
    "category": "radio"
  },
  "PLK28k95g3JReNbXefiuhFf9tf7SmUsFh2": {
    "linktitle": "The twilight zone vol 6",
    "title": "The twilight zone vol 6",
    "videoCount": "10",
    "category": "radio"
  },
  "PLK28k95g3JRfipG50LTRpxjGaLMO32Ui4": {
    "linktitle": "The Twilight Zone Vol 7",
    "title": "The Twilight Zone Vol 7",
    "videoCount": "10",
    "category": "radio"
  },
  "PLK28k95g3JRf7rMW_OztAYu3KBrYX0CIg": {
    "linktitle": "The Twilight zone Vol 8",
    "title": "The Twilight zone Vol 8",
    "videoCount": "10",
    "category": "radio"
  },
  "PLK28k95g3JReiTIUepBmRZlDDCv3uA5O-": {
    "linktitle": "The Twilight Zone Vol 9",
    "title": "The Twilight Zone Vol 9",
    "videoCount": "10",
    "category": "radio"
  },
  "PLK28k95g3JRdEOBRm6lH-IQb-5SwI9boS": {
    "linktitle": "The Twilight Zone Vol 10",
    "title": "The Twilight Zone Vol 10",
    "videoCount": "10",
    "category": "radio"
  },
  "PLK28k95g3JRcC8qU2HDic0EE1nsL4Kwtz": {
    "linktitle": "The Twilight Zone Vol 11",
    "title": "The Twilight Zone Vol 11",
    "videoCount": "10",
    "category": "radio"
  },
  "PLK28k95g3JRcC9D0SVELRxQUcbe97zt8w": {
    "linktitle": "the Twilight Zone Vol 12",
    "title": "the Twilight Zone Vol 12",
    "videoCount": "10",
    "category": "radio"
  },
  "PLFzpjyWjrMue52RANAdn3VSuNTABa7jeY": {
    "linktitle": "AUDIO DRAMA an hour or more / RADIO DRAMA an hour or more",
    "title": "RADIO DRAMA an hour or more",
    "videoCount": "49",
    "category": "radio"
  },
  "PLRAtagKCr162mqnQ_U0nx5Oht1QWa2wmB": {
    "linktitle": "Leveling Guides",
    "title": "WoW Classic Leveling Guides",
    "videoCount": "7",
    "category": "game"
  },
  "PLRAtagKCr162rgamNXij65Q8zHRpkmC3c": {
    "linktitle": "Top 10 Lists",
    "title": "WoW Classic Top 10 Lists",
    "videoCount": "17",
    "category": "game"
  },
  "PLRAtagKCr163BqxbQniJnCX8CMxZgaPcx": {
    "linktitle": "Class Specific Propaganda Pieces",
    "title": "WoW Classic Class Specific Propaganda Pieces",
    "videoCount": "4",
    "category": "game"
  },
  "PLP7Fypckooc0_Zn0BewB7rn7haEsXm0sH": {
    "linktitle": "Classic WoW - Mage Dungeon Gold Farming!",
    "title": "Classic WoW - Mage Dungeon Gold Farming!",
    "videoCount": "20",
    "category": "game"
  },
  "PLP7Fypckooc1a9MoFANC52IZMhoPYJXFS": {
    "linktitle": "Classic WoW - Horde Dungeon Powerleveling 1-60 Insanely Fast",
    "title": "Classic WoW - Horde Dungeon Powerleveling 1-60 Insanely Fast",
    "videoCount": "19",
    "category": "game"
  },
  "PLyuRouwmQCjk2nJENk4hORzy6LBGz8XoU": {
    "linktitle": "Regular Expressions",
    "title": "Regular Expressions",
    "videoCount": "2",
    "category": "code"
  },
  "PLyuRouwmQCjne87u8XUdOM5oCl7vI2vVL": {
    "linktitle": "Learning Express JS",
    "title": "Learning Express JS",
    "videoCount": "13",
    "category": "code"
  },
  "PLyuRouwmQCjmQTKvgqIgah03HF1wrYkA9": {
    "linktitle": "JavaScript in the Browser",
    "title": "JavaScript in the Browser",
    "videoCount": "190",
    "category": "code"
  },
  "PLyuRouwmQCjkWu63mHksI9EA4fN-vwGs7": {
    "linktitle": "JavaScript AJAX with fetch",
    "title": "JavaScript AJAX with fetch",
    "videoCount": "47",
    "category": "code"
  },
  "PLyuRouwmQCjn-qjhte3RqlpjkcdvYZykP": {
    "linktitle": "ES6 and Beyond",
    "title": "ES6 and Beyond",
    "videoCount": "53",
    "category": "code"
  },
  "PLyuRouwmQCjl4wTSNbb8RTKZuyMhoIxBe": {
    "linktitle": "Learning CSS",
    "title": "Learning CSS",
    "videoCount": "111",
    "category": "code"
  },
  "PLyuRouwmQCjlBGMxI_0Ly_Dw-vrniOYNh": {
    "linktitle": "HTML5 APIs",
    "title": "HTML5 APIs",
    "videoCount": "28",
    "category": "code"
  },
  "PLyuRouwmQCjlxyO-45o53YCWjBCM-fA7L": {
    "linktitle": "Learning GitHub",
    "title": "Learning GitHub",
    "videoCount": "18",
    "category": "code"
  },
  "PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc": {
    "linktitle": "Python OOP Tutorials - Working with Classes",
    "title": "Working with Classes",
    "videoCount": "6",
    "category": "code"
  },
  "PL-osiE80TeTucQUM10Ezv4S7SVoFozLMK": {
    "linktitle": "JavaScript Tutorials",
    "title": "JavaScript Tutorials",
    "videoCount": "8",
    "category": "code"
  },
  "PL9NnnYq7Myj2rVYgabZ-axi7r26AsAKJN": {
    "linktitle": "三國演義 [廣東話] 全集完",
    "title": "三國演義 [廣東話]",
    "videoCount": "157",
    "category": "book"
  },
  "PLn6BqP6RXzAMVa2DgAgTjXwUtzobXpcKT": {
    "linktitle": "Favourite Old HK Drama Songs",
    "title": "Favourite Old TVB Drama Songs",
    "videoCount": "36",
    "category": "album"
  },
  "a4Rd36Mgf10": {
    "linktitle": "山口百恵 - さよならの向う側 / 張國榮 - 風繼續吹",
    "title": "山口百恵 - さよならの向う側 / 張國榮 - 風繼續吹",
    "videoCount": "1",
    "category": "song"
  },
  "OLAK5uy_njHTOnoK_aQOAa3XvnvmzZ76n8cBIJquI": {
    "linktitle": "The Beatles - Back In The U.S.S.R. (2018 Mix / Lyric Video)",
    "title": "Back In The U.S.S.R",
    "videoCount": "1",
    "category": "song"
  },
  "USdM7Mxy1U4": {
    "linktitle": "The Beatles - A Hard Day's Night Full Album",
    "title": "The Beatles - A Hard Day's Night",
    "videoCount": "1",
    "category": "album"
  },
  "PLkLimRXN6NKygvESCW_WHDRJLfm2VT01Q": {
    "linktitle": "Drive My Car (Remastered 2009)",
    "title": "The Beatles - Rubber Soul",
    "videoCount": "14",
    "category": "album"
  },
  "8LhkyyCvUHk": {
    "linktitle": "Shocking Blue - Venus (Video)",
    "title": "Shocking Blue - Venus ",
    "videoCount": "1",
    "category": "song"
  },
  "Cv6tuzHUuuk": {
    "linktitle": "The Bangles - Walk Like an Egyptian (Video Version)",
    "title": "The Bangles - Walk Like an Egyptian",
    "videoCount": "1",
    "category": "song"
  },
  "PSoOFn3wQV4": {
    "linktitle": "The Bangles - Eternal Flame",
    "title": "The Bangles - Eternal Flame",
    "videoCount": "1",
    "category": "song"
  },
  "PLq6JrsCpb3OWK4ikMS0JtZJNKeVLCgwJ_": {
    "linktitle": "Colonel Sun Audiobook (Chapters 1-21) [Book #15]",
    "title": "Colonel Sun",
    "videoCount": "21",
    "category": "book"
  },
  "PLq6JrsCpb3OUQY8p0BoCODUcqEWu484ZN": {
    "linktitle": "The Man with the Golden Gun Audiobook (Chapters 1-17) [Book #13 {#14 Chronologically}]",
    "title": "The Man with the Golden Gun",
    "videoCount": "17",
    "category": "book"
  },
  "PLq6JrsCpb3OXtS7iU6YSURSmhu3Vsh1Fr": {
    "linktitle": "On Her Majesty's Secret Service Audiobook (Chapters 1-27) [Book #11 {#12 Chronologically}]",
    "title": "On Her Majesty's Secret Service",
    "videoCount": "27",
    "category": "book"
  },
  "PLq6JrsCpb3OXvXaUQMGPtLndYQEntHEbw": {
    "linktitle": "The Spy Who Loved Me Audiobook (Chapters 1-15) [Book #10 {#11 Chronologically}]",
    "title": "The Spy Who Loved Me",
    "videoCount": "15",
    "category": "book"
  },
  "PLq6JrsCpb3OUuPifhOPlWwwuBwnS7419x": {
    "linktitle": "Octopussy Audiobook (Four Short Stories + Bonus Interview) [Book #14 {#10 Chronologically}]",
    "title": "Octopussy",
    "videoCount": "5",
    "category": "book"
  },
  "PLq6JrsCpb3OUhqLmKl6sA2ZCCpfXUoxVa": {
    "linktitle": "Thunderball Audiobook (Chapters 1-24) [Book #9]",
    "title": "Thunderball",
    "videoCount": "24",
    "category": "book"
  },
  "PLq6JrsCpb3OWNFqysQaKfy615ikp0TPYU": {
    "linktitle": "For Your Eyes Only Audiobook (Five Short Stories) [Book #8]",
    "title": "For Your Eyes Only",
    "videoCount": "5",
    "category": "book"
  },
  "PLq6JrsCpb3OVw4IZgwjGC_fgT9xQTb6tz": {
    "linktitle": "Goldfinger Audiobook (Chapters 1-23) [Book #7]",
    "title": "Goldfinger",
    "videoCount": "23",
    "category": "book"
  },
  "PLq6JrsCpb3OWjIQMQyVUYJQaYmtKqojPO": {
    "linktitle": "Dr. No Audiobook (Chapters 1-20) [Book #6]",
    "title": "Dr. No",
    "videoCount": "20",
    "category": "book"
  },
  "PLq6JrsCpb3OX3varu75bmnEmkX0MHzG_j": {
    "linktitle": "From Russia with Love Audiobook (Chapters 1-28) [Book #5]",
    "title": "From Russia with Love",
    "videoCount": "28",
    "category": "book"
  },
  "PLq6JrsCpb3OU9ZlwKfaLGhB4WPUAQ7NQJ": {
    "linktitle": "Diamonds Are Forever Audiobook (Chapters 1-25) [Book #4]",
    "title": "Diamonds Are Forever",
    "videoCount": "25",
    "category": "book"
  },
  "PLq6JrsCpb3OXMbjb0-U3xxoKwUsu8po9L": {
    "linktitle": "Moonraker Audiobook (Chapters 1-25) [Book #3]",
    "title": "Moonraker",
    "videoCount": "25",
    "category": "book"
  },
  "PLq6JrsCpb3OXzHsR3a3jzGKA4eNfhXJUr": {
    "linktitle": "Live and Let Die Audiobook (Chapters 1-23) [Book #2]",
    "title": "Live and Let Die",
    "videoCount": "23",
    "category": "book"
  },
  "PLq6JrsCpb3OV-G6IyQebu9tSBrw-gbStW": {
    "linktitle": "Casino Royale Audiobook - Chapter 1- The Secret Agent [Book #1]",
    "title": "Casino Royale",
    "videoCount": "27",
    "category": "book"
  },
  "PL76MoB89vfkkpMmoOw7v95mdVQmw9aOEA": {
    "linktitle": "BBC DETECTIVE RADIO PLAYS",
    "title": "BBC DETECTIVE RADIO PLAYS",
    "videoCount": "200",
    "category": "radio"
  },
  "PL76MoB89vfklC0mrVeAWyjZpzgeGXH0Jn": {
    "linktitle": "BBC RADIO DRAMA MYSTERY ESPIONAGE SUSPENSE",
    "title": "BBC RADIO DRAMA MYSTERY ESPIONAGE SUSPENSE",
    "videoCount": "165",
    "category": "radio"
  },
  "PL76MoB89vfklNpbQl7uQ5xgw7ZDP15zP5": {
    "linktitle": "RADIO DRAMA HORROR AND SUPERNATURAL, SOME BBC",
    "title": "RADIO DRAMA HORROR AND SUPERNATURAL, SOME BBC",
    "videoCount": "393",
    "category": "radio"
  },
  "PL76MoB89vfkkaBqmqZQ948_Z34e2B5K7J": {
    "linktitle": "BBC RADIO SCI-FI DRAMA",
    "title": "BBC RADIO SCI-FI DRAMA",
    "videoCount": "221",
    "category": "radio"
  },
  "DGDJH6GA_bM": {
    "linktitle": "The Theory of Everything: Origin and Fate of the Universe - Stephen Hawking - Unabridged Audiobook",
    "title": "Origin and Fate of the Universe - Stephen Hawking",
    "videoCount": "1",
    "category": "book"
  },
  "08083BNaYcA": {
    "linktitle": "Gerry and The Pacemakers - Ferry Cross The Mersey (1965)",
    "title": "Gerry and The Pacemakers - Ferry Cross The Mersey (1965)",
    "videoCount": "1",
    "category": "song"
  },
  "PT5OmavfOWg": {
    "linktitle": "Το Sir With Love - Lulu (Lyrics)",
    "title": "Το Sir With Love - Lulu (Lyrics)",
    "videoCount": "1",
    "category": "song"
  },
  "pTjQgkHzbTk": {
    "linktitle": "Ray Peterson - Tell Laura I Love Her (RCA 1960)",
    "title": "Ray Peterson - Tell Laura I Love Her (RCA 1960)",
    "videoCount": "1",
    "category": "song"
  },
  "F4FbISbQGHs": {
    "linktitle": "Greenfields (1960) - THE BROTHERS FOUR - Lyrics",
    "title": "Greenfields (1960) - THE BROTHERS FOUR - Lyrics",
    "videoCount": "1",
    "category": "song"
  },
  "aN85vc8DMWQ": {
    "linktitle": "Sealed With A Kiss ( 1962 ) - BRIAN HYLAND - Lyrics",
    "title": "Sealed With A Kiss ( 1962 ) - BRIAN HYLAND - Lyrics",
    "videoCount": "1",
    "category": "song"
  },
  "pt57gA1_W7c": {
    "linktitle": "Rhythm Of The Rain - THE CASCADES - With lyrics",
    "title": "Rhythm Of The Rain - THE CASCADES - With lyrics",
    "videoCount": "1",
    "category": "song"
  },
  "zdR9KGCjb0w": {
    "linktitle": "葛蘭 - 說不出的快活 電影《野玫瑰之戀》Ja Jambo [GeLan / Grace Chang]",
    "title": "葛蘭 - 說不出的快活",
    "videoCount": "1",
    "category": "song"
  },
  "qeRWmBwrA_k": {
    "linktitle": "鄧寄塵墨西哥女郎",
    "title": "鄧寄塵墨西哥女郎",
    "videoCount": "1",
    "category": "song"
  },
  "1gwJCJ1TD50": {
    "linktitle": "'Animal Farm' by George Orwell (Full Audiobook)",
    "title": "Animal Farm by George Orwel",
    "videoCount": "1",
    "category": "book"
  },
  "dGrV6gOZ2TY": {
    "linktitle": "Heart - Dog and Butterfly",
    "title": "Heart - Dog and Butterfly",
    "videoCount": "1",
    "category": "song"
  },
  "8L1UngfqojI": {
    "linktitle": "Judy Collins - Both Sides Now (Official Audio)",
    "title": "Judy Collins - Both Sides Now",
    "videoCount": "1",
    "category": "song"
  },
  "k2eMHqS7lTU": {
    "linktitle": "Evita- Don't Cry For me Argentina",
    "title": "Evita- Don't Cry For me Argentina",
    "videoCount": "1",
    "category": "song"
  },
  "-tPcc1ftj8E": {
    "linktitle": "Terry Jacks - Seasons In The Sun (Official Audio)",
    "title": "Terry Jacks - Seasons In The Sun",
    "videoCount": "1",
    "category": "song"
  },
  "xvqeSJlgaNk": {
    "linktitle": "The Monkees - Daydream Believer (Official Music Video)",
    "title": "The Monkees - Daydream Believer",
    "videoCount": "1",
    "category": "song"
  },
  "Tdx6lLvvRyg": {
    "linktitle": "Peter and Gordon - A World Without Love (HD) 1964",
    "title": "Peter and Gordon - A World Without Love",
    "videoCount": "1",
    "category": "song"
  },
  "GpDoZZBkHTw": {
    "linktitle": "Kate Bush-Wuthering heights",
    "title": "Kate Bush-Wuthering heights",
    "videoCount": "1",
    "category": "song"
  },
  "R6nURYc5gsc": {
    "linktitle": "England Dan ,John Ford Coley - I'd Really Love To See You Tonight (Lyrics)",
    "title": "I'd Really Love To See You Tonight (Lyrics)",
    "videoCount": "1",
    "category": "song"
  },
  "80rHyABCb20": {
    "linktitle": "Elton John- Candle In The Wind. with lyrics",
    "title": "Candle In The Wind. with lyrics",
    "videoCount": "1",
    "category": "song"
  },
  "_X2I9gs39d4": {
    "linktitle": "Zombie - The Cranberries (Lyrics) 🎵",
    "title": "Zombie - The Cranberries",
    "videoCount": "1",
    "category": "song"
  },
  "YNH4sluy1RY": {
    "linktitle": "The Fruit is Ripe",
    "title": "The Fruit is Ripe",
    "videoCount": "1",
    "category": "song"
  },
  "4-43lLKaqBQ": {
    "linktitle": "The Animals - House of the Rising Sun (1964) HQ/Widescreen ♫♥ 56 YEARS AGO",
    "title": " The Animals - House of the Rising Sun",
    "videoCount": "1",
    "category": "song"
  },
  "LAX5GgvS-8s": {
    "linktitle": "San Francisco (Be Sure to Wear Flowers In Your Hair)",
    "title": " San Francisco",
    "videoCount": "1",
    "category": "song"
  },
  "JywK_5bT8z0": {
    "linktitle": "Sugar Sugar - The Archies (Lyrics)",
    "title": " Sugar Sugar - The Archies (Lyrics)",
    "videoCount": "1",
    "category": "song"
  },
  "rR8hCFfvZPk": {
    "linktitle": "Olivia Newton-John - Let Me Be There",
    "title": "Olivia Newton-John - Let Me Be There",
    "videoCount": "1",
    "category": "song"
  },
  "roxohOzFz3E": {
    "linktitle": "Rose Garden",
    "title": "Rose Garden",
    "videoCount": "1",
    "category": "song"
  },
  "eG-SwNe3j5s": {
    "linktitle": "Jambalaya (On The Bayou) - Marceau Camille",
    "title": "Jambalaya (On The Bayou) - Marceau Camille",
    "videoCount": "1",
    "category": "song"
  },
  "M3jBiwgMx9g": {
    "linktitle": "夏韶聲【交叉點 1985】(歌詞MV)(HD)(填詞：鄭國江)(Danny Summer)",
    "title": "夏韶聲【交叉點 1985】",
    "videoCount": "1",
    "category": "song"
  },
  "_rFVa25T29U": {
    "linktitle": "每當變幻時(1977年)-薰妮FANNY.flv",
    "title": "每當變幻時(1977年)-薰妮",
    "videoCount": "1",
    "category": "song"
  },
  "ol8OZ7CFy2c": {
    "linktitle": "流星蝴蝶劍主题曲 1978-佳藝電視",
    "title": "流星蝴蝶劍主题曲 1978",
    "videoCount": "1",
    "category": "song"
  },
  "RdvhRCVSy-g": {
    "linktitle": "蝶變 1979 詞.盧國沾 曲.顧嘉煇 唱.林子祥 The Butterfly Murders 導演.徐克",
    "title": "蝶變 1979 詞.盧國沾 曲.顧嘉煇 唱.林子祥",
    "videoCount": "1",
    "category": "song"
  },
  "Uv6-eYc486E": {
    "linktitle": "葉振棠 - 大俠霍元甲 (1981麗的電視劇「大俠霍元甲」主題曲)",
    "title": "葉振棠 - 大俠霍元甲",
    "videoCount": "1",
    "category": "song"
  },
  "IBwwPypWANM": {
    "linktitle": "天蠶變 1979 麗的電視劇 詞盧國沾 曲黎小田 唱關正傑",
    "title": "天蠶變",
    "videoCount": "1",
    "category": "song"
  },
  "ISxZHxeFEWg": {
    "linktitle": "換到千般恨 1979 天蠶變 插曲 詞盧國沾 曲黎小田 唱柳影虹 (想聽關菊英版 請到下面連結)",
    "title": "換到千般恨　詞盧國沾 曲黎小田 唱柳影虹",
    "videoCount": "1",
    "category": "song"
  },
  "eZ4_CyBkY5k": {
    "linktitle": "決戰前夕 - 鄭少秋（陸小鳳之決戰前後插曲 ）",
    "title": "決戰前夕 - 鄭少秋",
    "videoCount": "1",
    "category": "song"
  },
  "OvnEr5GN-v0": {
    "linktitle": "忘盡心中情 (1982年電視劇《蘇乞兒》主題曲)",
    "title": "忘盡心中情",
    "videoCount": "1",
    "category": "song"
  },
  "H_UBFD5DiHE": {
    "linktitle": "(全附歌詞) 林夕填詞金曲60首 (PART 3), 這些歌詞有感動過您嗎?",
    "title": "林夕詞 - 林夕填詞金曲60首第三​輯",
    "videoCount": "1",
    "category": "album"
  },
  "PLIj4BzSwQ-_vuHKAr64vPbDQpE0-iQGGZ": {
    "linktitle": "《红楼梦》（87版）第1集 林黛玉别父进京都（主演： 陈晓旭、欧阳奋强、张莉、邓婕、高宏亮、郭霄珍 ）| CCTV电视剧",
    "title": "紅樓夢 1987",
    "videoCount": "36",
    "category": "drama"
  },
  "t2S1nmxYmUg": {
    "linktitle": "Olivia Newton-John - Have You Never Been Mellow",
    "title": "Have You Never Been Mellow",
    "videoCount": "1",
    "category": "song"
  },
  "AMBdmszrDCo": {
    "linktitle": "At Seventeen (Remastered)",
    "title": "At Seventeen (Remastered)",
    "videoCount": "1",
    "category": "song"
  },
  "w1F5BLLFAeM": {
    "linktitle": "Mary MacGregor - Torn Between Two Lovers",
    "title": "Torn Between Two Lovers",
    "videoCount": "1",
    "category": "song"
  },
  "arpidGq8SlA": {
    "linktitle": "Dizzy - Tommy Roe (1969)",
    "title": "Dizzy - Tommy Roe (1969)",
    "videoCount": "1",
    "category": "song"
  },
  "BuTTO-w60x4": {
    "linktitle": "周聰.詞《仙鶴神針》華娃 + 呂珊.重唱版 吳大江.曲 (歌.77佳視 .片1961仙鶴神針) 想聽佳視版 請到下面連結",
    "title": "《仙鶴神針》華娃 + 呂珊.重唱版",
    "videoCount": "1",
    "category": "song"
  },
  "-W2b4YUz6DA": {
    "linktitle": "隋唐風雲 1976 佳視劇集.主題曲 詞+曲.黃霑 唱.張武孝 和唱.關正傑+黎小田+黄愷欣",
    "title": "隋唐風雲 1976 佳視劇集.主題曲",
    "videoCount": "1",
    "category": "song"
  },
  "Blx9lHMivQs": {
    "linktitle": "Bertie Higgins - Casablanca (Lyrics)",
    "title": "Casablanca (Lyrics)",
    "videoCount": "1",
    "category": "song"
  },
  "V08tc-pBx9Y": {
    "linktitle": "Top of The World-The Carpenters (Lyrics)",
    "title": "Top of The World-The Carpenters (Lyrics)",
    "videoCount": "1",
    "category": "song"
  },
  "7-RlLFxgCkk": {
    "linktitle": "Tie a yellow ribbon 'round the ole oak tree Lyrics Fixed",
    "title": "Tie a yellow ribbon 'round the ole oak tree Lyrics",
    "videoCount": "1",
    "category": "song"
  },
  "DkytJLoxGmQ": {
    "linktitle": "Doobie Brothers - Listen To The Music • TopPop",
    "title": "Doobie Brothers - Listen To The Music",
    "videoCount": "1",
    "category": "song"
  },
  "xTeI65yrhGw": {
    "linktitle": "\"REFLECTIONS OF MY LIFE\" THE MARMALADE ~ 1969 - original recording ~ HQ AUDIO",
    "title": "REFLECTIONS OF MY LIFE",
    "videoCount": "1",
    "category": "song"
  },
  "wy709iNG6i8": {
    "linktitle": "Goodbye Yellow Brick Road (Remastered 2014)",
    "title": "Goodbye Yellow Brick Road (Remastered 2014)",
    "videoCount": "1",
    "category": "song"
  },
  "aVLBF-UKevY": {
    "linktitle": "Angie",
    "title": "Angie",
    "videoCount": "1",
    "category": "song"
  },
  "7rXhXLsNJL8": {
    "linktitle": "Love potion number 9, The Searchers",
    "title": "Love potion number 9",
    "videoCount": "1",
    "category": "song"
  },
  "Gpc-gVqIAoc": {
    "linktitle": "No Milk Today",
    "title": "No Milk Today",
    "videoCount": "1",
    "category": "song"
  },
  "_CcdzkSlw2s": {
    "linktitle": "Black Is Black",
    "title": "Black Is Black",
    "videoCount": "1",
    "category": "song"
  },
  "x8G4xrYfWmw": {
    "linktitle": "She's A Lady",
    "title": "She's A Lady",
    "videoCount": "1",
    "category": "song"
  },
  "gxEPV4kolz0": {
    "linktitle": "Billy Joel - Piano Man (Official Music Video)",
    "title": "Billy Joel - Piano Man (Official Music Video)",
    "videoCount": "1",
    "category": "song"
  },
  "Nb13I34J8K4": {
    "linktitle": "Chicago - 25 or 6 to 4 Lyrics",
    "title": "Chicago - 25 or 6 to 4 Lyrics",
    "videoCount": "1",
    "category": "song"
  },
  "Bo-qweh7nbQ": {
    "linktitle": "Blue Swede - Hooked On A Feeling",
    "title": "Blue Swede - Hooked On A Feeling",
    "videoCount": "1",
    "category": "song"
  },
  "Qr5DgNbkIbY": {
    "linktitle": "Barry Blue - Dancin' (On A Saturday Night)",
    "title": "Barry Blue - Dancin' (On A Saturday Night)",
    "videoCount": "1",
    "category": "song"
  },
  "S9tKwSboJeg": {
    "linktitle": "Bon Jovi - You give love a bad name - lyrics",
    "title": "Bon Jovi - You give love a bad name - lyrics",
    "videoCount": "1",
    "category": "song"
  },
  "nt5uNQ3FXRI": {
    "linktitle": "Knock Three Times",
    "title": "Knock Three Times",
    "videoCount": "1",
    "category": "song"
  },
  "nXl5P2xO9-o": {
    "linktitle": "Get Down - Gilbert O'Sullivan",
    "title": "Get Down - Gilbert O'Sullivan",
    "videoCount": "1",
    "category": "song"
  },
  "RjlvdcBAKdg": {
    "linktitle": "Band On The Run (Remastered 2010)",
    "title": "Band On The Run (Remastered 2010)",
    "videoCount": "1",
    "category": "song"
  },
  "9CxNbhOzXvg": {
    "linktitle": "Mull Of Kintyre (1993 Digital Remaster)",
    "title": "Mull Of Kintyre (1993 Digital Remaster)",
    "videoCount": "1",
    "category": "song"
  },
  "kXc5Oe_kj8k": {
    "linktitle": "Those Were The Days (Remastered)",
    "title": "Those Were The Days (Remastered)",
    "videoCount": "1",
    "category": "song"
  },
  "PC2HkP5gR2g": {
    "linktitle": "I'm Not In Love",
    "title": "I'm Not In Love",
    "videoCount": "1",
    "category": "song"
  },
  "txDMiD8ia50": {
    "linktitle": "Father And Son",
    "title": "Father And Son",
    "videoCount": "1",
    "category": "song"
  },
  "X3IA6pIVank": {
    "linktitle": "Heart of Gold (2009 Remaster)",
    "title": "Heart of Gold (2009 Remaster)",
    "videoCount": "1",
    "category": "song"
  },
  "sh7Ecvmk-Uo": {
    "linktitle": "เพลง ซันชิโร่ 「姿三四郎」主题歌 ～決闘・右京ケ原・姿憲子」",
    "title": "「姿三四郎」主题歌",
    "videoCount": "1",
    "category": "song"
  },
  "TqxjuZ4l0Zg": {
    "linktitle": "天涯孤客 日文原曲 子連れ狼 (日劇 帶子雄狼 孤狼) 曲吉田正 詞小池一雄(小池一夫Kazuo Koike) 唱橋幸夫 (想看中譯字幕MV 請到下面連結)",
    "title": "天涯孤客 日文原曲 子連れ狼",
    "videoCount": "1",
    "category": "song"
  },
  "hxbLu23hyAs": {
    "linktitle": "幾多愁 【虞美人】 鄧麗君",
    "title": "幾多愁 【虞美人】 鄧麗君",
    "videoCount": "1",
    "category": "song"
  },
  "qKaqdPAmfck": {
    "linktitle": "玉置浩二 Friend - 情書",
    "title": "玉置浩二 Friend - 情書",
    "videoCount": "1",
    "category": "song"
  },
  "_pQWL5xoI8g": {
    "linktitle": "崔萍 - 南屏晚鐘 1958",
    "title": "崔萍 - 南屏晚鐘 1958",
    "videoCount": "1",
    "category": "song"
  },
  "u6XMAIOvJgQ": {
    "linktitle": "葛蘭 - 我愛恰恰 電影《曼波女郎》[GeLan / Grace Chang] Mambo Girl",
    "title": "葛蘭 - 我愛恰恰",
    "videoCount": "1",
    "category": "song"
  },
  "wqI4h1uODng": {
    "linktitle": "葛蘭 - 卡門 王天林電影《野玫瑰之戀》Carmen [GeLan / Grace Chang]",
    "title": "葛蘭 - 卡門",
    "videoCount": "1",
    "category": "song"
  },
  "XJfFYbZn_P8": {
    "linktitle": "蘇芮-酒干倘賣無《搭錯車》(1983年) 原裝MV",
    "title": "蘇芮-酒干倘賣無",
    "videoCount": "1",
    "category": "song"
  },
  "DPGe3qlOzJk": {
    "linktitle": "阿信的故事 廣東版主題曲 翁倩玉",
    "title": "阿信的故事 廣東版主題曲 翁倩玉",
    "videoCount": "1",
    "category": "song"
  },
  "5UzDRlC-UKQ": {
    "linktitle": "楊凡電影《流金歲月》主題曲 － 甄妮",
    "title": "《流金歲月》主題曲 － 甄妮",
    "videoCount": "1",
    "category": "song"
  },
  "BkAtS_S0d-I": {
    "linktitle": "別了秋天 (1987年電影《秋天的童話》主題曲)",
    "title": "別了秋天 (1987年電影《秋天的童話》主題曲)",
    "videoCount": "1",
    "category": "song"
  },
  "tk7MZlMkSrA": {
    "linktitle": "Sally Yip 葉蒨文 黎明不要來",
    "title": "葉蒨文 黎明不要來",
    "videoCount": "1",
    "category": "song"
  },
  "tZZPMArl8-M": {
    "linktitle": "[經典 MV] 1986年 - 羅文 (幾許風雨)",
    "title": "1986年 - 羅文 (幾許風雨)",
    "videoCount": "1",
    "category": "song"
  },
  "bkBil0eCMiA": {
    "linktitle": "[搬運]難為正邪定分界《飛越十八層》主題曲（流畅）",
    "title": "難為正邪定分界《飛越十八層》主題曲",
    "videoCount": "1",
    "category": "song"
  },
  "wJLPsV291d0": {
    "linktitle": "三人行 - 林子祥/劉天蘭/詩詩 MV",
    "title": "三人行 - 林子祥/劉天蘭/詩詩",
    "videoCount": "1",
    "category": "song"
  },
  "uLRiGX3L-kw": {
    "linktitle": "The Beatles - Lady Madonna",
    "title": "The Beatles - Lady Madonna",
    "videoCount": "1",
    "category": "song"
  },
  "L6svOHFSAH8": {
    "linktitle": "John Lennon - Imagine - Lyrics",
    "title": "John Lennon - Imagine - Lyrics",
    "videoCount": "1",
    "category": "song"
  },
  "UxL87Tfy7XY": {
    "linktitle": "I saw her standing there - The Beatles (LYRICS/LETRA) [Original]",
    "title": "I saw her standing there - The Beatles",
    "videoCount": "1",
    "category": "song"
  },
  "4NO-h9PFum4": {
    "linktitle": "Steps - 5, 6, 7, 8 (Official Video)",
    "title": "Steps - 5, 6, 7, 8",
    "videoCount": "1",
    "category": "song"
  },
  "qs1bbJFLLN8": {
    "linktitle": "Los del Río \"Macarena\"",
    "title": "Los del Río \"Macarena\"",
    "videoCount": "1",
    "category": "song"
  },
  "l2UiY2wivTs": {
    "linktitle": "Lemon Tree - Fools Garden (Lyrics) 🎵",
    "title": "Lemon Tree - Fools Garden",
    "videoCount": "1",
    "category": "song"
  },
  "CS9OO0S5w2k": {
    "linktitle": "Village People - YMCA OFFICIAL Music Video 1978",
    "title": "Village People - YMCA",
    "videoCount": "1",
    "category": "song"
  },
  "m9We2XsVZfc": {
    "linktitle": "Original GhostBusters Theme Song",
    "title": "GhostBusters Theme Song",
    "videoCount": "1",
    "category": "song"
  },
  "bT7Hj-ea0VE": {
    "linktitle": "Bob Dylan - All Along the Watchtower (Audio)",
    "title": "Bob Dylan - All Along the Watchtower",
    "videoCount": "1",
    "category": "song"
  },
  "pfw20G0nU2o": {
    "linktitle": "Time of the Season",
    "title": "Time of the Season",
    "videoCount": "1",
    "category": "song"
  },
  "BN5Z28Dfl7o": {
    "linktitle": "Another Brick in the wall with lyrics",
    "title": "Another Brick in the wall with lyrics",
    "videoCount": "1",
    "category": "song"
  },
  "axAtWjn3MfI": {
    "linktitle": "Queen - Bohemian Rhapsody (with lyrics)",
    "title": "Queen - Bohemian Rhapsody",
    "videoCount": "1",
    "category": "song"
  },
  "oU6uUEwZ8FM": {
    "linktitle": "California Dreamin'",
    "title": "California Dreaming",
    "videoCount": "1",
    "category": "song"
  },
  "811QZGDysx0": {
    "linktitle": "Hotel California (2013 Remaster)",
    "title": "Hotel California (2013 Remaster)",
    "videoCount": "1",
    "category": "song"
  },
  "QkF3oxziUI4": {
    "linktitle": "Led Zeppelin - Stairway To Heaven (Official Audio)",
    "title": "Led Zeppelin - Stairway To Heaven",
    "videoCount": "1",
    "category": "song"
  },
  "cF3OWCYLLVQ": {
    "linktitle": "Sultans Of Swing",
    "title": "Sultans Of Swing",
    "videoCount": "1",
    "category": "song"
  },
  "OMOGaugKpzs": {
    "linktitle": "The Police - Every Breath You Take (Official Video)",
    "title": "The Police - Every Breath You Take",
    "videoCount": "1",
    "category": "song"
  },
  "m2uTFF_3MaA": {
    "linktitle": "The Beatles - Yellow Submarine",
    "title": "The Beatles - Yellow Submarine",
    "videoCount": "1",
    "category": "song"
  },
  "BGLGzRXY5Bw": {
    "linktitle": "The Beatles - Revolution",
    "title": "The Beatles - Revolution",
    "videoCount": "1",
    "category": "song"
  },
  "usNsCeOV4GM": {
    "linktitle": "The Beatles - A Day In The Life",
    "title": "The Beatles - A Day In The Life",
    "videoCount": "1",
    "category": "song"
  },
  "tY8B0uQpwZs": {
    "linktitle": "Steve Miller Band - Abracadabra",
    "title": "Steve Miller Band - Abracadabra",
    "videoCount": "1",
    "category": "song"
  },
  "wvUQcnfwUUM": {
    "linktitle": "Mungo Jerry - In The Summertime ORIGINAL 1970",
    "title": "Mungo Jerry - In The Summertime",
    "videoCount": "1",
    "category": "song"
  },
  "oPK7ZF6jfJE": {
    "linktitle": "The Fifth Dimension - Aquarius - Let The Sunshine In - Bubblerock Promo",
    "title": "Aquarius - Let The Sunshine In",
    "videoCount": "1",
    "category": "song"
  },
  "eKpVQm41f8Y": {
    "linktitle": "Little Eva - Loco-motion(1962)",
    "title": "Little Eva - Loco-motion(1962)",
    "videoCount": "1",
    "category": "song"
  },
  "5Ge8_6rtQvs": {
    "linktitle": "The Shangri-Las - Leader of the Pack (1964) Stereo HQ Audio",
    "title": "Leader of the Pack (1964)",
    "videoCount": "1",
    "category": "song"
  },
  "kKlzUKLOm_U": {
    "linktitle": "Chuck Berry - Roll Over Beethoven (1956)",
    "title": "Chuck Berry - Roll Over Beethoven (1956)",
    "videoCount": "1",
    "category": "song"
  },
  "E68N5E1d0_M": {
    "linktitle": "Long Tall Sally",
    "title": "Long Tall Sally",
    "videoCount": "1",
    "category": "song"
  },
  "LSC0hn08ggs": {
    "linktitle": "Don't Be Cruel",
    "title": "Don't Be Cruel",
    "videoCount": "1",
    "category": "song"
  },
  "9XVdtX7uSnk": {
    "linktitle": "Elvis Presley -  (Official Audio)",
    "title": "Are You Lonesome Tonight?",
    "videoCount": "1",
    "category": "song"
  },
  "YC0BPcLea0Y": {
    "linktitle": "Love Me Tender",
    "title": "Love Me Tender",
    "videoCount": "1",
    "category": "song"
  },
  "X02t8vKLtbw": {
    "linktitle": "Elvis Presley - Wooden Heart (Audio)",
    "title": "Wooden Heart",
    "videoCount": "1",
    "category": "song"
  },
  "rgsKm8Ib8No": {
    "linktitle": "It's Now or Never",
    "title": "It's Now or Never",
    "videoCount": "1",
    "category": "song"
  },
  "Qvo5SeAwz88": {
    "linktitle": "Delilah",
    "title": "Delilah",
    "videoCount": "1",
    "category": "song"
  },
  "n56E3kScoN8": {
    "linktitle": "Itsy Bitsy Teenie Weenie Yellow Polka Dot Bikini",
    "title": "Itsy Bitsy Teenie Weenie Yellow Polka Dot Bikini",
    "videoCount": "1",
    "category": "song"
  },
  "i2GuuTNZeMs": {
    "linktitle": "輪流傳 (1980年電視劇《輪流傳》主題曲)",
    "title": "輪流傳",
    "videoCount": "1",
    "category": "song"
  },
  "mxO5ZdJeous": {
    "linktitle": "翡翠劇場 1979 網中人 張德蘭 顧嘉煇曲 鄧偉雄詞",
    "title": "網中人",
    "videoCount": "1",
    "category": "song"
  },
  "lNQ9FE6IF_0": {
    "linktitle": "親情 (1980年無線電視劇《親情》主題曲)",
    "title": "親情",
    "videoCount": "1",
    "category": "song"
  },
  "SsUb2tb0nKE": {
    "linktitle": "風雲 (1980年電視劇《風雲》主題曲)",
    "title": "風雲 1980年電視劇主題曲",
    "videoCount": "1",
    "category": "song"
  },
  "P9zeg1gSlso": {
    "linktitle": "絕代雙驕 (1979年電視劇《絕代雙驕》主題曲)",
    "title": "絕代雙驕",
    "videoCount": "1",
    "category": "song"
  },
  "dfJzSV19vls": {
    "linktitle": "誓要入刀山 (1978年電視劇《陸小鳳之武當之戰》主題曲)",
    "title": "誓要入刀山",
    "videoCount": "1",
    "category": "song"
  },
  "FwP9jNpQ2rg": {
    "linktitle": "翡翠劇埸 1979 抉擇 詞黃霑 曲顧嘉煇 唱林子祥",
    "title": "1979 抉擇",
    "videoCount": "1",
    "category": "song"
  },
  "RVuljNGw-r0": {
    "linktitle": "命運 1980 火鳳凰 詞+曲黃霑 唱甄妮 (顧嘉煇小休進修.黄霑代辦曲和詞)",
    "title": "命運 1980 火鳳凰",
    "videoCount": "1",
    "category": "song"
  },
  "wnGu-qaoZH8": {
    "linktitle": "甄妮 - 奮鬥",
    "title": "甄妮 - 奮鬥",
    "videoCount": "1",
    "category": "song"
  },
  "6puIEIT93zI": {
    "linktitle": "甄妮【東方之珠 1981】(歌詞MV)(1080p)(作曲：顧嘉煇)(填詞：鄭國江)電視劇《前路》主題曲",
    "title": "甄妮【東方之珠 1981】",
    "videoCount": "1",
    "category": "song"
  },
  "Cg-c01vSZDg": {
    "linktitle": "天各一方 ~ 俞琤 曾路得",
    "title": "天各一方 ~ 俞琤 曾路得",
    "videoCount": "1",
    "category": "song"
  },
  "qVm3GdOd2P8": {
    "linktitle": "陳淑樺-滾滾紅塵(官方完整版MV)",
    "title": "陳淑樺-滾滾紅塵",
    "videoCount": "1",
    "category": "song"
  },
  "OAXfkKx1_VI": {
    "linktitle": "徐小鳳 - 隨想曲 (1982)",
    "title": "徐小鳳 - 隨想曲 (1982)",
    "videoCount": "1",
    "category": "song"
  },
  "STn-xzn1634": {
    "linktitle": "優客李林 UKULELE - 認錯 My Fault (官方完整版MV)",
    "title": "優客李林- 認錯",
    "videoCount": "1",
    "category": "song"
  },
  "hm0xK0dp134": {
    "linktitle": "特別的愛給特別的你",
    "title": "特別的愛給特別的你",
    "videoCount": "1",
    "category": "song"
  },
  "67p_MAZUnvE": {
    "linktitle": "趙傳 Chao Chuan【我終於失去了妳 At Last I Have Lost You】Official Music Video",
    "title": "趙傳 我終於失去了妳",
    "videoCount": "1",
    "category": "song"
  },
  "OvHK7H9lZO8": {
    "linktitle": "心酸的情歌...巫啟賢主唱",
    "title": "心酸的情歌",
    "videoCount": "1",
    "category": "song"
  },
  "5hid10EgMXE": {
    "linktitle": "Creedence Clearwater Revival - Proud Mary (Official Lyric Video)",
    "title": "Proud Mary",
    "videoCount": "1",
    "category": "song"
  },
  "dIfQNB5WXmY": {
    "linktitle": "Creedence Clearwater Revival - Lodi (Official Lyric Video)",
    "title": "Lodi",
    "videoCount": "1",
    "category": "song"
  },
  "T9MXNbpXQ3g": {
    "linktitle": "Creedence Clearwater Revival - Who'll Stop The Rain",
    "title": "Who'll Stop The Rain",
    "videoCount": "1",
    "category": "song"
  },
  "SpLMpu2-MXo": {
    "linktitle": "Streets of London with Lyrics",
    "title": "Streets of London",
    "videoCount": "1",
    "category": "song"
  },
  "7bl9bA7A0OM": {
    "linktitle": "沉默是金 MV ( 張國榮 許冠傑 ) [Silence Is Gold] [Im Lặng Là Vàng]",
    "title": "沉默是金 MV ( 張國榮 許冠傑 )",
    "videoCount": "1",
    "category": "song"
  },
  "IOXoAvF6r_A": {
    "linktitle": "Beyond -《長城》Official MV",
    "title": "Beyond -《長城》",
    "videoCount": "1",
    "category": "song"
  },
  "XcATvu5f9vE": {
    "linktitle": "Robert Palmer - Addicted To Love (Official Music Video)",
    "title": "Addicted To Love",
    "videoCount": "1",
    "category": "song"
  },
  "BqDjMZKf-wg": {
    "linktitle": "J. Geils Band - Centerfold (Official Music Video)",
    "title": "J. Geils Band - Centerfold ",
    "videoCount": "1",
    "category": "song"
  },
  "SwYN7mTi6HM": {
    "linktitle": "Van Halen - Jump (Official Music Video)",
    "title": "Van Halen - Jump",
    "videoCount": "1",
    "category": "song"
  },
  "NCtzkaL2t_Y": {
    "linktitle": "The Beatles - Don't Let Me Down",
    "title": "The Beatles - Don't Let Me Down",
    "videoCount": "1",
    "category": "song"
  },
  "T38v3-SSGcM": {
    "linktitle": "Chuck Berry - Johnny B Goode (1959)",
    "title": "Johnny Be Good",
    "videoCount": "1",
    "category": "song"
  },
  "WrAV5EVI4tU": {
    "linktitle": "The Beatles - I Feel Fine",
    "title": "The Beatles - I Feel Fine",
    "videoCount": "1",
    "category": "song"
  },
  "rblYSKz_VnI": {
    "linktitle": "The Beatles - Hello, Goodbye",
    "title": "The Beatles - Hello, Goodbye",
    "videoCount": "1",
    "category": "song"
  },
  "f03wFd2cCZg": {
    "linktitle": "只怕不再遇 - 張國榮 & 陳潔靈 | Leslie Cheung ft Elisa Chan",
    "title": "只怕不再遇上 - 張國榮  陳潔靈",
    "videoCount": "1",
    "category": "song"
  },
  "qdFoHjrXcHk": {
    "linktitle": "林子祥 George Lam -《誰能明白我》Official MV (電影 \"貓頭鷹與小飛象\" 主題曲)",
    "title": "林子祥 -《誰能明白我》",
    "videoCount": "1",
    "category": "song"
  },
  "lclGCsc5HkQ": {
    "linktitle": "孫耀威-愛的故事上集 (HD)",
    "title": "孫耀威-愛的故事上集",
    "videoCount": "1",
    "category": "song"
  },
  "vi0DwtOGsBA": {
    "linktitle": "無間道 (粵)－劉德華 / 梁朝偉",
    "title": "無間道 (粵)－劉德華 / 梁朝偉",
    "videoCount": "1",
    "category": "song"
  },
  "eBvarz3DY00": {
    "linktitle": "天梯 C AllStar 原裝MV (1080P HD)",
    "title": "天梯 C AllStar",
    "videoCount": "1",
    "category": "song"
  },
  "IhDKHo2wapM": {
    "linktitle": "Ringo Starr - Photograph",
    "title": "Ringo Starr - Photograph",
    "videoCount": "1",
    "category": "song"
  },
  "HtUH9z_Oey8": {
    "linktitle": "The Beatles - Strawberry Fields Forever",
    "title": "The Beatles - Strawberry Fields Forever",
    "videoCount": "1",
    "category": "song"
  },
  "naoknj1ebqI": {
    "linktitle": "Lucy In The Sky With Diamonds (Remastered 2009)",
    "title": "Lucy In The Sky With Diamonds",
    "videoCount": "1",
    "category": "song"
  },
  "wCCfc2vAuDU": {
    "linktitle": "Creedence Clearwater Revival - I Heard It Through The Grapevine",
    "title": " I Heard It Through The Grapevine",
    "videoCount": "1",
    "category": "song"
  },
  "UelDrZ1aFeY": {
    "linktitle": "The Beatles - Something",
    "title": "The Beatles - Something",
    "videoCount": "1",
    "category": "song"
  },
  "HMAf4Uq9mrs": {
    "linktitle": "The Beatles - Here, There And Everywhere (Subtitulado)",
    "title": "Here, There And Everywhere",
    "videoCount": "1",
    "category": "song"
  },
  "S-rB0pHI9fU": {
    "linktitle": "The Beatles - Penny Lane",
    "title": "The Beatles - Penny Lane",
    "videoCount": "1",
    "category": "song"
  },
  "Qyclqo_AV2M": {
    "linktitle": "The Beatles - We Can Work it Out",
    "title": "The Beatles - We Can Work it Out",
    "videoCount": "1",
    "category": "song"
  },
  "8scSwaKbE64": {
    "linktitle": "Nowhere Man (Remastered 2009)",
    "title": "Nowhere Man",
    "videoCount": "1",
    "category": "song"
  },
  "TSpiwK5fig0": {
    "linktitle": "All My Loving (Remastered 2009)",
    "title": "All My Loving",
    "videoCount": "1",
    "category": "song"
  },
  "-8l3ntDR_lI": {
    "linktitle": "Girl (Remastered 2009)",
    "title": "Girl ",
    "videoCount": "1",
    "category": "song"
  },
  "YBcdt6DsLQA": {
    "linktitle": "In My Life (Remastered 2009)",
    "title": "In My Life ",
    "videoCount": "1",
    "category": "song"
  },
  "wsRatIMUSu8": {
    "linktitle": "The Fool On The Hill (Remastered 2009)",
    "title": "The Fool On The Hill ",
    "videoCount": "1",
    "category": "song"
  },
  "ulnuOSoBD4c": {
    "linktitle": "張德蘭 情義兩心堅 83神雕侠侣插曲 The Return of the Condo Heroes",
    "title": "張德蘭 情義兩心堅",
    "videoCount": "1",
    "category": "song"
  },
  "NqHox44HI7Q": {
    "linktitle": "北国の春/千昌夫 (歌詞翻譯)",
    "title": "北国の春/千昌夫",
    "videoCount": "1",
    "category": "song"
  },
  "fdpVCb9lghQ": {
    "linktitle": "村下孝蔵 初恋 1983 歌詞付",
    "title": "村下孝蔵 初恋",
    "videoCount": "1",
    "category": "song"
  },
  "CL0FrclOWoo": {
    "linktitle": "中村雅俊 俺たちの旅 1975 歌詞付",
    "title": "中村雅俊 俺たちの旅",
    "videoCount": "1",
    "category": "song"
  },
  "5_sbZxO0C1M": {
    "linktitle": "しまざき由理 面影 1975 歌詞付",
    "title": "しまざき由理 面影",
    "videoCount": "1",
    "category": "song"
  },
  "O83CSpcMgqA": {
    "linktitle": "70年代 電影金曲",
    "title": "70年代 電影金曲",
    "videoCount": "1",
    "category": "album"
  },
  "oyaOH8c2fns": {
    "linktitle": "80年代 動感精選",
    "title": "80年代 動感精選",
    "videoCount": "1",
    "category": "album"
  },
  "w6fu-vXzlP8": {
    "linktitle": "蕭孋珠 - 一簾幽夢 【電影音樂原聲带】",
    "title": "蕭孋珠 - 一簾幽夢",
    "videoCount": "1",
    "category": "song"
  },
  "uz46xaGta1I": {
    "linktitle": "黃貫中 Paul - 天與地 (TVB劇集\"天與地\"主題曲) Official Audio",
    "title": "天與地主題曲",
    "videoCount": "1",
    "category": "song"
  },
  "CDOrnLr-y3U": {
    "linktitle": "木村拓哉 松隆子 20週年作品合輯MV 君だったら",
    "title": "木村拓哉 松隆子 君だったら",
    "videoCount": "1",
    "category": "song"
  },
  "0w_ufl1TQRQ": {
    "linktitle": "Love Generation (戀愛世代) - true true (松隆子)",
    "title": "Love Generation  - true true (松隆子)",
    "videoCount": "1",
    "category": "song"
  },
  "b8jn8uUC2LA": {
    "linktitle": "經典歌曲歌詞 - (關正傑)近代豪俠傳 大刀王五",
    "title": "近代豪俠傳",
    "videoCount": "1",
    "category": "song"
  },
  "TkcTKcSvytk": {
    "linktitle": "佛山贊先生.字幕版 1981 曲顧嘉煇 詞鄧偉雄 唱李龍基",
    "title": "佛山贊先生 曲顧嘉煇 詞鄧偉雄 唱李龍基",
    "videoCount": "1",
    "category": "song"
  },
  "NFipo6FH5Lk": {
    "linktitle": "林志美 1982 感情的段落 詞鄭國江 曲周啟生 林志美第一首十大中文金曲",
    "title": "林志美 1982 感情的段落",
    "videoCount": "1",
    "category": "song"
  },
  "PLhr8_ZQ7NvDjIAqSB4YdeL7X82SEvQPH7": {
    "linktitle": "WoW Classic Quests",
    "title": "WoW Classic Quests",
    "videoCount": "1514",
    "category": "game"
  },
  "PLhr8_ZQ7NvDhn_NNcpcIxA3Dl82LMKsbd": {
    "linktitle": "Classic WoW Farm",
    "title": "Classic WoW Farm",
    "videoCount": "42",
    "category": "game"
  },
  "PLhr8_ZQ7NvDgwTrBRaE2CtrkUslXlmh90": {
    "linktitle": "WoW Classic Unsorted",
    "title": "WoW Classic Unsorted",
    "videoCount": "1354",
    "category": "game"
  },
  "PLhr8_ZQ7NvDgyFMnM0K1d9IBat1QxN7Ed": {
    "linktitle": "WoW TBC Unsorted",
    "title": "WoW TBC Unsorted",
    "videoCount": "1264",
    "category": "game"
  },
  "PLhr8_ZQ7NvDi7lLu7iqXgzvDm2JsrEdkx": {
    "linktitle": "Shadowlands Quests",
    "title": "Shadowlands Quests",
    "videoCount": "460",
    "category": "game"
  },
  "PLhr8_ZQ7NvDh6Tkwf1kSBzCy23rD1ze9m": {
    "linktitle": "Shadowlands",
    "title": "Shadowlands",
    "videoCount": "235",
    "category": "game"
  },
  "PLhr8_ZQ7NvDjipgJtUwhpUtQ0jffvM94H": {
    "linktitle": "Shadowlands Rares / Treasures Unsorted",
    "title": "hadowlands Rares / Treasures Unsorted",
    "videoCount": "47",
    "category": "game"
  },
  "PL67NORXHj5EhAWyxuflQZcAFX7gfHW91n": {
    "linktitle": "【紅樓夢】全本廣東話原文照讀",
    "title": "【紅樓夢】全本廣東話原文照讀",
    "videoCount": "14",
    "category": "book"
  },
  "PL67NORXHj5EjVapZD04fz2auStrVwgSMK": {
    "linktitle": "紅學分享(香港)",
    "title": "紅學分享(香港)",
    "videoCount": "7",
    "category": "book"
  },
  "1cval0JWlyc": {
    "linktitle": "YOUR SONG---Elton John (lyrics)",
    "title": "Your Song",
    "videoCount": "1",
    "category": "song"
  },
  "7mHJ0TeHak8": {
    "linktitle": "Daniel",
    "title": "Daniel",
    "videoCount": "1",
    "category": "song"
  },
  "75r0nQu-hMs": {
    "linktitle": "Crocodile Rock",
    "title": "Crocodile Rock",
    "videoCount": "1",
    "category": "song"
  },
  "PLAC9Wfi5XYeCSFFnSquAZkhPkRCNm6PrV": {
    "linktitle": "水青读名著之《红楼梦》有声书",
    "title": "水青读名著之《红楼梦》",
    "videoCount": "120",
    "category": "book"
  },
  "DRaYnlu8LWc": {
    "linktitle": "香港电影中的50首经典歌曲 / 经典粤语歌曲",
    "title": "香港电影50首经典歌曲",
    "videoCount": "1",
    "category": "album"
  },
  "qI1WcylNEuY": {
    "linktitle": "Barbra Streisand - Woman In Love ~ With Lyrics",
    "title": "Woman In Love",
    "videoCount": "1",
    "category": "song"
  },
  "sEd6Wkx_rCI": {
    "linktitle": "Nilsson - Without You(1972)",
    "title": " Without You(1972)",
    "videoCount": "1",
    "category": "song"
  },
  "tE4STGEmIyI": {
    "linktitle": "mandy by barry manilow lyrics",
    "title": " Mandy",
    "videoCount": "1",
    "category": "song"
  },
  "2GOLnWz_Osc": {
    "linktitle": "Tonight I celebrate my love - Peabo Bryson & Roberta Flack (With lyrics) [HQ]",
    "title": " Tonight I celebrate my love",
    "videoCount": "1",
    "category": "song"
  },
  "VhCdbcUXrB8": {
    "linktitle": "AND I LOVE YOU SO - (Lyrics)",
    "title": " And I Love You So",
    "videoCount": "1",
    "category": "song"
  },
  "P02Jzbjrmj0": {
    "linktitle": "Paul anka - I don't like to sleep alone (Lyrics)",
    "title": " I don't like to sleep alone",
    "videoCount": "1",
    "category": "song"
  },
  "A_g7fPjVxvg": {
    "linktitle": "Billy Joel - Piano Man (Lyrics)",
    "title": "Billy Joel - Piano Man",
    "videoCount": "1",
    "category": "song"
  },
  "1H3o1wNjHCE": {
    "linktitle": "Just the way you are - Billy Joel - with lyrics",
    "title": "Just the way you are ",
    "videoCount": "1",
    "category": "song"
  },
  "3sU4EBtQJgk": {
    "linktitle": "霍尊中国风古风歌曲精选18首",
    "title": "霍尊中国风古风歌曲精选18首",
    "videoCount": "1",
    "category": "album"
  },
  "NXsAQtcfOyY": {
    "linktitle": "YOASOBIのベストソング - YOASOBIメドレー - YOASOBIのベストカバー - Best Songs Of YOASOBI,夜に駆ける ,ハルジオン,あの夢をなぞって,ハッピーエンダ",
    "title": "YOASOBIのベストソング",
    "videoCount": "1",
    "category": "album"
  },
  "9_M3uw29U1U": {
    "linktitle": "David Bowie Space Oddity Lyrics",
    "title": "David Bowie Space Oddity",
    "videoCount": "1",
    "category": "song"
  },
  "MYPJOCxSUFc": {
    "linktitle": "Simon & Garfunkel - The Boxer (with lyrics)",
    "title": "The Boxer",
    "videoCount": "1",
    "category": "song"
  },
  "Z13vOA7s0FI": {
    "linktitle": "Don McLean - American Pie (Lyrics)",
    "title": "American Pie",
    "videoCount": "1",
    "category": "song"
  },
  "yfSny4MkS3c": {
    "linktitle": "Simon and Garfunkel - Mrs. Robinson (lyrics)",
    "title": "Mrs. Robinson",
    "videoCount": "1",
    "category": "song"
  },
  "PKY-smJ6aBQ": {
    "linktitle": "I Am a Rock - Simon & Garfunkel Lyrics",
    "title": "I Am a Rock",
    "videoCount": "1",
    "category": "song"
  },
  "dvr2n9q8t3I": {
    "linktitle": "FIRST OF MAY (Lyrics) - THE BEE GEES",
    "title": "First of May",
    "videoCount": "1",
    "category": "song"
  },
  "ZXkk65PdKyM": {
    "linktitle": "\"It Never Rains In Southern California\" w/Lyrics- Albert Hammond",
    "title": "It Never Rains In Southern California",
    "videoCount": "1",
    "category": "song"
  },
  "CpSdePGgVyQ": {
    "linktitle": "A Horse With No Name - America (Lyrics)",
    "title": "A Horse With No Name",
    "videoCount": "1",
    "category": "song"
  },
  "oxHnRfhDmrk": {
    "linktitle": "Don McLean - Vincent ( Starry, Starry Night) With Lyrics",
    "title": "Vincent",
    "videoCount": "1",
    "category": "song"
  },
  "3Rifby1tVE8": {
    "linktitle": "MORNING HAS BROKEN - Cat Stevens (Lyrics)",
    "title": "Morning Has Broken",
    "videoCount": "1",
    "category": "song"
  },
  "vYK9iCRb7S4": {
    "linktitle": "By the Rivers of Babylon ( with lyrics)",
    "title": "By the Rivers of Babylon",
    "videoCount": "1",
    "category": "song"
  },
  "wH8Ajv_6Xj4": {
    "linktitle": "John Denver _ Take Me Home, Country Roads - HD with Lyrics",
    "title": "Take Me Home Country Roads",
    "videoCount": "1",
    "category": "song"
  },
  "PLakqv5wjB6aKqy04dhktXz8MruAPMFE_7": {
    "linktitle": "【紅樓夢】全本廣東話原文照讀（全一百二十回）人工智能聲音主講",
    "title": "【紅樓夢】全本廣東話原文照讀",
    "videoCount": "120",
    "category": "book"
  },
  "PLakqv5wjB6aL-WTzSbocY0toV-K9ItG_r": {
    "linktitle": "【官場現形記】全本廣東話原文照讀（全六十回）人工智能聲音主講",
    "title": "【官場現形記】全本廣東話原文照讀",
    "videoCount": "60",
    "category": "book"
  },
  "uRvl0kZSbdM": {
    "linktitle": "DEF CON 19 - Bruce \"Grymoire\" Barnett - Deceptive Hacking",
    "title": "Bruce  Barnett @grymoire",
    "videoCount": "1",
    "category": "code"
  },
  "PLymupH2aoNQNezYzv2lhSwvoyZgLp1Q0T": {
    "linktitle": "OpenShot Tutorials",
    "title": "OpenShot Tutorials",
    "videoCount": "8",
    "category": "code"
  }
};
document.getElementById("category").innerHTML = Object.keys(Category)
        .map(id => optCategory(id)).join('\n');
playlistIds = Object.keys(Playlist);
const i = getRandomIntInclusive(0, playlistIds.length - 1);
GetTextLengths();
document.getElementById("category").value = Playlist[playlistIds[i]].category;
videoIds = playlistIds .filter(id => Playlist[id].category === Playlist[playlistIds[i]].category)
document.getElementById("myPlaylist").innerHTML = videoIds
        .map(id => optPlaylist(id)).join('\n');
