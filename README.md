GLCM Matrix
------------

## Installation
Install Docker and Docker Compose to run this project

Install Docker
```shell
$ sudo apt-get update
$ sudo apt-get install ca-certificates curl gnupg lsb-release
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg


# install docker engine
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

### References:
* https://docs.docker.com/engine/install/ubuntu/

## Run GLCM Application
Build image from dockerfile file
```shell
$ docker build -t glcm:latest .
```
Run container using docker-compose
```shell
$ docker-compose up
```
