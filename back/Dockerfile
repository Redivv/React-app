FROM php:8.1-apache
WORKDIR /var/www/html

RUN apt update
RUN apt install -y zip unzip libonig-dev \
&& docker-php-ext-install pdo \
&& docker-php-ext-install pdo_mysql \
&& docker-php-ext-install mbstring \
&& php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
&& php -r "if (hash_file('sha384', 'composer-setup.php') === '906a84df04cea2aa72f40b5f787e49f22d4c2f19492ac310e8cba5b96ac8b64115ac402c8cd292b8a03482574915d1a8') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
&& php composer-setup.php --filename=composer --version=2.1.14 --install-dir=/usr/bin \
&& php -r "unlink('composer-setup.php');" \
&& pecl install xdebug \
&& docker-php-ext-enable xdebug
RUN rm -rf /var/lib/apt/lists/*

COPY . .
RUN composer install --no-scripts

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN a2enmod rewrite
RUN chown -R www-data * && chmod -R 775 *