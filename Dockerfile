FROM node:latest

RUN npm install -g sass

WORKDIR /var/www/app

CMD npm install; npm run start
