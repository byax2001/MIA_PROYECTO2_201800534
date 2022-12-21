import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom'

function Inicio_recep (props){
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
        <header align="center"><h1>Usuario Turista:</h1></header>
        <Link id="BtnHome" to="/" className="btn btn-dark btnEffect">Home</Link>
        <Link id="BtnHome" to="/" className="btn btn-dark btnEffect">Home</Link>
        <Link id="BtnHome" to="/" className="btn btn-dark btnEffect">Home</Link>
        </React.Fragment>
    );
    }
export default Inicio_recep;