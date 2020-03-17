# base image
FROM node:12.2.0-alpine
# set working directory
WORKDIR /app
# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn
ENV REACT_APP_GLOBAL_ADMIN_DOMAIN aspen
ENV REACT_APP_API_URL localhost
# Copy all local files into the image.
COPY ./ClientApp .
# Build for production.
RUN npm install
ENTRYPOINT [ "npm", "start" ]