FROM node:alpine

WORKDIR /src/combined/ClientApp

COPY ClientApp/package.json .
#COPY CLientApp/package-lock.json .

RUN npm install
COPY ClientApp/ .

# ENV CI=true
CMD npm run test