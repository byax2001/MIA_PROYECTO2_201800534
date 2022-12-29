FROM node:16
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD [ "npm","start" ]

#TODOS LOS COMANDOS DEBEN DE SER CON MINUSCULAS Y SIN GUIONES BAJOS
#Comandos Generales
#Para iniciar:
####systemctl start docker

#Para ver las imagenes presentes:
#docker images

#Para eliminar:
#docker rmi ID  (3 letras principales del id de las imagenes)

#Para hacer Build:
#       Cada vez que se hace un build se debe de eliminar la anterior version con : docker rmi (3 caracteres del id de la imagen a eliminar)
###sudo docker build --tag moonbyte/backend-miap2 .
#       importante FIJARSE QUE HAY UN PUNTO AL FINAL DEL COMANDO DE ARRIBA

#Para correr la imagen de forma local:
#                               usuario/ nombre de la imagen
###sudo docker run -d -p 3000:3000 moonbyte/NAMEREPO
### sudo docker run -d --name=backend-miap2  -p 3000:3000 moonbyte/backend-miap2

#Para pushear la imagen a la repo
##      Primero se debe de loguear
###sudo docker login
### username:
### password:
#sudo docker push moonbyte/backend-miap2
                ##debe de ser con el nickname del dockerhub/ nombre de la imagen echa con build
#si empiezan a dar errores las imagenes,resetearlas con el metodo for de hasta abajo

#Sin termius, en consola conectar a EC2
#chmod u+rw  NAMEKEY.pm
#Aqui deberia de ir el otro comando que se obtiene en el apartado de conectar del EC2 
#sudo apt-get update
#

#Termius EC2:
#sudo apt-get update 

#===========================================================================================

#Comandos Extras
###CREAR IMAGEN LOCAL
###        Siempre se ejecuta este metodo al iniciar a trabajar con docker:
###systemctl start docker

###        Cada vez que se hace un build se debe de eliminar la anterior version con : docker rmi (3 caracteres del id de la imagen a eliminar)
###sudo docker build --tag moonbyte/backend-miap2 .
#importante FIJARSE QUE HAY UN PUNTO AL FINAL DEL COMANDO DE ARRIBA

###        CORRER IMAGEN LOCALMENTE
#                               usuario/ nombre de la repo
###sudo docker run -p 3000:3000 moonbyte/backend

###EN EL PUERTO DE ALGUN AWS
###sudo docker run -d --name=backend_mia  -p 3000:3000 moonbyte/backend-mia  -e USUARIO = "1332" PASSWORD = 2323


###SUBIR IMAGEN A DOCKERHUB
        #Primero se debe de loguear al  (2 metodos presentados)
###sudo docker login
### username:
### password:

###Sustituir password por la contraseña del usuario
###docker login -u moonbyte -p PASSWORD docker.io

        #Push Image Metodos
###sudo docker tag brandon/backend-mia moonbyte/docker-repo:brandon/backend-mia
###sudo docker push moonbyte/docker-repo:brandon/backend-miap2


        #El metodo mas infalibre para pushear el docker
### sudo docker push moonbyte/backend-miap2
                    ##debe de ser con el nickname del dockerhub/ nombre de la imagen ya echa con build


#SI EMPIEZA DAR ERROR AL HACER RUN A LAS IMAGENES RESETEAR TODOS LOS PUETOS CON ESTO:
#for a in `docker ps -a -q`
#do
#  echo "Stopping container - $a"
#  docker stop $a
#done