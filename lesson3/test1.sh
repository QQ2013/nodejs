#!/bin/sh
i=0
cat res.txt | while read line
do 
     echo "$i:${line}"
     i=$[ i + 1 ]
     url=`echo $line|awk '{print $2"ershoufang/"}'`
     echo $url
     curl 127.0.0.1:4000/?q=$url
     sleep 1
done
