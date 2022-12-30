# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine 
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY package.json ./
RUN npm install
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Build the app
RUN npm run build
# ==== RUN =======
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD ["npm", "start"]
#http://3.87.223.203:3000/

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
###sudo docker build --tag moonbyte/frontend-miap2 .
#       importante FIJARSE QUE HAY UN PUNTO AL FINAL DEL COMANDO DE ARRIBA

#Para correr la imagen de forma local:
#                               usuario/ nombre de la imagen
###sudo docker run -d -p 3000:3000 moonbyte/NAMEREPO
### sudo docker run -d --name=frontend-miap2  -p 3000:3000 moonbyte/frontend-miap2

#Para pushear la imagen a la repo
##      Primero se debe de loguear
###sudo docker login
### username:
### password:
#sudo docker push moonbyte/frontend-miap2
                ##debe de ser con el nickname del dockerhub/ nombre de la imagen echa con build
#si empiezan a dar errores las imagenes,resetearlas con el metodo for de hasta abajo

#Sin termius, en consola conectar a EC2
#chmod u+rw  NAMEKEY.pm
#Aqui deberia de ir el otro comando que se obtiene en el apartado de conectar del EC2 
#sudo apt-get update
#

#Termius EC2:
#sudo apt-get update 