import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom'

function Inicio_admin (props){
    const navigate=useNavigate()
    const [user,setUser]=useState(0)
    const [password,setPass]=useState(0)    


    
    const LogM=async(user,password)=>{
         const url="http://localhost:4000/api/Proyecto2/Usuario"
         let config={
            method:'GET',       //ELEMENTOS A ENVIAR
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
        }
        
        navigate("/rentaAutos")
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
                    <div className="row">
                        <div className="col-6">
                            <button className="btn btn-dark btnEffect" onClick={()=>{LogM(user,password)}}>Login</button>
                        </div>
                        <div className="col-6">
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </React.Fragment>
    );
    }
export default Inicio_admin;