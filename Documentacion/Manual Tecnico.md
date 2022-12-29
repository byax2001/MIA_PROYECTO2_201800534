# Manual Tecnico
### Objetivos:
- Aprender a administrar archivos y estructuras en NodeJS
- Comprender la funcionalidad de un flujo de archivos JSON
- Aplicar la teoría de archivos JSON
- Utilizar un framework (React)
- Administrar los usuarios y permisos por medio de grupos
- Restringir y administrar el acceso a los archivos de modo administrador, cliente y recepcionista.
- Crear una aplicación visual
- Utilizar los servicios de una nube (para este proyecto utilizaremos AWS)
      
### Explicación de la Arquitectura Realizada
![image](https://user-images.githubusercontent.com/63923585/209847829-332464b9-abd4-4ffe-95f5-2c8c1c379857.png)
> Tanto el Backend como el Frontend estarán levantados en computadoras virtuales  (servicio AWS EC2)  las cuales son posibles de acceder desde cualquier parte, el backend consumirá dos servicios de AWS conocidos como Bucket y Amazon Cognito, El servicio Bucket funciona como una base de datos donde en este proyecto se almacenaran las fotos de perfil de los usuarios, dichas imágenes podrán ser accedidas desde cualquier parte, Amazon Cognito lanza un mensaje de confirmación a la hora de crear una cuenta en la pagina web, dicha verificación en este caso es un link enviado a través de un correo al email registrado al momento de crear la cuenta, sin esta verificación no es posible loguearse, protegiendo así al backend de una creación sin control de cuentas en la pagina web intentando tumbar dicha pagina.

### USUARIOS IAM
    • User_EC2 : Usuario con todos los permisos para EC2, tiene la libertad de poder crear, detener, reanudar y eliminar Instancias que servirán como una computadora virtual la cual puede ser accedida desde cualquier parte siempre y cuando se tenga el link correcto de esta.
      
    • User_Cognito: Usuario con todos los permisos para poder ingresar usuarios a una lista donde esta registrado su nombre, contraseña, correo electrónico y si esta verificado o no, pudiéndose consultar dichas características a través de este, cuenta con la capacidad de eliminar usuarios que se hallan suscrito a dicho servicio.
      
    • User_Bucket: Tiene los permisos y las credenciales necearías para pushear imágenes a un repositorio Bucket de AWS, teniendo los permisos necesarios para eliminar los archivos subidos y subir otros de forma manual.
## CONFIGURACIÓN DE CADA SERVICIO:
### EC2:
> A la hora de crear el usuario darle los permisos “Amazon EC2 Full Access”. 

Presionar el boton “Lanzar Instancia” para empezar con la creacion de una.
![image](https://user-images.githubusercontent.com/63923585/209847867-918ef1cc-168b-4cfe-b87f-2639ba3f6829.png)
Escoger un nombre adecuado y escoger el SO que tendrá el servidor, par que no cobren se usara uno disponible en la capa gratuita.
![image](https://user-images.githubusercontent.com/63923585/209847876-14bbfec7-9ab5-49fb-8a85-0033518ef46b.png)
Crear un par de llaves y guardar el archivo que se descargara:
![image](https://user-images.githubusercontent.com/63923585/209847894-a05b1493-5099-4191-8938-4ffb5798de82.png)
 >Configuracion de las llaves a la hora de ser creadas.
![image](https://user-images.githubusercontent.com/63923585/209847906-6cb0e839-2175-4884-8888-ee3bd8c3723f.png)

Seguir con la configuración:

![image](https://user-images.githubusercontent.com/63923585/209847915-486035cb-feb3-4ca3-9d67-cf94da691fe7.png)

Configurar un tamaño menor a 30 GIB (en este caso 20) para que siga siendo gratuito el servicio y luego lanzar instancia
![image](https://user-images.githubusercontent.com/63923585/209847926-a11a2de3-ce45-4b0f-a6ef-ad2f4ed818fc.png)
Esperar a que cargue para poder usar la instancia.
![image](https://user-images.githubusercontent.com/63923585/209847931-82a0756e-68c7-421e-8672-3c9fc7f95bdd.png)
Configurar los grupos de seguridad para que el link funcione donde sea:
click en el link abajo de “Grupos de seguridad”
![image](https://user-images.githubusercontent.com/63923585/209847940-39327e51-4feb-40fc-8078-2e46b955cda4.png)
Presioar en Editar reglas de entrada:
![image](https://user-images.githubusercontent.com/63923585/209847950-8c5dae17-4f44-4976-aec7-6b6c2f965100.png)
Eliminar todas 
![image](https://user-images.githubusercontent.com/63923585/209847958-fb8ceb15-1d98-4ce7-af5e-15e6c4a5126f.png)
Agregar nueva regla y guardar reglas.
![image](https://user-images.githubusercontent.com/63923585/209847965-70f10097-981a-4bc9-b186-9769707eab26.png)
## Conectar EC2 con Termius
Presionar el boton add y luego en new Host
![image](https://user-images.githubusercontent.com/63923585/209896342-b85813a7-51a1-4344-bd86-92143e9081c7.png)
Seleccionar la instancia deseada (en este caso backend)
![image](https://user-images.githubusercontent.com/63923585/209896346-5333f19c-aac9-4d26-af41-dbc9c68dd169.png)
 
 Presionar en el boton conectar

![image](https://user-images.githubusercontent.com/63923585/209896353-3cf59e7d-7873-4bfe-94bc-e9d48bd81276.png)
 Copiar la dirección publica  y pegarla en el apartado Address ademas de colocarle un nombre a la instancia en Termius, asi como un nombre de usuario simple (en este caso ubuntu) sin necesidad de contraseña
![image](https://user-images.githubusercontent.com/63923585/209896378-c5bd83b7-ab62-45ca-8cd8-bd1bb2bfde25.png)
Presionar en el boton set Key y buscar el archivo key que se genero al crear la instacia, posteriormente presionar en el boton new .
![image](https://user-images.githubusercontent.com/63923585/209896375-3fa3f527-b38b-4d3e-b641-910cc22dde15.png)
Arrastrar el archivo key a este apartado.
![image](https://user-images.githubusercontent.com/63923585/209896398-ac49545b-a027-4688-89a4-de2517a1b037.png)
Presionar en save
![image](https://user-images.githubusercontent.com/63923585/209896406-dc3cef95-94e2-425a-852b-35179501d445.png)
Presionamos el boton de la flecha en la esquina superior derecha 
![image](https://user-images.githubusercontent.com/63923585/209896428-89861c78-e111-445c-ae2b-32c37dc0c6d2.png)
Al simbolo generado en el inicio con el nombre indicado dar doble clik posteriormente aparecera esto 
![image](https://user-images.githubusercontent.com/63923585/209896439-cc2e5906-9748-4ada-bae6-36be193c3b0a.png)
Darle click en add y continue, luego de la conexión aparecera la consola de la maquina virtual a la cual sera posible actualizar las librerias y correr programas como contenedores de docker
![image](https://user-images.githubusercontent.com/63923585/209896446-597b7cc8-4a4b-483d-ad6b-6af736906931.png)


## Cognito
Crear grupo de Usuarios:  
![image](https://user-images.githubusercontent.com/63923585/209850212-f067dd5b-28df-4314-b41d-f17ac0be7516.png)
![image](https://user-images.githubusercontent.com/63923585/209850218-0baf7ec2-009f-4cf0-a95c-8714dbfd7307.png)

Crear cliente de aplicación (mia-client-id en este caso) sin key secreta:
![image](https://user-images.githubusercontent.com/63923585/209847983-b27729ab-67b8-45a3-b229-faa1efa2bbe6.png)
![image](https://user-images.githubusercontent.com/63923585/209847992-1d96f1b1-a326-4bb8-b9c4-a658be47452a.png)
![image](https://user-images.githubusercontent.com/63923585/209848012-0c0b3a41-f3dc-4df6-81da-4e386a42856c.png)
![image](https://user-images.githubusercontent.com/63923585/209848017-d2c08796-668f-4df8-8165-8c6c3f2f03f0.png)
Archivo con los métodos para conectar node js con AWS Cognito:
![image](https://user-images.githubusercontent.com/63923585/209848032-a403f010-ff27-4971-b9a9-8814889590b0.png)
![image](https://user-images.githubusercontent.com/63923585/209848043-8d6133e0-383d-4aa7-a5f0-76844d70ab9a.png)
![image](https://user-images.githubusercontent.com/63923585/209848062-38306313-2221-4bd3-b02f-b77a704c8daf.png)
![image](https://user-images.githubusercontent.com/63923585/209848074-09fc9648-b44d-4f55-90ac-533e97ed9925.png)
![image](https://user-images.githubusercontent.com/63923585/209848085-f9267a7f-0e82-4ce0-9028-d566d01986f8.png)
### Variables Env:
```
COGNITO_USER_POOL_ID ='us-east-1_EWABffmLH'
COGNITO_CLIENT_ID='pi69s3g5mod6ldeu2fc2i25fd'
```
## Bucket 
Configuración de Permisos de Bucket a detalle: https://youtu.be/wa-wFNPz2tY
![image](https://user-images.githubusercontent.com/63923585/209848104-a302c8dd-e993-4e62-b07a-d14928d1d57f.png)
Archivo con los métodos para conectar:
![image](https://user-images.githubusercontent.com/63923585/209848109-57ac83db-d4f3-40ac-8469-0609111eb73d.png)
![image](https://user-images.githubusercontent.com/63923585/209848119-cce92222-8cfd-4f30-b86a-0f327f7e5cac.png)

Ejemplo de variables de entorno para Bucket (tanto la key como la secret key se obtienen al finalizar la opción de crear un usuario y escoger la opción de agregar dichas llaves además de una contraseña para el usuario).
```
BUCKET_ID_KEY ='AKIAZTLULBT2CVMTRJVQ'
BUCKET_ID_SECRET_KEY='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'
BUCKET_REGION ='us-east-1'
BUCKET_NAME = 'appweb-201800534-p2'     //nombre que se escogió para el repositorio bucket
```

## CONCLUSIONES:
-  AWS es una herramienta de Amazon de suma utilidad, a pesar de que se uso la capa gratuita y no se uso el resto de las funciones premium demostró ser de gran ayuda a la hora de administrar una pagina web, pues no solo permite almacenar datos de usuarios registrados, si no que ademas permite crear maquinas virtuales para aligerar la computadora y también un servicio muy completo y muy intuitivo, llamado Cognito, para evitar que hackers tumben las paginas a base de crear cuentas sin parar.
- A pesar de ser algunos servicios difíciles de conectar con el backend si no se habían utilizado antes, en el proyecto una vez funcionaban  los métodos requeridos dichos servicios brindaban un gran peso en esto pues pasaba de ser una simple pagina que consumía un Json a ser una verdadera pagina de registro y almacenamiento que le permite a las personas ver como en cierta medida funcionan las paginas que consumías dia con día.
- Bucket a pesar de ser una herramienta limitada permite lo necesario para poder guardar los datos de paginas con registros.
- Es necesario de un buen uso de las funciones asíncronas, los promise y los await para poder dominar los servicios Amazon usados en este proyecto de forma correcta.

