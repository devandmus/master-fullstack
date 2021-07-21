FROM node:16-alpine

RUN apk update && apk add bash

WORKDIR /usr/src/app

# No es necesario copiar package-lock.json porque se crea en docker cuando se instalan las dependencias
COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]