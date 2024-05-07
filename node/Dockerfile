FROM node:15

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm install node-random-name

RUN npm install mysql2

RUN npm install express


EXPOSE 3000

CMD ["node", "index.js"]
