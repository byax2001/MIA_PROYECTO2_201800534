import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom'


//las funciones deben de empezar por mayusculas
function Reg_viajes (props){
    /*
a. Nombre de la agencia
b. Ciudad de origen
c. Ciudad de destino
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
            body: JSON.stringify([{ nameC: nameAgen }]),
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
        <header align="center"><h1>Registrar Viajes</h1></header>
        <Link id="BtnHome" to="/" className="btn btn-dark btnEffect">Home</Link>
        <div className="container">
            <div className="row">
                <div className="col-7">
                    <img src={require("./images/avion.png")} width="100%" height="100%" />
                </div>
                <div className="col-5">
                    <div className="row my-2"></div>
                    <form className="form-group">
                        <label className="row">
                            Nombre de la Agencia:
                            <input  onChange={(e)=>{setNameAgen(e.target.value)}}  className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Ciudad de Origen:
                            <input onChange={(e)=>{setCityOrigen(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Ciudad de Destino: 
                            <input onChange={(e)=>{setCityDestino(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Dias de vuelo: 
                            <input onChange={(e)=>{setDiasVuelo(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-4">
                            Precio de Vuelo
                            <input onChange={(e)=>{setPrecio(e.target.value)}} className="text-dark"></input>
                        </label>
                    </form>
                    <button className="btn btn-dark btnEffect" onClick={()=>{Registrar()}}>Registrar</button>
                </div>
            </div>
            
        </div>
        </React.Fragment> 
            
    );

    
}

  
export default Reg_viajes;