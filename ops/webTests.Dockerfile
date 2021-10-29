FROM node:alpine

WORKDIR /src/web

COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .

# ENV CI=true
CMD npm run test