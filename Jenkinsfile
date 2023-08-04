#!groovy
@Library('pipeline-library')_

def server = params.UAT_SERVER ?: "${env.QA_SERVER_CLICk}"
def serverType = params.UAT_SERVER ? "UAT" : "QA"

def appName = serverType == "UAT" ? "click-admin-ui-uat" : "click-admin-ui"
def imageName = "${env.DOCKER_REPO}"
def tag = "${appName}-v1.0.${env.BUILD_NUMBER}"
def latest = "${appName}-latest"

def remote = [ name: "CLICk test server", host: "${server}", allowAnyHosts: true]
def apiURL = "http://${server}:8000"

projectKey = "CLC"

def sendFailed(String message) {
    chatNotification(projectKey, message, false)
}

def sendSuccess(String message) {
    chatNotification(projectKey, message, true)
}

node() {
    try {
        stage('Checkout') {
            checkout scm
        }

        stage('Test') {
            sh "echo \"Skiped Tests\"";
        }

        stage('Build/Send build') {
            docker.withRegistry("${env.DOCKER_HUB}", 'dockerhub') {
                def app = docker.build("${imageName}", '.')
                app.push("${tag}")
                app.push("${latest}")
                sh "docker rmi -f ${app.id} ${app.id}:${tag} ${app.id}:${latest}"
            }
        }

        if (currentBuild.result == "UNSTABLE" || currentBuild.result == "FAILURE") {
            sendFailed("${tag} is unstable or failure")
            return this;
        }

        stage("Deploy to Test server") {
            def credential = serverType == "UAT" ? "uat-servers" : "qa-servers"
            withCredentials([sshUserPrivateKey(credentialsId: credential, keyFileVariable: 'identity', usernameVariable: 'userName')]) {
                remote.user = userName
                remote.identityFile = identity
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'secret', usernameVariable: 'id')]) {
                    configFileProvider([configFile(fileId: 'd7ed0345-10c7-4bd4-80f7-19d0e8250720', variable: 'file')]) {
                        def command = (["${file}"] as File).text
                        sshCommand remote: remote, command: "id=${id} secret=${secret} image=${imageName}:${latest} apiURL=${apiURL} && ${command}"
                    }
                }
            }
        }
        sendSuccess("${tag} has been deployed to ${serverType} server: ${server}")

    } catch (Exception e) {
        currentBuild.result = "FAILURE"
        sendFailed("Build ${tag} has been failed because of ${e.getMessage()}")
    }
}
