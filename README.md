# Semana 3 - Docker Compose con Node.js y MySQL

Este proyecto corresponde a la entrega de la Semana 3 del módulo de Integración Continua.

## Descripción

El proyecto contiene una aplicación Node.js conectada a una base de datos MySQL. Ambos servicios se ejecutan en contenedores Docker y se comunican mediante una red definida en Docker Compose.

## Tecnologías utilizadas

- Docker
- Docker Compose
- Node.js 18
- Express
- MySQL 8.0
- mysql2

## Estructura del proyecto

```text
.
├── app
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── db
│   └── init.sql
├── docker-compose.yml
└── README.md
