FROM php:8.1.0-fpm
WORKDIR /var/www
RUN apt-get update \
    && apt-get install -y git zip \
    && apt-get clean

COPY --from=composer /usr/bin/composer /usr/bin/composer
