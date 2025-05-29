pipeline {
    agent {
        label "${AGENT}"
    }

    stages {
        
        stage("Continuous Integration") {
            steps {
                git branch: "main", url: "https://github.com/YanisBra/MyBank_frontend"
                sh "npm install"
                sh "npm run test"
            }
        }
        
        stage("Continuous Delivery / Livraison Continue") {
            steps {
                sh "docker build . -t ${DOCKERHUB_USERNAME}/mybank_frontend"
                sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}" 
                sh "docker push ${DOCKERHUB_USERNAME}/mybank_frontend"
            }
        }
        
        stage('Countinuous Deployment') {
            steps {
                sh ''' 
                sshpass -p ${SERVER_PASSWORD} ssh -o StrictHostKeyChecking=no ${SERVER_USERNAME}@${SERVER_IP} \
                "docker rm -f mybank_frontend_container &&\
                docker run --name mybank_frontend_container -p 5173:5173 -d yanisbra/mybank_frontend"
                '''
            }
        }
    
    }
}
