
ssh root@marcjschmidt.de "sudo su deploy sh -c 'cd ~/deepkit-website/ && git pull origin main && docker build -t deepkit-io-website .'";
ssh root@marcjschmidt.de "docker-compose up -d deepkit-io;";

docker buildx build -t deepkit-io-website .
docker save deepkit-io-website | gzip | pv | ssh root@marcjschmidt.de 'gzip -d | docker load'
ssh root@marcjschmidt.de 'docker-compose up -d'
