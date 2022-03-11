FROM alpine:3.15
RUN apk add --update nodejs npm
WORKDIR src/app
COPY ./helloworld/* .
RUN npm install
CMD ["npm", "start"]
