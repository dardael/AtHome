FROM php:8.1.0-fpm
WORKDIR /var/www

RUN apt-get update \
    && apt-get install -y git zip \
    && apt-get clean

RUN groupmod -g 1000 www-data
RUN usermod -g www-data -u 1000 www-data
USER www-data
COPY --from=composer /usr/bin/composer /usr/bin/composer
