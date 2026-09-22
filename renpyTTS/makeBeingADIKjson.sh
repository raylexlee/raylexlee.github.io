grep ^[a-z] BeingADIK_3col.txt | awk '{print $1,$3;}' > BeingADIK.txt
./genJSON.sh BeingADIK
