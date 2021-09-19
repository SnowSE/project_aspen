FROM node:alpine
RUN apk add curl

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

CMD npm start