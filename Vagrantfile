# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure("2") do |config|
  config.vm.box = "adisadi/ubuntu_mate_16_dev"
  config.vm.define "kinoplanung-devbox"
  config.vm.network "forwarded_port", guest: 4200, host: 4200
  config.vm.network "forwarded_port", guest: 5000, host: 5000
  config.vm.synced_folder ".", "/vagrant", type: "rsync", rsync__exclude: [".git/","node_modules/"],rsync__auto:true
  config.vm.provision :shell, path: "bootstrap.sh", privileged: false
  config.vm.provider "virtualbox" do |vb|
     vb.gui = true
	 vb.name = "kinoplanung-devbox"
  end
end
