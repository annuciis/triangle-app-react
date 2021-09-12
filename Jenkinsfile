pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim' 
            args '-p 7979:7979' 
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