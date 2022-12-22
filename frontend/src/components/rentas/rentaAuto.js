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
        <header align="center"><h1>Renta de Autos </h1></header>
        <Link id="BtnHome" to="/initT" className="btn btn-dark btnEffect">Regresar</Link>
        <div className="container">
            <div className="row">
                <div className="col-7 p-4">
                    <img  src={require("./images/car.png")} width="100%" height="100%" />
                </div>
                <div className="col-5">
                    <div className="row my-2"></div>
                    <form className="form-group">
                        <label className="row">
                            Nombre de la Agencia
                            <input  onChange={(e)=>{setNameAgen(e.target.value)}}  className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Marca
                            <input onChange={(e)=>{setMarca(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Modelo
                            <input onChange={(e)=>{setModelo(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Precio
                            <input onChange={(e)=>{setPrecio(e.target.value)}} className="text-dark"></input>
                        </label>
                    </form>
                    <button className="btn btn-dark btnEffect" onClick={()=>{Rentar()}}>Registrar</button>
                </div>
            </div>
        </div>
        </React.Fragment> 
            
    );

    
}

  
export default RentaAutos;