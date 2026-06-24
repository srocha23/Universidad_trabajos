pipeline {
  agent any

  options {
    timestamps()
  }

  environment {
    COMPOSE_PROJECT_NAME = "universidad_semana5_${BUILD_NUMBER}"
  }

  stages {
    stage("Instalar dependencias") {
      steps {
        dir("app") {
          sh "npm install --package-lock=false"
        }
      }
    }

    stage("Validar Node.js") {
      steps {
        dir("app") {
          sh "npm test"
        }
      }
    }

    stage("Construir contenedores") {
      steps {
        sh "docker compose build app"
      }
    }

    stage("Levantar ambiente") {
      steps {
        sh "docker compose up -d db app"
      }
    }

    stage("Pruebas de humo") {
      steps {
        sh '''
          set -eu
          APP_ENDPOINT="${APP_URL:-http://localhost:3000}"

          for attempt in $(seq 1 30); do
            if curl -fsS "$APP_ENDPOINT/health"; then
              break
            fi

            if [ "$attempt" = "30" ]; then
              echo "La aplicacion no respondio en $APP_ENDPOINT/health"
              exit 1
            fi

            sleep 2
          done

          curl -fsS "$APP_ENDPOINT/" | grep -q "Docker"
          curl -fsS "$APP_ENDPOINT/usuarios" | grep -q "Juan"
        '''
      }
    }
  }

  post {
    always {
      sh "docker compose down -v --remove-orphans || true"
      archiveArtifacts artifacts: "Jenkinsfile,docker-compose.yml,docs/semana5-jenkins.md", allowEmptyArchive: true
    }
  }
}
