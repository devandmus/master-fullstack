FROM alpine:3.15
RUN apk add --update nodejs npm
WORKDIR helloworld
COPY ./helloworld/* .
RUN npm install
CMD ["npm", "start"]
