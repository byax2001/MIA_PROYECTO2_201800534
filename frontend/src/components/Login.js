import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom'


//las funciones deben de empezar por mayusculas
function Login (props){
    //------------------------------------------
    const navigate=useNavigate()
    const [user,setUser]=useState("default")
    const [password,setPass]=useState("default")
    //-------------------------------------------

    const LogM=async(user,password)=>{
        
        const url="http://localhost:8080/usuarios/vLog"
         let config={
            method:'POST', 
            body:JSON.stringify({usuario:user,password:password}),      //ELEMENTOS A ENVIAR
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }     
        }
        const res= await fetch(url,config)
        const data_res =await res.json()
        
        const loginC = data_res["login_correcto"]
        if(loginC){
            const tipo_user = data_res["tipo_usuario"]
            const usuarioBD=data_res["usuario"]
            const foto = data_res["foto"]
            if(tipo_user=="A"){
                navigate("/initA",{state:{user:usuarioBD,foto:foto,PageSol:"login"}})
            }else if (tipo_user=="R"){
                navigate("/initR",{state:{user:usuarioBD,foto:foto,PageSol:"login"}})
            }else{
                navigate("/initT",{state:{user:usuarioBD,foto:foto,PageSol:"login"}})
            }   
        } else{
            let error = "Contraseña o Usuario Incorrectos o Usuario no verificado"
            alert(error)
        }
    }

    
    return(
        <React.Fragment>

        <header align="center"><div className="d-flex justify-content-center"><h1>Login</h1></div></header>
            <div className="container mx-auto">
                <div className="row">
                <div className="col-7">
                    
                </div>
                <div className="col-5">
                    <div className="row my-5"></div>
                    <div className="row my-5"></div>
                    <div className="row my-5"></div>
                    <form className="form-group">
                        <label className="row">
                            Nombre de Usuario: 
                            <input  onChange={(e)=>{setUser(e.target.value)}}  className="text-dark"></input>
                        </label>
                        <label className="row mb-5">
                            Contraseña: 
                            <input type="password" onChange={(e)=>{setPass(e.target.value)}} className="text-dark"></input>
                        </label>
                    </form>
                    <div className="row">
                        <div className="col-6">
                            <button className="btn btn-dark btnEffect" onClick={()=>{LogM(user,password)}}>Login</button>
                        </div>
                        <div className="col-6">
                        <button className="btn btn-dark btnEffect ml-3" onClick={()=>{navigate("/regUser")}}>Registrarse</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </React.Fragment> 
            
    );

    
    /*    "usuarios":{"nombre":"Admin Jose","usuario":"nickname200","tipo_usuario":"tipoUser","email":"jose@gmail.com","password": "password"},
        
        "autos":{"nombre_agencia":"bam","marca":"marca", "modelo":1234,"precio":5585,"ciudad de hospedaje":"Amatitlan"},
        
        "viajes":{"nombre_agencia":"BAM","ciudad_orign":"guatemala","ciudad_destino":"guatemala","precio":232
                }
    } 
    */
    
}
export default Login;