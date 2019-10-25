FROM node:10

EXPOSE 8080

ADD package.json /usr/src/app/
WORKDIR /usr/src/app
RUN npm install

ADD . /usr/src/app

CMD npm run dev
