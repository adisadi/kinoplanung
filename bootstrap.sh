#!/usr/bin/env bash
ln -s /vagrant /home/vagrant/Desktop/Source

echo "source /home/vagrant/.nvm/nvm.sh" >> /home/vagrant/.profile
source /home/vagrant/.profile

sudo apt-get install dotnet-sdk-2.1.200 -y

npm install -g @angular/cli
npm install -g projecto
npm install -g npm-check-updates
