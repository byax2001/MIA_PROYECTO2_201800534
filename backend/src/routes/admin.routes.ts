// @ts-ignore    Se escribe esta linea pues ts-ignore esta dando unos problemas de duplicacion
import Router from 'express';
const {signUpCognito} = require('../middleware/Cognito.ts');
const fs = require('fs')
const path = require('path')
const {check} = require('express-validator')
const _cognito= require('../middleware/Cognito');
const bucket = require('../middleware/Bucket')
require('dotenv').config()
const router = Router()

//AÑADIR USUARIOS
router.post("/addUsers",async function(req:any,res:any){
    //RETORNAR UN NEW PROMISE ((PAR1,PAR2)=>{}) Y EN LA OTRA PARTE DONDE SE LLAMA EL METODO
    //CON AWAIT, FUERZA AL PROGRAMA A REALIZAR ALGO PRIMERO Y LUEGO LO OTRO 

    const nombre = req.body.nombre
    const user = req.body.usuario
    const tipo_usuario = req.body.tipo_usuario
    const foto = req.body.foto 
    const email = req.body.email
    const password = req.body.password

    //ELIMINO LA BASE DE DATOS ANTERIOR 
    const pathFile = path.join(__dirname,'../BaseDatos/BaseDatos.json')
    const texto:string = String(fs.readFileSync(pathFile,'utf-8'))
    let Bdatos = JSON.parse(texto);
    let exito_pet = false;
    try {
        const lUsers:any[] = Bdatos["usuarios"]
        let existe = false
        lUsers.forEach((lUsers)=>{
            if(lUsers["usuario"]==user || lUsers["email"]==email){
                existe=true;
        }
        })
        if (existe===false){
             //ELIMINACION DE LA BASE DE DATOS ANTERIOR
            //fs.unlinkSync(pathFile)
            //REGISTRO DE USUARIOS
            //singUp(req,res,Bdatos,pathFile,nombre,user,tipo_usuario,email,foto,password)
            await _cognito.signUpCognito(req,res);
            //SUBIR FOTO DE USUARIOS ==============================
            await bucket.Upload(req,res,user)
        
                    //probar en otra ocasion si se puede obtener el nombre del archivo y extension
                    //para hacer mas variable el link resultante
            const link_foto=`https://appweb-201800534-p2.s3.amazonaws.com/${user}.jpg`
            //======================================================
            let newUser:object ={nombre:nombre,usuario:user,tipo_usuario:tipo_usuario,email:email,
                foto:link_foto,password:password,verify:false}

            fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
            Bdatos["usuarios"].push(newUser)
            fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
            //fs.unlinkSync(pathFile)
           
            exito_pet=true 
        }else{
            console.log("Usuario o Email ya registrado")
            fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
        }
        
    } catch (error) {
        fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4) ///si truena hay que reescribir la BD sin cambios
        console.error('Error al Registrar', error)
    }
    return res.json({"accion_exitosa":exito_pet})
})


//ELIMINAR USUARIOS 
router.post("/delUsers",async function(req:any,res:any){
    const id:number= req.body.id;
    //ELIMINO LA BASE DE DATOS ANTERIOR 
    const pathFile = path.join(__dirname,'../BaseDatos/BaseDatos.json')
    const texto:string = String(fs.readFileSync(pathFile,'utf-8'))
    let Bdatos = JSON.parse(texto);
    let exito_pet = false;
    
    let lUsers=Bdatos["usuarios"]
    if(lUsers.length!=0){
        if(id<0 || id >lUsers.length){
            console.log("Id invalido para identificar Usuario")
            fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
        }else{
            //YA QUE LOS ARRAY COMPARTEN PUNTERO SI ELIMINO ALGO DE UNA VARIABLE A LA QUE ASIGNE
            //DICHO ARRAY TAMBIEN SE ELIMINARA EN EL ORIGINAL
            const amazon_user = Bdatos["usuarios"][id]["usuario"]
            const amazon_pass = Bdatos["usuarios"][id]["password"]
            
            const resp= await _cognito.deleteUserCognitoA(req,res,amazon_user,amazon_pass);
            const data = await resp
            console.log("result of delete")
            console.log(typeof data) //ES UN STRING
            console.log(data)
            if(data=="SUCCESS"){
                fs.unlinkSync(pathFile)
                lUsers.splice(id,1)
                console.log("remove usuario exitoso ")  
                fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
                exito_pet=true
            } 
        }
    }
    console.log(exito_pet)
    res.json({"accion_exitosa":exito_pet})    
})

// AÑADIR VUELOS=================================================================
router.post("/addVuelos",function(req:any,res:any){
    const nameAgen = req.body.nameAgen;
    const ciudad_origen = req.body.ciudad_origen
    const ciudad_destino = req.body.ciudad_destino
    const dias_vuelo = req.body.dias_vuelo
    const precio = req.body.precio

    //ELIMINO LA BASE DE DATOS ANTERIOR 
    const pathFile = path.join(__dirname,'../BaseDatos/BaseDatos.json')
    const texto:string = String(fs.readFileSync(pathFile,'utf-8'))
    let Bdatos = JSON.parse(texto);
    let exito_pet = false;
    
    try {
        fs.unlinkSync(pathFile)
        let newViaje:object ={nombre_agencia:nameAgen,ciudad_origen:ciudad_origen,ciudad_destino:ciudad_destino,dias_vuelo:dias_vuelo,precio:precio}
        Bdatos["viajes"].push(newViaje)
        fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
        exito_pet=true  
    } catch (error) {
        console.error('Error al eliminar Viaje', error)
        fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4) ///si truena hay que reescribir la BD sin cambios
    }
    return res.json({"accion_exitosa":exito_pet})
})
//ELIMINAR VUELOS
router.post("/delVuelos",function(req:any,res:any){
    const id:number= req.body.id;
    //ELIMINO LA BASE DE DATOS ANTERIOR 
    const pathFile = path.join(__dirname,'../BaseDatos/BaseDatos.json')
    const texto:string = String(fs.readFileSync(pathFile,'utf-8'))
    let Bdatos = JSON.parse(texto);
    let exito_pet = false;
    
    try {
        fs.unlinkSync(pathFile)
        console.log("Archivo eliminado")
    } catch(err) {
        console.error('Error al eliminar', err)
        fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
    }

    let lviajes=Bdatos["viajes"]
    if(lviajes.length!=0){
        if(id<0 || id >lviajes.length){
            console.log("Id invalido para identificar Viaje")
            fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
        }else{
            //YA QUE LOS ARRAY COMPARTEN PUNTERO SI ELIMINO ALGO DE UNA VARIABLE A LA QUE ASIGNE
            //DICHO ARRAY TAMBIEN SE ELIMINARA EN EL ORIGINAL
            lviajes.splice(id,1)
            console.log("remove viajes exitoso")  
            fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
            exito_pet=true
        }
    }
    res.json({"accion_exitosa":exito_pet})    
})
//AÑADIR AUTOS 
router.post("/addAutos",function(req:any,res:any){
    const nameAgen = req.body.nameAgen;
    const marca = req.body.marca;
    const placa = req.body.placa;
    const modelo = req.body.modelo;
    const precio = req.body.precio;
    const ciudadH = req.body.ciudadH;
    //ELIMINO LA BASE DE DATOS ANTERIOR 
    const pathFile = path.join(__dirname,'../BaseDatos/BaseDatos.json')
    const texto:string = String(fs.readFileSync(pathFile,'utf-8'))
    let Bdatos = JSON.parse(texto);
    let exito_pet = false;
    
    try {
        fs.unlinkSync(pathFile)
        console.log("Archivo eliminado")
    } catch(err) {
        console.error('Error al eliminar', err)
        fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
    }
    try {
        let newAuto:object ={nombre_agencia:nameAgen,marca:marca,placa:placa,modelo:modelo,precio:precio,ciudadH:ciudadH}
        Bdatos["autos"].push(newAuto)
        fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
        exito_pet=true  
    } catch (error) {
        console.error('Error al eliminar Auto', error)
        fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4) ///si truena hay que reescribir la BD sin cambios
    }
    res.json({"accion_exitosa":exito_pet})
})

//ELIMINAR AUTOS
router.post("/delAutos",function(req:any,res:any){
    const id:number= req.body.id;
    //ELIMINO LA BASE DE DATOS ANTERIOR 
    const pathFile = path.join(__dirname,'../BaseDatos/BaseDatos.json')
    const texto:string = String(fs.readFileSync(pathFile,'utf-8'))
    let Bdatos = JSON.parse(texto);
    let exito_pet = false;
    
    try {
        fs.unlinkSync(pathFile)
        console.log("Archivo eliminado")
    } catch(err) {
        console.error('Error al eliminar', err)
        fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
    }

    let lAutos=Bdatos["autos"]
    if(lAutos.length!=0){
        if(id<0 || id >lAutos.length){
            console.log("Id invalido para identificar Usuario")
            fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
        }else{
            //YA QUE LOS ARRAY COMPARTEN PUNTERO SI ELIMINO ALGO DE UNA VARIABLE A LA QUE ASIGNE
            //DICHO ARRAY TAMBIEN SE ELIMINARA EN EL ORIGINAL
            lAutos.splice(id,1)
            console.log("remove Autos exitoso")  
            fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
            exito_pet=true
        }
    }
    res.json({"accion_exitosa":exito_pet})    
})
//FORMATEAR BASE DE DATOS 
router.post("/FDB",function(req:any,res:any){
    const pathFile = path.join(__dirname,'../BaseDatos/BaseDatos.json')
    try {
        fs.unlinkSync(pathFile)
        console.log("Base de Datos Formateada")
    } catch(err) {}

    const admin:object = {nombre:"admin",usuario:"admin",tipo_usuario:"A",foto:"",email:"admin",password:"admin",verify:true}
    const Bdatos:Object = {usuarios:[admin],autos:[],viajes:[],renta_vuelos:[],renta_autos:[],RentasR:[]}
    fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
    const exito_pet=true
    res.json({"accion_exitosa":exito_pet})    
})



module.exports=router;
