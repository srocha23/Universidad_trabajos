# Proyecto de Integracion Continua - Semanas 3 y 5

Este repositorio contiene la entrega de Semana 3 con Docker Compose y la preparacion de Semana 5 con Jenkins como gestor de operaciones de integracion continua.

## Descripcion

El proyecto contiene una aplicacion Node.js conectada a una base de datos MySQL. Ambos servicios se ejecutan en contenedores Docker y se comunican mediante una red definida en Docker Compose.

Para Semana 5 se agrega Jenkins, un pipeline declarativo y documentacion de implementacion en `docs/semana5-jenkins.md`.

## Tecnologias utilizadas

- Docker
- Docker Compose
- Node.js 18
- Express
- MySQL 8.0
- mysql2
- Jenkins LTS

## Estructura del proyecto

```text
.
|-- Jenkinsfile
|-- app
|   |-- Dockerfile
|   |-- index.js
|   `-- package.json
|-- db
|   `-- init.sql
|-- docs
|   `-- semana5-jenkins.md
|-- jenkins
|   |-- Dockerfile
|   `-- plugins.txt
|-- docker-compose.yml
`-- README.md
```

## Ejecutar la aplicacion

```bash
docker compose up -d --build app db
```

Rutas disponibles:

- `http://localhost:3000/`
- `http://localhost:3000/health`
- `http://localhost:3000/usuarios`

## Ejecutar validacion local

```bash
cd app
npm install
npm test
```

## Levantar Jenkins para Semana 5

```bash
docker compose --profile ci up -d --build jenkins
```

Abrir Jenkins en:

```text
http://localhost:8080
```

Obtener la clave inicial:

```bash
docker exec jenkins_ci cat /var/jenkins_home/secrets/initialAdminPassword
```

El documento completo de la entrega esta en `docs/semana5-jenkins.md`.
