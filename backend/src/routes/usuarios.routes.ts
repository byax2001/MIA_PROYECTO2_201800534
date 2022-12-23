declare var require: any;
const {Router} = require('express')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const {check} = require('express-validator')
const validarAtributo= require('../middleware/validarAtributo');
require('dotenv').config()
const router = Router()
const usuariosController = require('../controllers/usuarios.controllers.ts')


router.get('/',(req:any,res:any)=>{
    res.json({holaaa: "hijooo"})
})
const a = 2232323;
//localhost:8080/usuarios/getUsers sera el link de esto por la estructura del proyecto
router.get('/getUsers',(req:any,res:any)=>{
    res.json({sdfsdf: a})
})

//Verificar login correcto
router.post('/vLog',function(req:any,res:any){
    const usuario:string=req.body.usuario;
    const password:string=req.body.password;

    const pathFile = path.join(__dirname,'../BaseDatos/BaseDatos.json')
    const texto:string = String(fs.readFileSync(pathFile,'utf-8'))
    let Bdatos = JSON.parse(texto);
    let tipoUser:string = "null"
    let login_correcto:boolean= false

    console.log(`usuario: ${usuario}  contra: ${password} pathFile: ${pathFile} texto:${texto}`)
    console.log(`Bdatos: ${Bdatos}`)
    try{
        let usuarios:[] = Bdatos["usuarios"];
        usuarios.forEach((user)=>{
            if(user["usuario"] == usuario || user["email"]==usuario){
                if(user["password"]===password && user["verify"]===true){
                    login_correcto=true
                    tipoUser=user['tipo_usuario']
                    return;
                }
            }
        })
    }catch(e){
        console.log(e)
    }
    
    res.json({"tipo_usuario":tipoUser,"login_correcto":login_correcto})
})

//RESERVAR AUTOS
router.post("/rAutos",(req:any,res:any)=>{
    const user = req.body.usuario;
    const nameAgen = req.body.nameAgen;
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const precio = req.body.precio;
    const estado:string = "sin resolver"
    //ELIMINO LA BASE DE DATOS ANTERIOR 
    const pathFile = path.join(__dirname,'../BaseDatos/BaseDatos.json')
    const texto:string = String(fs.readFileSync(pathFile,'utf-8'))
    console.log(`usuario:${user} nameAgen:${nameAgen} marca:${marca} modelo:${modelo} precio: ${precio} estado: ${estado} texto:${texto}`)
    let Bdatos = JSON.parse(texto);
    let exito_pet = false;
    try {
        fs.unlinkSync(pathFile)
        console.log("Archivo eliminado")
    } catch(err) {
        console.error('Error al eliminar', err)
    }
   
      
    try{
        let newPetiton:object={usuario:user,nombre_agencia:nameAgen,marca:marca,modelo:modelo,precio:precio,estado:estado}
        Bdatos["renta_autos"].push(newPetiton)
        fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',"\t")
        fs.close();
        //CONTROL + SHIFT + J PARA FORMATEAR ELEMENTOS EN FORMATO JSON
        exito_pet=true
    }catch(err){
        console.log(err)
    }
    res.json({"accion_exitosa":exito_pet})    
})

//RESERVAR  VUELOS
router.post("/rVuelos1",(req:any,res:any)=>{
    const user = req.body.usuario;
    const nombre_agencia = req.body.nombre_agencia;
    const ciudad_origen = req.body.ciudad_origen
    const ciudad_destino = req.body.ciudad_origen
    const dias_vuelo = req.body.dias_vuelo;
    const precio = req.body.precio;
    const estado:string = "sin resolver"

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
      
    try{
        let newPetiton:object={usuario:user,name_agencia:nombre_agencia,ciudad_origen:ciudad_origen,ciudad_destino:ciudad_destino,dias_vuelo:dias_vuelo,precio:precio,estado:estado}
        Bdatos["renta_vuelos"].push(newPetiton)
        fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
        fs.close();
        //CONTROL + SHIFT + J PARA FORMATEAR ELEMENTOS EN FORMATO JSON
        exito_pet=true
    }catch(err){
        console.error('Error al Escribir', err)
    }
    res.json({"accion_exitosa":exito_pet})    
})

/*
44

    const Reservar_autos=function(){

}
const Reservar_Aviones=()=>{

}
*/




module.exports=router;