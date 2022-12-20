import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom'


//las funciones deben de empezar por mayusculas
function RentaVuelos (props){
    /*
a. Nombre de agencia
b. Ciudad de Origen
c. Ciudad de Destino
d. Días de vuelo
e. Precio de vuelo*/

    const navigate = useNavigate();
    const [nameAgen, setNameAgen] = useState(0);
    const [origen, setOrigen] = useState(0);
    const [destino, setDestino] = useState(0);
    const [diasVuelo, setDiasVuelo] = useState(0);
    const [precio, setPrecio] = useState(0);

    
    const Registrar = async () => {
        const url = "";
        let config = {
            method: "POST", //ELEMENTOS A ENVIAR
            body: JSON.stringify([{ nameAgen: nameAgen }]),
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
                    Nombre de Usuario: 
                    <input  onChange={(e)=>{setUser(e.target.value)}}  className="text-dark"></input>
                </label>
                <label className="row mb-5">
                    Contraseña: 
                    <input onChange={(e)=>{setPass(e.target.value)}} className="text-dark"></input>
                </label>
            </form>
                <button className="btn btn-dark btnEffect" onClick={()=>{Registrar()}}>Registrar</button>
            </div>
        </React.Fragment> 
            
    );

    
}

  
export default RentaVuelos;