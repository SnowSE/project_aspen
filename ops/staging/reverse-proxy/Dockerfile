FROM node:15-alpine AS builder
WORKDIR /app
COPY src/web/package.json .
COPY src/web/package-lock.json .
RUN npm install 
COPY src/web/ .

RUN npm run build


FROM nginx
RUN apt update && apt install -y curl
WORKDIR /etc/nginx/html
RUN mkdir aspen
COPY ops/staging/reverse-proxy/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build aspen
ENTRYPOINT ["nginx", "-g", "daemon off;"]