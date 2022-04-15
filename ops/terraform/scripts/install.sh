#!/bin/bash

sudo apt-get update
sudo apt-get install \
ca-certificates \
curl \
gnupg \
lsb-release
 
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
 
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
 
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
 
docker run -d -p 9200:9200 -p 5601:5601 nshou/elasticsearch-kibana

exit 0