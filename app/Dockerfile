# Usar la imagen oficial de PHP con Apache
FROM php:8.2-apache

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    && docker-php-ext-install zip pdo_mysql

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copiar el archivo composer.json y composer.lock
COPY composer.* ./

# Instalar las dependencias de PHP
RUN composer install --no-dev --optimize-autoloader

# Habilitar el módulo de Apache rewrite
RUN a2enmod rewrite

# Copiar el resto de los archivos de la aplicación
COPY . .

# Establecer los permisos adecuados
RUN chown -R www-data:www-data /var/www/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Apache
CMD ["apache2-foreground"]