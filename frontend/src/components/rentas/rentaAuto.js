import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom'


//las funciones deben de empezar por mayusculas
function RentaAutos (props){
    /*a
a. Nombre de la agencia
b. Marca
d. Modelo
e. Precio*/

    const navigate = useNavigate();
    const [nameAgen, setNameAgen] = useState(0);
    const [marca, setMarca] = useState(0);
    const [modelo, setModelo] = useState(0);
    const [precio, setPrecio] = useState(0);
    
    const Rentar = async () => {
        const url = "";
        let config = {
            method: "POST", //ELEMENTOS A ENVIAR
            body: JSON.stringify([{ nameAgen:nameAgen }]),
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
        <header align="center"><h1>Registrar </h1></header>
            <div className="container col-6 mx-auto text-center">
            <form className="">
                <label className="row">
                    Nombre de Agencia: 
                    <input  onChange={(e)=>{setNameAgen(e.target.value)}}  className="text-dark"></input>
                </label>
                <label className="row mb-5">
                    Marca:
                    <input onChange={(e)=>{setMarca(e.target.value)}} className="text-dark"></input>
                </label>
                <label className="row">
                    Modelo:  
                    <input  onChange={(e)=>{setModelo(e.target.value)}}  className="text-dark"></input>
                </label>
                <label className="row mb-5">
                    Precio: 
                    <input onChange={(e)=>{setPrecio(e.target.value)}} className="text-dark"></input>
                </label>
            </form>
                <button className="btn btn-dark btnEffect" onClick={()=>{Rentar()}}>Registrar</button>
            </div>
        </React.Fragment> 
            
    );

    
}

  
export default RentaAutos;