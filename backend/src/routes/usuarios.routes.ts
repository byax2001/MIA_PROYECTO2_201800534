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

router.get('/getUsers',(req:any,res:any)=>{
    res.json({sdfsdf: a})
})
//
router.post('/vLog',function(req:any,res:any){
    let usuario:string=req.body.user;
    let password:string=req.body.password;

    const pathFile = path.join(__dirname,'../BaseDatos/BaseDatos.json')
    const texto:string = String(fs.readFileSync(pathFile,'utf-8'))
    let Bdatos = JSON.parse(texto);
    let tipoUser:string = "null"
    let login_correcto:boolean= false
    try{
        let usuarios:[] = Bdatos.usuarios;
        usuarios.forEach((usuario)=>{
            if(usuario['usuario'] === usuario || usuario['email']==usuario){
                if(usuario['password']===password){
                    login_correcto=true
                    tipoUser=usuario['tipo_usuario']
                    return;
                }
            }
        })
    }catch(e){
        alert("ERROR AL LEER EL ARCHIVO")
    }
    
    res.json({"tipo_usuario":tipoUser,"login_correcto":login_correcto})
})


module.exports=router;