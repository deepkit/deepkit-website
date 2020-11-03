FROM node:12-alpine3.9

RUN apk --no-cache add git
RUN npm config set unsafe-perm true

ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json

RUN cd /app && npm install

ADD . /app
RUN cd /app && npm run build:ssr && npm prune --production

ENV PORT=80
EXPOSE 80
CMD cd /app && node dist/server/main.js
