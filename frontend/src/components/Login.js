import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom'


//las funciones deben de empezar por mayusculas
function Login (props){
    const navigate=useNavigate()
    const [user,setUser]=useState(0)
    const [password,setPass]=useState(0)

    
    const LogM=async(user,password)=>{
        /*
        const url="http://localhost:4000/api/Proyecto2/Usuario"
         let config={
            method:'GET',       //ELEMENTOS A ENVIAR
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
        }
        const res= await fetch(url,config)
        const data_res =await res.json()
        console.log(data_res)
        let x=0;
        for(let i=0; i<data_res.length;i++){
            if(data_res[i].nombreUsu==user && data_res[i].pass==password){    
                navigate("/pAux",{state:{id:data_res[i].id,Nombre:user,PageSol:"login"}})
                x=1
                break;
            }else if(data_res[i].email==user && data_res[i].pass==password){    
                navigate("/pAux",{state:{id:data_res[i].id,Nombre:user,PageSol:"login"}})
                x=1
                break;
            }
        }
        if(x===0){
            alert("Contraseña o Usuario Incorrectos")
        }   */
        navigate("/RegUser")
    }

    
    return(
        <React.Fragment>
        <header align="center"><h1>Login Avicar</h1></header>
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
                    <button className="btn btn-dark btnEffect" onClick={()=>{LogM(user,password)}}>Login</button>
                </div>
                </div>
            </div>
        </React.Fragment> 
            
    );

    
}

  
export default Login;