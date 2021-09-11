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

   stage('Build') {
      steps {
         bat 'npm run build'
      }
    } 
     
    stage('Unit tests') {
      steps {
         bat 'npm test'
      }
    }

    stage('e2e tests') {
      steps {
        bat 'npm run cy:run'
      }
    }
    
  }
}