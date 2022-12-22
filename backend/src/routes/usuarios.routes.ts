declare var require: any;
const {Router} = require('express')
const fs = require('fs')
const readline = require('readline')
const {check} = require('express-validator')
const validarAtributo= require('../middleware/validarAtributo');
require('dotenv').config()
const router = Router()
const usuariosController = require('../controllers/usuarios.controllers.ts')
/*

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
    File = fs.open("../BaseDatos/BaseDatos.json")
    let CBdatos = File.toString()
    let Bdatos = JSON.stringify(CBdatos);

    
    if(usuario.includes("@")){
    }else{

    }
})

router.post('/getUser',[
    check('id', 'El id es obligatorio').not().isEmpty(),
    validarAtributo
    ],
    usuariosController.getUser
)
*/
module.exports=router;