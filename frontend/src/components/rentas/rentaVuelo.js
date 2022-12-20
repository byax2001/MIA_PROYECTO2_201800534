import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom'


//las funciones deben de empezar por mayusculas
function RentaVuelos(props) {
  /*
a. Nombre de agencia
b. Ciudad de Origen
c. Ciudad de Destino
d. Días de vuelo
e. Precio de vuelo*/

    const navigate = useNavigate();
    const [nameAgen, setNameAgen] = useState(0);
    const [cityOrigen, setCityOrigen] = useState(0);
    const [cityDestino, setCityDestino] = useState(0);
    const [diasvuelo, setDiasVuelo] = useState(0);
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
        <header align="center"><h1>Rentar Vuelos</h1></header>
            <div className="container col-6 mx-auto text-center">
            <form className="">
                <label className="row">
                    Nombre de Agencia: 
                    <input  onChange={(e)=>{setNameAgen(e.target.value)}}  className="text-dark"></input>
                </label>
                <label className="row mb-5">
                    Ciudad de Origen:
                    <input onChange={(e)=>{setCityOrigen(e.target.value)}} className="text-dark"></input>
                </label>
                <label className="row mb-5">
                    Ciudad de Destino:
                    <input onChange={(e)=>{setCityDestino(e.target.value)}} className="text-dark"></input>
                </label>
                <label className="row mb-5">
                    Dias de Vuelo:
                    <input onChange={(e)=>{setDiasVuelo(e.target.value)}} className="text-dark"></input>
                </label>
                <label className="row mb-5">
                    Precio:
                    <input onChange={(e)=>{setPrecio(e.target.value)}} className="text-dark"></input>
                </label>
            </form>
                <button className="btn btn-dark btnEffect" onClick={()=>{Registrar()}}>Registrar</button>
            </div>
        </React.Fragment> 
            
    );
}

  
export default RentaVuelos;