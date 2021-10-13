#!/bin/bash
folder=server/control/proxy/www/passwd.zaifo.com.ar
ssh root@passwd.zaifo.com.ar "rm -rf ~/${folder}/*"
scp -r build/* "root@passwd.zaifo.com.ar:~/${folder}/"
