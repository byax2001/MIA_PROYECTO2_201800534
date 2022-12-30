import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom'


//las funciones deben de empezar por mayusculas
function Reg_users (props){
    /*a
a. Nombre completo
b. Usuario
c. Foto de perfil
d. Correo electrónico
e. Contraseña
f. Confirmación de contraseña */

//HACER UN APARTADO PARA COLOCAR EL CODIGO DE CONFIRMACION ENVIADO A EMAIL, DICHO APARTADO SERA INVISIBLE 
//HASTA QUE SE PRESIONE REGISTRAR Y LA CONTRASEÑA SEA CORRECTA

    const navigate = useNavigate();
    const [nameC, setNameC] = useState(0);
    const [user, setUser] = useState(0);
    const [foto, setFoto] = useState(0);
    const [image_b64, setImage_b64] = useState(0)
    const [email, setEmail] = useState(0);
    const [password, setPass] = useState(0);
    const [conf_pass, setConf_pass] = useState(0);
    

    


    const pruebaFoto=async()=>{
        //const ib64_i=await convertBase64(foto)///CONVERTIR IMAGEN A BASE 64
        setImage_b64(await convertBase64(foto))
        console.log(image_b64)
        let newUser ={nombre:nameC,usuario:user,tipo_usuario:"T",email:email,foto:image_b64,password:password,verify:false}
        const url = `${process.env.REACT_APP_API_CONSUME}/usuarios/pruebaFoto`;
        let config = {
            method: "POST", //ELEMENTOS A ENVIAR
            body: JSON.stringify(newUser),
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
        };
        const res = await fetch(url, config);
        const data_res = await res.json();
        console.log(data_res);
    }
    const uploadImage=async()=>{
        const ib64 = await convertBase64(foto)
        console.log(ib64)
    }
    const convertBase64= (file)=>{
        //SI NO APLICAS EL RESOLVE O EL REJECT EN ALGUNA PARTE EL PROGRMA TRUENA
        return new Promise((resolve,reject)=>{
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload=()=>{
                resolve(fileReader.result)
            }
            fileReader.onerror=(error)=>{
                reject(error)
            }
        })
    }

    const RegistrarU = async () => {
        const ib64_i=await convertBase64(foto)///CONVERTIR IMAGEN A BASE 64
        setImage_b64(await convertBase64(foto))
        if(ib64_i==0 || image_b64==0 || image_b64==undefined){
            alert("Problemas con el renderizado de la Imagen, por favor intente de Nuevo")
            return
        }
        let newUser ={nombre:nameC,usuario:user,tipo_usuario:"T",email:email,foto:image_b64,password:password,verify:false}
        if(password!==conf_pass){
            alert("Las contraseñas deben de ser iguales")
            return
        }
        const url = `${process.env.REACT_APP_API_CONSUME}/admin/addUsers`;
        let config = {
            method: "POST", //ELEMENTOS A ENVIAR
            body: JSON.stringify(newUser),
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
        };
        const res = await fetch(url, config);
        const data_res = await res.json();
        console.log("data ressssss")
        console.log(data_res);
        //POR EL RETURN DEL AWAIT BUCKET IMAGES ME RETORNA UN OBJETO:
        /*{ message:"Imagen Ingresada correctamente", status: true, accion_exitosa:true} */
        //por lo que se toma este res y no el del puerto que se consulta que seria : {accion_exitosa:true} nomas
        if(data_res["accion_exitosa"]){
            alert("Registro de Usuario Exitoso")
        }else{
            alert("Fallo al Registrar Usuario")
        }
    };

    return(
        <React.Fragment>
        <header align="center"><h1>Registrar Usuarios</h1></header>
        <Link id="BtnHome" to="/" className="btn btn-dark btnEffect">Home</Link>
        <div className="container">
            <div className="row">
                <div className="col-7">
                    <img src={require("./images/avion.png")} width="100%" height="100%" />
                </div>
                <div className="col-5">
                    <div className="row my-2"></div>
                    <form className="form-group">
                        <label className="row">
                            Nombre de Usuario: 
                            <input  onChange={(e)=>{setNameC(e.target.value)}}  className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            User: 
                            <input onChange={(e)=>{setUser(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Foto: 
                            <input type="file" onChange={(e)=>{setFoto(e.target.files[0])}} className="text-white"></input>
                        </label>
                        <label className="row mb-1">
                            Email: 
                            <input onChange={(e)=>{setEmail(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Contraseña:
                            <input type="password" onChange={(e)=>{setPass(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-4">
                            Confirmar Contraseña
                            <input type="password" onChange={(e)=>{setConf_pass(e.target.value)}} className="text-dark"></input>
                        </label>
                    </form>
                    <button className="btn btn-dark btnEffect" onClick={()=>{RegistrarU()}}>Registrar</button>
                    {/*<button className="btn btn-dark btnEffect" onClick={()=>{pruebaFoto()}}>FOTO</button>*/}
                </div>
            </div>
            
        </div>
        </React.Fragment> 
            
    );

    
}

  
export default Reg_users;