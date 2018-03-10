#!/bin/sh
rm res.txt
for((i=0;i<=3;i++));  
do   
echo start get page $i

sleep 1
curl http://localhost:4000/?q=$i >>res.txt
#echo $(expr $i \* 3 + 1);  
done  
