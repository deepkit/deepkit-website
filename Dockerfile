FROM --platform=linux/amd64 node:16-alpine

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python3 postgresql-dev git

ENV DIST=/app/dist/
ENV HOST=0.0.0.0
EXPOSE 8080

ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json

WORKDIR /app

RUN npm install

ADD build-api.sh /app/build-api.sh
RUN /app/build-api.sh

COPY . /app

RUN npm run build:ssr
RUN npm run server:build
RUN npm prune --production

RUN apk del g++ gcc linux-headers make python
RUN rm -rf /tmp/* /var/tmp/*

CMD node /app/dist/app/server/app.js server:listen
