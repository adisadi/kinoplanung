#!/usr/bin/env bash
ln -s /vagrant /home/vagrant/Desktop/Source

echo "source /home/vagrant/.nvm/nvm.sh" >> /home/vagrant/.profile
source /home/vagrant/.profile

sudo apt-get install dotnet-sdk-2.1.200 -y

npm install -g @angular/cli
npm install -g projecto
npm install -g npm-check-updates

echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

mkdir /vagrant/client/node_modules
mkdir /home/vagrant/node_modules_kino
sudo mount --bind ~/node_modules_kino /vagrant/client/node_modules