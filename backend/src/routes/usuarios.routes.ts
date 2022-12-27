import { Console } from "console";

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
const _cognito= require('../middleware/Cognito');
const _bucket = require('../middleware/Bucket')
const multer = require('multer')
const sharp = require('sharp')

router.get('/',(req:any,res:any)=>{
    res.json({holaaa: "wprld"})
})
//localhost:8080/usuarios/getUsers sera el link de esto por la estructura del proyecto


//Verificar login correcto
router.post('/vLog',async function(req:any,res:any){
    const usuario:string=req.body.usuario;
    const password:string=req.body.password;

    const pathFile = path.join(__dirname,'../BaseDatos/BaseDatos.json')
    const texto:string = String(fs.readFileSync(pathFile,'utf-8'))
    let Bdatos = JSON.parse(texto);
    let tipoUser:string = "null"
    let usuarioBD:string =""
    let login_correcto:boolean= false
    let verify:boolean=false
    console.log(`usuario: ${usuario}  contra: ${password} pathFile: ${pathFile}`)
    console.log(`Bdatos: ${Bdatos}`)
    try{
        let usuarios:[] = Bdatos["usuarios"];
        for (let i = 0; i < usuarios.length; i++) {
            const user = usuarios[i];
            if(user["usuario"] == usuario || user["email"]==usuario){
                if(user["password"]===password){
                    if (user["verify"] === true) {
                        login_correcto = true
                        tipoUser = user['tipo_usuario']
                        usuarioBD = user['usuario']
                        verify = user["verify"]
                        break;
                    } else {
                        //await singInUser(req,res,Bdatos["usuarios"],user["usuario"]);
                        const resp = await _cognito.signInCognito(req, res)
                        //{status:true message: lorem}
                        console.log(`RESP:   ${resp}`)
                        const data = await resp
                        const email_verified: boolean = data["idToken"]["payload"]["email_verified"]
                        console.log(email_verified)
                        let x = 0
                        const users = Bdatos["usuarios"]
                        if (email_verified) {
                            for (let i = 0; i < users.length; i++) {
                                const _user = users[i];
                                if (_user["usuario"] === user["usuario"]) {
                                    console.log("CONSOLE LOG VERIFICADO")
                                    _user["verify"] = true
                                    break;
                                }
                                x++;

                            }
                        }
                        if(user["verify"]===true){
                            login_correcto=true
                            tipoUser=user['tipo_usuario']
                            usuarioBD = user['usuario']
                            verify = user["verify"]
                            console.log("CONFIRMADODOODODODOD")
                            fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',"\t")
                            
                        }else{
                            console.log("FALTA POR CONFIRMAR VIA EMAIL")
                        }
                        break;
                    }   
                    
                }
            }
        }
    }catch(e){
        console.log(e)
    }
    res.json({"tipo_usuario":tipoUser,"login_correcto":login_correcto,"usuario":usuarioBD,"verify":verify})
})

//----------------------------------------------------------------
router.post("/pruebaFoto",async function(req:any,res:any){
    /*const storage = multer.diskStorage({
        destination:(req:any,file:any,cb:any)=>{
            cb(null,"./images")
        },
        filename:(req:any,file:any,cb:any)=>{
            cb(null,file.originalname)
        },
    })
    const uploadStorage = multer({storage:storage}) //ACTIVA EL METODO
    uploadStorage.array(req.foto,1000)//manda a crear el file[0]*/

    const resp2 = await _bucket.Upload(req,res)
    const data2 = await resp2
    console.log(data2)
})

//-----------------------------------------------------------------
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
        //CONTROL + SHIFT + J PARA FORMATEAR ELEMENTOS EN FORMATO JSON
        exito_pet=true
    }catch(err){
        console.log(err)
        fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4) ///si truena hay que reescribir la BD sin cambios
    }
    res.json({"accion_exitosa":exito_pet})    
})

//RESERVAR  VUELOS
router.post("/rVuelos",(req:any,res:any)=>{
    const user = req.body.usuario;
    const nombre_agencia = req.body.nameAgen;
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
        let newPetiton:object={usuario:user,nombre_agencia:nombre_agencia,ciudad_origen:ciudad_origen,ciudad_destino:ciudad_destino,dias_vuelo:dias_vuelo,precio:precio,estado:estado}
        Bdatos["renta_vuelos"].push(newPetiton)
        fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
        //CONTROL + SHIFT + J PARA FORMATEAR ELEMENTOS EN FORMATO JSON
        exito_pet=true
    }catch(err){
        console.error('Error al Escribir', err)
        fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4) ///si truena hay que reescribir la BD sin cambios
    }
    res.json({"accion_exitosa":exito_pet})    
})


//---------------------------------------------GETS--------------------------
router.get("/getUsers",function(req:any,res:any){
    const pathFile = path.join(__dirname,'../BaseDatos/BaseDatos.json')
    const texto:string = String(fs.readFileSync(pathFile,'utf-8'))
    let Bdatos = JSON.parse(texto);
    res.json({contenido:Bdatos["usuarios"]})
})
router.get("/getViajes",function(req:any,res:any){
    const pathFile = path.join(__dirname,'../BaseDatos/BaseDatos.json')
    const texto:string = String(fs.readFileSync(pathFile,'utf-8'))
    let Bdatos = JSON.parse(texto);
    res.json({contenido:Bdatos["viajes"]})
})
router.get("/getAutos",function(req:any,res:any){
    const pathFile = path.join(__dirname,'../BaseDatos/BaseDatos.json')
    const texto:string = String(fs.readFileSync(pathFile,'utf-8'))
    let Bdatos = JSON.parse(texto);
    res.json({contenido:Bdatos["autos"]})
})
router.get("/getHistorial",function(req:any,res:any){
    const pathFile = path.join(__dirname,'../BaseDatos/BaseDatos.json')
    const texto:string = String(fs.readFileSync(pathFile,'utf-8'))
    let Bdatos = JSON.parse(texto);
    res.json({contenido:Bdatos["RentasR"]})
})

router.get("/Pr_vuelos",function(req:any,res:any){
    const pathFile = path.join(__dirname,'../BaseDatos/BaseDatos.json')
    const texto:string = String(fs.readFileSync(pathFile,'utf-8'))
    let Bdatos = JSON.parse(texto);
    res.json({contenido:Bdatos["renta_vuelos"]})
})
router.get("/Pr_autos",function(req:any,res:any){
    const pathFile = path.join(__dirname,'../BaseDatos/BaseDatos.json')
    const texto:string = String(fs.readFileSync(pathFile,'utf-8'))
    let Bdatos = JSON.parse(texto);
    res.json({contenido:Bdatos["renta_autos"]})
})





module.exports=router;