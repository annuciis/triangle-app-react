pipeline {
  agent any
    
  tools {nodejs "node"}

  environment {
      CHROME_BIN = '/bin/google-chrome'
  }
    
  stages {
        
    stage('Install dependencies') {
      steps {
        bat 'npm install'
      }
    }
     
    stage('Unit tests') {
      steps {
         bat 'npm test'
      }
    }

    stage('e2e tests') {
      steps {
        bat 'npm run start'
        bat 'npm run cy:run'
      }
    }

    stage('Build') {
      steps {
         bat 'npm run-script build'
      }
    }     
  }
}