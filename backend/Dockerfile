FROM node:16
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD [ "npm","start" ]
#TODOS LOS COMANDOS DEBEN DE SER CON MINUSCULAS Y SIN GUIONES BAJOS

###CREAR IMAGEN LOCAL
###systemctl start docker
### Cada vez que se hace un build se debe de eliminar la anterior version con : docker rmi (3 caracteres del id de la imagen a eliminar)
###sudo docker build --tag moonbyte/backend-miap2 .
#impotante FIJARSE QUE HAY UN PUNTO AL FINAL DEL COMANDO DE ARRIBA
###CORRER IMAGEN LOCALMENTE
#                               usuario/ nombre de la repo
###sudo docker run -p 3000:3000 moonbyte/backend

###EN EL PUERTO DE ALGUN AWS
###sudo docker run -d --name=backend_mia  -p 3000:3000 moonbyte/backend-mia  -e USUARIO = "1332" PASSWORD = 2323


###SUBIR IMAGEN A DOCKERHUB

###sudo docker login
### username:
### password:
###sudo docker tag brandon/backend-mia moonbyte/docker-repo:brandon/backend-mia
###sudo docker push moonbyte/docker-repo:brandon/backend-miap2
###Sustituir password por la contraseña del usuario
###docker login -u moonbyte -p PASSWORD docker.io

### sudo docker push moonbyte/backend-miap2
                    ##debe de ser con el nickname del dockerhub/ nombre de la imagen ya echa con build


#SI EMPIEZA DAR ERROR AL HACER RUN A LAS IMAGENES RESETEAR TODOS LOS PUETOS CON ESTO:
#for a in `docker ps -a -q`
#do
#  echo "Stopping container - $a"
#  docker stop $a
#done