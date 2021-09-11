pipeline {
  agent any
    
  tools {nodejs "node"}
    
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