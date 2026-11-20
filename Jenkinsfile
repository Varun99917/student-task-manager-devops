
pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:/opt/homebrew/bin:/Users/opium_17/.docker/bin:/Applications/Docker.app/Contents/Resources/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    options {
        timestamps()
        timeout(time: 20, unit: 'MINUTES')
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Fetching source code from GitHub'
                checkout scm
            }
        }

        stage('Environment Check') {
            steps {
                sh '''
                    echo "Checking development tools..."
                    node --version
                    npm --version
                    git --version
                    docker --version
                    docker compose version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies'
                sh 'npm ci'
            }
        }

        stage('Docker Build and Deployment') {
            steps {
                echo 'Building and starting containers'
                sh 'docker compose up -d --build'
            }
        }

        stage('Automated Testing') {
            steps {
                sh '''
                    for i in $(seq 1 30); do
                        if curl -fsS http://localhost:3000/health; then
                            break
                        fi
                        sleep 2
                    done

                    curl -fsS http://localhost:3000/health
                '''

                echo 'Running automated API tests'
                sh 'npm test'
            }
        }

        stage('Deployment Verification') {
            steps {
                sh 'docker compose ps'
                sh 'curl -f http://localhost:3000/health'

                echo 'Application deployed successfully!'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: CI/CD Pipeline completed!'
        }

        failure {
            echo 'FAILED: Check Jenkins Console Output.'
        }
    }
}
