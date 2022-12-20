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
    const [email, setEmail] = useState(0);
    const [password, setPass] = useState(0);
    const [conf_pass, setConf_pass] = useState(0);
    
    const Registrar = async () => {
        const url = "";
        let config = {
            method: "POST", //ELEMENTOS A ENVIAR
            body: JSON.stringify([{ nameC: nameC }]),
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
        };
        const res = await fetch(url, config);
        const data_res = await res.json();
        console.log(data_res);
    };

    return(
        <React.Fragment>
        <header align="center"><h1>Registrar Usuarios</h1></header>
        <Link id="BtnHome" to="/" className="btn btn-dark btnEffect">Home</Link>
        <div className="container">
            <div className="row">
                <div className="col-7"></div>
                <div className="col-5">
                    <div className="row my-2"></div>
                    <form className="form-group">
                        <label className="row">
                            Nombre de Usuario: 
                            <input  onChange={(e)=>{setUser(e.target.value)}}  className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            User: 
                            <input onChange={(e)=>{setUser(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Foto: 
                            <input onChange={(e)=>{setFoto(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Email: 
                            <input onChange={(e)=>{setEmail(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Contraseña:
                            <input onChange={(e)=>{setPass(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-5">
                            Confirmar Contraseña
                            <input onChange={(e)=>{setConf_pass(e.target.value)}} className="text-dark"></input>
                        </label>
                    </form>
                    <button className="btn btn-dark btnEffect" onClick={()=>{Registrar()}}>Registrar</button>
                </div>
            </div>
            
        </div>
        </React.Fragment> 
            
    );

    
}

  
export default Reg_users;