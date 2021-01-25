docker build --squash -t deepkit-io-website .
docker save deepkit-io-website | gzip | pv | ssh root@marcjschmidt.de 'gzip -d | docker load'
ssh root@marcjschmidt.de 'docker-compose up -d'
