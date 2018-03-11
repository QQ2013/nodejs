#!/bin/sh
k=0
cat res.txt | while read line
do 
     echo "$k:${line}" >>1res.txt
     k=$[ k + 1 ]
     url=`echo $line|awk '{print $2"ershoufang/"}'`
     echo "$k:$url"
     curl 127.0.0.1:4000/?q=$url >> 1res.txt
     for ((i=0;i<10;i++))
     do
         echo $i
         sleep 1
     done 
done
