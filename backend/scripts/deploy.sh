#!/bin/sh

tar --exclude='./node_modules' --exclude='./idea' -zcvf be.tar.gz .

scp be.tar.gz root@10.1.30.3:/srv/din-ben-ton/be

