// @ts-ignore    Se escribe esta linea pues ts-ignore esta dando unos problemas de duplicacion
import Router from 'express';
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const {check} = require('express-validator')
const validarAtributo= require('../middleware/validarAtributo');
require('dotenv').config()
const router = Router()
//Aceptar REchazar rentas
router.post("/ARrentas",function(req:any,res:any){
    
    const id:number= req.body.id;
    const user = req.body.usuario
    const tipoRenta = req.body.tipoRenta
    //Aceptado o Rechazado
    const AoR = req.body.AoR
    
    const tiempoTranscurrido = Date.now();
    const fechaNow = new Date(tiempoTranscurrido);
    const fecha = fechaNow.toUTCString();

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
 
    if (tipoRenta=="vuelo"){
        let rVuelos=Bdatos["Vuelos"]
        if(rVuelos.length!=0){
            if(id<0 || id >rVuelos.length){
                alert("Id invalido para identificar Vuelo")
            }else{
                rVuelos.splice(id,1)
                Bdatos["Vuelos"] = rVuelos
                console.log("remove Vuelos exitoso")  
                //INGRESAR AL ARRAY DE PETICIONES ATENDIDAS
                const petition:object ={usuario:user,tipoRenta:tipoRenta,AoR:AoR,fecha:fecha}  
                Bdatos["RentasR"].push(petition)
                fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
                exito_pet=true
            }
        }else{
            alert("Sin peticiones de renta de Vuelos")
        }
    }else{
        let rAutos=Bdatos["Autos"]
        if(rAutos.length!=0){
            if(id<0 || id >rAutos.length){
                alert("Id invalido para identificar Auto")
            }else{
                rAutos.splice(id,1)
                Bdatos["Vuelos"] = rAutos
                console.log("remove Autos exitoso")  
                const petition:object ={usuario:user,tipoRenta:tipoRenta,AoR:AoR,fecha:fecha}  
                Bdatos["RentasR"].push(petition)
                fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
                exito_pet=true  
            }
        }else{
            alert("Sin peticiones de renta de Autos")
        }
    }
    res.json({"accion_exitosa":exito_pet})    
})

module.exports=router;