# Docker PHP + React + MySQL

Este proyecto implementa un entorno de desarrollo utilizando Docker Compose con:

- Backend en PHP puro
- Frontend en React
- Base de datos MySQL

## Estructura del proyecto

```
.
├── backend/            # Código PHP
├── frontend/           # Aplicación React
├── db/
│   └── init.sql        # Script de inicialización para la base de datos MySQL
├── docker-compose.yml
└── README.md
```

## Requisitos

- Docker
- Docker Compose

## Cómo iniciar el proyecto

1. Clona el repositorio:

```bash
git clone https://github.com/davidkingss96/docker-php-react-mysql.git
cd docker-php-react-mysql
```

2. Construye e inicia los contenedores:

```bash
docker-compose up --build
```

3. Accede a las aplicaciones:

- Frontend: http://localhost:5173
- Backend (API PHP): http://localhost:8084
- MySQL: puerto 3306 (ver credenciales en `docker-compose.yml`)

## Base de datos

El contenedor de MySQL carga automáticamente el script `db/init.sql` al iniciarse por primera vez. Este script crea las tablas necesarias y puede contener datos iniciales para pruebas.

## Autor

David Castillo (2025)

---
