#!/bin/bash
folder=server/control/proxy/www/gpass.zaifo.com.ar
ssh root@bolsa.zaifo.com.ar "rm -rf ~/${folder}/*"
scp -r build/* "root@bolsa.zaifo.com.ar:~/${folder}/"
