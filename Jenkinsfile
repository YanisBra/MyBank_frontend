pipeline {
    agent {
        label "${AGENT}"
    }

    stages {
        
        stage("Continuous Integration") {
            steps {
                git branch: "main", url: "https://github.com/YanisBra/MyBank_frontend"
                sh "npm install"
            }
        }
        
        stage("Continuous Delivery / Livraison Continue") {
            steps {
                sh "docker build . -t ${DOCKERHUB_USERNAME}/mybank_frontend"
                sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKER_PASSWORD}" 
                sh "docker push ${DOCKERHUB_USERNAME}/mybank_frontend"
            }
        }
        
        stage('Countinuous Deployment') {
            steps {
                sh ''' 
                sshpass -p ${SERVER_PASSWORD} ssh -o StrictHostKeyChecking=no ${SERVER_USERNAME}@${SERVER_IP} \
                "docker pull ${DOCKERHUB_USERNAME}/mybank_frontend &&\
                docker rm -f mybank_frontend_container &&\
                docker run --name mybank_frontend_container -p 5173:5173 -d yanisbra/mybank_frontend"
                '''
            }
        }
    
    }
}


// --------- Use this Jenkinsfile only if Jenkins runs on the deployment server ---------
/*pipeline {
    agent {
        label "${AGENT}"
    }

    stages {
        stage('Clone repository') {
            steps {
                git branch: 'main', url: 'https://github.com/fredericBui/friendevent_frontend.git'
            }
        }

        stage('Continuous Delivery') {
            steps {
                sh "docker build . -t yanisbra/friendevent_frontend"
                sh "docker login -u yanisbra -p ${DOCKER_PASSWORD}" 
                sh "docker push yanisbra/friendevent_frontend"
                    
            }
        }

        stage('Countinuous Deployment') {
            steps {
                sh 'docker rm -f friendevent_frontend_container'
                sh 'docker run --name friendevent_frontend_container -p 8089:80 -d yanisbra/friendevent_frontend'
            }
        }
    }
}*/


