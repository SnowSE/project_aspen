# base image
FROM node:12.2.0-alpine
# set working directory
WORKDIR /app
# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn
ENV GLOBAL_ADMIN_DOMAIN aspen.com
ENV API_URL localhost
# Copy all local files into the image.
COPY ./ClientApp .
# Build for production.
RUN npm install
ENTRYPOINT [ "npm", "start" ]