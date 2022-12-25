// @ts-ignore    Se escribe esta linea pues ts-ignore esta dando unos problemas de duplicacion
import Router from 'express';
const {signUpCognito} = require('../middleware/Cognito.ts');
const fs = require('fs')
const path = require('path')
const {check} = require('express-validator')
const _cognito= require('../middleware/Cognito');
require('dotenv').config()
const router = Router()

//AÑADIR USUARIOS
router.post("/addUsers",function(req:any,res:any){
    const nombre = req.body.nombre
    const user = req.body.usuario
    const tipo_usuario = req.body.tipo_usuario
    const foto = "safdsdf"
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
            singUpUser(req,res,pathFile,nombre,user,tipo_usuario,email,foto,password,Bdatos);
            //ELIMINACION DE LA BASE DE DATOS ANTERIOR
            exito_pet=true 
        }else{
            console.log("Usuario o Email ya registrado")
            fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
        }
        
    } catch (error) {
        fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4) ///si truena hay que reescribir la BD sin cambios
        console.error('Error al Registrar', error)
    }
    res.json({"accion_exitosa":exito_pet})
})
const singUpUser =async (req:any, res:any,pathFile:string,nombre:string,user:string,tipo_usuario:string,email:string,foto:any,password:any,Bdatos:any)=>{
    fs.unlinkSync(pathFile)
    //REGISTRO DE USUARIOS
    let newUser:object ={nombre:nombre,usuario:user,tipo_usuario:tipo_usuario,email:email,foto:foto,password:password,verify:false}
    Bdatos["usuarios"].push(newUser)
    fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
    _cognito.signUpCognito(req,res);
}

//ELIMINAR USUARIOS 
router.post("/delUsers",function(req:any,res:any){
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
    }
    let lUsers=Bdatos["usuarios"]
    if(lUsers.length!=0){
        if(id<0 || id >lUsers.length){
            console.log("Id invalido para identificar Usuario")
            fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
        }else{
            //YA QUE LOS ARRAY COMPARTEN PUNTERO SI ELIMINO ALGO DE UNA VARIABLE A LA QUE ASIGNE
            //DICHO ARRAY TAMBIEN SE ELIMINARA EN EL ORIGINAL
            lUsers.splice(id,1)
            console.log("remove usuario exitoso")  
            fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
            exito_pet=true
        }
    }
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
        console.log("Archivo eliminado")
    } catch(err) {
        console.error('Error al eliminar', err)
    }
    try {
        let newViaje:object ={nombre_agencia:nameAgen,ciudad_origen:ciudad_origen,ciudad_destino:ciudad_destino,dias_vuelo:dias_vuelo,precio:precio}
        Bdatos["viajes"].push(newViaje)
        fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
        exito_pet=true  
    } catch (error) {
        console.error('Error al eliminar Viaje', error)
        fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4) ///si truena hay que reescribir la BD sin cambios
    }
    res.json({"accion_exitosa":exito_pet})
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
