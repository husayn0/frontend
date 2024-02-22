FROM node:21 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=builder /app/dist/frontend /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

RUN apk --no-cache add openssl

RUN openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 \
    -subj "/C=LB/ST=beirut/L=beirut/O=tasktest Corp/CN=tasktest.com" \
    -keyout /etc/nginx/server.key \
    -out /etc/nginx/server.crt

RUN sed -i '/^# server {/,/^# }/s/# //' /etc/nginx/nginx.conf

RUN echo "    ssl_certificate /etc/nginx/server.crt;" >> /etc/nginx/nginx.conf && \
    echo "    ssl_certificate_key /etc/nginx/server.key;" >> /etc/nginx/nginx.conf
