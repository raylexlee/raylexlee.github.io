#!/usr/bin/env bash
echo const NoEarliestDate = [ > NoEarliestDate.js
grep ^港台網站重溫 people.txt  | awk '{print "|",$2,"|,";}' | sed -e 's#| #"#' -e 's# |#"#' >> NoEarliestDate.js
echo ] >> NoEarliestDate.js
