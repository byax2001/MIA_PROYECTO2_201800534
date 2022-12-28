FROM node:16
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD [ "npm","start" ]
###CREAR IMAGEN LOCAL
###systemctl start docker
### Cada vez que se hace un build se debe de eliminar la anterior version con : docker rmi (3 caracteres del id de la imagen a eliminar)
###sudo docker build --tag moonbyte/backend-mia .
###CORRER IMAGEN LOCALMENTE
###sudo docker run -p 3000:3000 moonbyte/backend-mia

###EN EL PUERTO DE ALGUN AWS
###sudo docker run -d --name=backend_mia  -p 3000:3000 moonbyte/backend-mia  -e USUARIO = "1332" PASSWORD = 2323


###SUBIR IMAGEN A DOCKERHUB

###sudo docker login
### username:
### password:
###sudo docker tag brandon/backend-mia moonbyte/docker-repo:brandon/backend-mia
###sudo docker push moonbyte/docker-repo:brandon/backend-mia

###docker login -u moonbyte -p 41L35yax! docker.io

### sudo docker push moonbyte/backend-mia
                    ##debe de ser con el nickname del dockerhub


#SI EMPIEZA DAR ERROR AL HACER RUN A LAS IMAGENES RESETEAR TODOS LOS PUETOS CON ESTO:
#for a in `docker ps -a -q`
#do
#  echo "Stopping container - $a"
#  docker stop $a
#done