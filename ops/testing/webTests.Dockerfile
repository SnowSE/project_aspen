FROM node:alpine

WORKDIR /src/combined/ClientApp

COPY ClientApp/package.json .
#COPY CLientApp/package-lock.json .

RUN npm install
COPY ClientApp/ .

# ENV CI=true
#CMD npm run test
# don't run the tests in the container, the workflow file will run the tests.
CMD tail -f /dev/null