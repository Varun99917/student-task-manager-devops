
pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 20, unit: 'MINUTES')
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Fetching project source code from GitHub'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies'
                sh 'npm ci'
            }
        }

        stage('Docker Build and Deployment') {
            steps {
                echo 'Building and starting application containers'
                sh 'docker compose up -d --build'
            }
        }

        stage('Automated Testing') {
            steps {
                echo 'Waiting for application health check'

                sh '''
                    for i in $(seq 1 30); do
                        if curl -fsS http://localhost:3000/health; then
                            exit 0
                        fi
                        sleep 2
                    done

                    echo "Application failed to become healthy"
                    exit 1
                '''

                echo 'Running automated API tests'
                sh 'npm test'
            }
        }

        stage('Deployment Verification') {
            steps {
                sh 'docker compose ps'
                sh 'curl -f http://localhost:3000/health'
                echo 'Deployment completed successfully!'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: CI/CD Pipeline completed!'
        }

        failure {
            echo 'FAILED: Please check Jenkins console output.'
        }
    }
}
