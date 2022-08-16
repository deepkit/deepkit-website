FROM node:16.10.0-alpine3.13

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python3 postgresql-dev git

ENV DIST=/app/dist/
ENV HOST=0.0.0.0
EXPOSE 8080

WORKDIR /app

# this uses 12GB of memory does not finish on a cheap VM, so we have to outsource it to its own build
#ADD build-api.sh /app/build-api.sh
#RUN /app/build-api.sh
#RUN mkdir -p src/assets && cp -r /tmp/deepkit-framework-docs/docs src/assets/api-docs;

ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json

RUN npm ci

COPY . /app

RUN npm run build:ssr
RUN npm run server:build
RUN npm prune --production

CMD node -r source-map-support/register /app/dist/app/server/app.js server:start
