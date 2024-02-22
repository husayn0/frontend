FROM node:21 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM httpd:alpine

COPY --from=builder /app/dist/frontend /usr/local/apache2/htdocs/

EXPOSE 80
EXPOSE 443

RUN apk --no-cache add openssl

RUN openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 \
    -subj "/C=LB/ST=beirut/L=beirut/O=tasktest Corp/CN=tasktest.com" \
    -keyout /usr/local/apache2/conf/server.key \
    -out /usr/local/apache2/conf/server.crt

RUN sed -i '/LoadModule\ ssl_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
    sed -i '/LoadModule\ socache_shmcb_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
    sed -i '/Include\ conf\/extra\/httpd-ssl.conf/s/^#//g' /usr/local/apache2/conf/httpd.conf

RUN echo "Listen 443 https" >> /usr/local/apache2/conf/httpd.conf && \
    echo "<VirtualHost *:443>" >> /usr/local/apache2/conf/httpd.conf && \
    echo "    SSLEngine on" >> /usr/local/apache2/conf/httpd.conf && \
    echo "    SSLCertificateFile /usr/local/apache2/conf/server.crt" >> /usr/local/apache2/conf/httpd.conf && \
    echo "    SSLCertificateKeyFile /usr/local/apache2/conf/server.key" >> /usr/local/apache2/conf/httpd.conf && \
    echo "</VirtualHost>" >> /usr/local/apache2/conf/httpd.conf



