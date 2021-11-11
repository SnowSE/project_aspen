FROM node:15-alpine AS builder
WORKDIR /app
COPY src/web/package* .
RUN npm install 
COPY src/web/ .

RUN npm run build


FROM nginx:alpine
RUN apk add curl
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ops/staging/reverse-proxy/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]