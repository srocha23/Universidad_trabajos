# Entrega Semana 5 - Implementacion de Jenkins

## 1. Objetivo

Implementar Jenkins como gestor de operaciones de integracion continua para el proyecto Node.js + MySQL construido en la Semana 3. La automatizacion debe validar el codigo fuente, construir los contenedores Docker, levantar el ambiente con Docker Compose y ejecutar pruebas de humo sobre la aplicacion.

## 2. Contexto del proyecto

El repositorio contiene una aplicacion Express que se conecta a MySQL. La aplicacion expone:

- `GET /`: confirma que el servicio Node.js esta funcionando.
- `GET /health`: endpoint de estado usado por Jenkins y Docker.
- `GET /usuarios`: consulta la tabla `usuarios` creada por `db/init.sql`.

Los servicios principales son:

- `app`: contenedor Node.js 18 con Express y mysql2.
- `db`: contenedor MySQL 8.0 con script de inicializacion.
- `jenkins`: contenedor Jenkins LTS preparado para ejecutar Docker y Docker Compose.

## 3. Caracteristicas requeridas para Jenkins

### Software base

- Docker Desktop o Docker Engine instalado en la maquina anfitriona.
- Docker Compose v2 disponible mediante el comando `docker compose`.
- Git para conectar Jenkins con el repositorio del proyecto.
- Puerto `8080` disponible para la interfaz web de Jenkins.
- Puerto `50000` disponible si se usaran agentes Jenkins externos.

### Imagen y contenedor

El servicio `jenkins` se define en `docker-compose.yml` bajo el perfil `ci`. Su imagen se construye desde `jenkins/Dockerfile` y contiene:

- Jenkins LTS con Java 17.
- Docker CLI.
- Plugin Docker Compose.
- Plugins basicos de Jenkins para Git, pipelines y credenciales.

El contenedor monta:

- `jenkins_home:/var/jenkins_home` para persistir la configuracion.
- `/var/run/docker.sock:/var/run/docker.sock` para que Jenkins pueda construir y levantar contenedores del proyecto.

> Nota: montar el socket de Docker da permisos altos al contenedor Jenkins. Para esta entrega se usa en ambiente academico/local; en produccion se recomienda usar agentes aislados o un registro de contenedores con permisos limitados.

## 4. Pipeline de integracion continua

El archivo `Jenkinsfile` contiene un pipeline declarativo con estas etapas:

1. `Instalar dependencias`: ejecuta `npm install` dentro de `app`.
2. `Validar Node.js`: ejecuta `npm test`, que por ahora valida la sintaxis con `node --check index.js`.
3. `Construir contenedores`: construye la imagen Docker de la aplicacion.
4. `Levantar ambiente`: inicia MySQL y la aplicacion con Docker Compose.
5. `Pruebas de humo`: consulta `/health`, `/` y `/usuarios` para confirmar que la aplicacion y la base de datos responden.

Al finalizar, el pipeline ejecuta `docker compose down -v --remove-orphans` para limpiar los contenedores y volumenes creados por la ejecucion.

## 5. Pasos de implementacion

### 5.1 Levantar Jenkins

Desde la raiz del repositorio:

```bash
docker compose --profile ci up -d --build jenkins
```

Luego abrir:

```text
http://localhost:8080
```

### 5.2 Obtener la clave inicial

```bash
docker exec jenkins_ci cat /var/jenkins_home/secrets/initialAdminPassword
```

### 5.3 Crear el job

1. Seleccionar `New Item`.
2. Crear un proyecto tipo `Pipeline`.
3. En `Pipeline`, escoger `Pipeline script from SCM`.
4. Seleccionar Git e ingresar la URL del repositorio.
5. En `Script Path`, dejar `Jenkinsfile`.
6. Guardar y ejecutar `Build Now`.

### 5.4 Validar resultado esperado

La ejecucion es exitosa cuando Jenkins muestra todas las etapas en verde y las pruebas de humo confirman:

- La aplicacion responde en `/health`.
- La ruta principal contiene el texto esperado.
- La ruta `/usuarios` devuelve datos cargados desde MySQL.

## 6. Evidencias sugeridas para la entrega

- Captura del servicio Jenkins corriendo en `http://localhost:8080`.
- Captura del job creado desde el repositorio.
- Captura del pipeline con las etapas finalizadas correctamente.
- Captura de consola mostrando `npm test`, `docker compose build`, `docker compose up` y las pruebas `curl`.
- Captura de `http://localhost:3000/usuarios` con los usuarios iniciales.

## 7. Archivos agregados o actualizados

- `Jenkinsfile`: definicion del pipeline CI.
- `jenkins/Dockerfile`: imagen Jenkins con Docker CLI y Docker Compose.
- `jenkins/plugins.txt`: plugins necesarios para Jenkins.
- `docker-compose.yml`: servicio Jenkins y healthcheck de la app.
- `app/index.js`: endpoint `/health`.
- `app/package.json`: scripts `check` y `test`.

## 8. Riesgos y recomendaciones

- Si el puerto `3000` esta ocupado, se debe cambiar el mapeo de puertos de `app`.
- Si Jenkins no puede ejecutar Docker, verificar el montaje de `/var/run/docker.sock`.
- Si se ejecuta en Windows, se recomienda usar Docker Desktop con contenedores Linux.
- Para una entrega posterior, se pueden agregar Travis CI y Codeship como indica la Semana 7 y 8.
