#!/bin/bash

KEYPATH=
USER=

cd ../../frontend

#rm -fr dist
#ng build --prod

ssh -i $KEYPATH -tt $USER@lolable.com << EOF
rm -fr /tmp/lolbuild
mkdir /tmp/lolbuild
exit
EOF

scp -i $KEYPATH -r dist $USER@lolable.com:/tmp/lolbuild
scp -i $KEYPATH -r static  $USER@lolable.com:/tmp/lolbuild

ssh -i $KEYPATH -tt $USER@lolable.com << EOF
sudo rm -fr /var/www/html/lolable/*
sudo mv /tmp/lolbuild/dist/*  /var/www/html/lolable
sudo mv /tmp/lolbuild/static /var/www/html/lolable
exit
EOF
