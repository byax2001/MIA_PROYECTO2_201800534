import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom'


//las funciones deben de empezar por mayusculas
function Reg_recep (props){
    /*a
a. Nombre completo
b. Usuario
c. Foto de perfil
d. Correo electrónico
e. Contraseña
f. Confirmación de contraseña */



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
        <header align="center"><h1>Registrar Receptores</h1></header>
            <div className="container col-6 mx-auto text-center">
            <form className="">
            <label className="row">
                    Nombre de Usuario: 
                    <input  onChange={(e)=>{setUser(e.target.value)}}  className="text-dark"></input>
                </label>
                <label className="row mb-5">
                    User: 
                    <input onChange={(e)=>{setUser(e.target.value)}} className="text-dark"></input>
                </label>
                <label className="row mb-5">
                    Foto: 
                    <input onChange={(e)=>{setFoto(e.target.value)}} className="text-dark"></input>
                </label>
                <label className="row mb-5">
                    Email: 
                    <input onChange={(e)=>{setEmail(e.target.value)}} className="text-dark"></input>
                </label>
                <label className="row mb-5">
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
        </React.Fragment> 
            
    );

    
}

  
export default Reg_recep;