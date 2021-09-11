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
     
    stage('Test') {
      steps {
         bat 'npm test'
      }
    }
      
    stage('Build') {
      steps {
         bat 'npm build'
      }
    }     
  }
}