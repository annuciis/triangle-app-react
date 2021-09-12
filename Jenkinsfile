pipeline {
    agent {
        docker {
            image 'triangle-app-react:latest 
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