#!/bin/bash
folder=server/control/proxy/www/passwd.zaifo.com.ar
ssh root@zaifo.com.ar "rm -rf ~/${folder}/*"
scp -r build/* "root@zaifo.com.ar:~/${folder}/"
