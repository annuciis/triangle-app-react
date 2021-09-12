pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') {
          environment {
                  HOME="."
                } 
            steps {
                bat 'npm install' 
            }
        }
    }
}