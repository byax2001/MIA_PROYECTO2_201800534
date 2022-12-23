import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'

const customStyles = {
    noData: {
		style: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#a2a2a2',
		},
	},
    header: {
        
		style: {
            justifyContent: 'center',
			fontSize: '22px',
			color: 'red',
			backgroundColor:"#3a3a3a",
			minHeight: '56px',
			paddingLeft: '16px',
			paddingRight: '8px',
		},
	},
    rows: {
        //para variar colores entre fila y fila 
        //style fila 1
        //stripedstyle fila2
        style: {
            backgroundColor:"#a3a3a3",
        },
        stripedStyle: {
			backgroundColor: "#bbbbbb",
		},
    },
    headCells: {
        style: {
            backgroundColor:"#3a3a3a",
            
        },
    },
   
    pagination: {
		style: {
			fontSize: '13px',
            color:'white',
			minHeight: '56px',
			backgroundColor: '#3a3a3a',
			borderTopStyle: 'solid',
			borderTopWidth: '4px',
			borderTopColor: 'd2d2d2',
		}}
};
const colum_nameUser=[
    {
        name:'No',
        selector: row => row.no,
        sortable:true,
    },
    {
        name:'Nombre de Agencia',
        selector: row => row.agencia,
        sortable:true,
    },{
        name:'Ciudad de Origen',
        selector: row => row.origen,
        sortable:true
    },{
        name:'Ciudad de Destino',
        selector: row => row.destino,
        sortable:true
    },{
        name:'Dias de Vuelo',
        selector: row => row.diasvuelo,
        sortable:true
    },{
        name:'Precio de Vuelo',
        selector: row => row.precio,
        sortable:true
    }
]
//las funciones deben de empezar por mayusculas
function Reg_users (props){
    /*a
a. Nombre completo
b. Usuario
c. Foto de perfil
d. Correo electrónico
e. Contraseña
f. Confirmación de contraseña */

//HACER UN APARTADO PARA COLOCAR EL CODIGO DE CONFIRMACION ENVIADO A EMAIL, DICHO APARTADO SERA INVISIBLE 
//HASTA QUE SE PRESIONE REGISTRAR Y LA CONTRASEÑA SEA CORRECTA

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
    useEffect(() => {
       
    });
    return(
        <React.Fragment>
        <header align="center"><h1>Administrar Usuarios</h1></header>
        <Link id="BtnHome" to="/initA" className="btn btn-dark btnEffect">Regresar</Link>
        <div className="container">
            <div className="row">
                <div className="col-7">
                    <img src={require("./images/avion.png")} width="100%" height="100%" />
                </div>
                <div className="col-5">
                    <div className="row my-2"></div>
                    <form className="form-group">
                        <label className="row">
                            Nombre de Usuario: 
                            <input  onChange={(e)=>{setNameC(e.target.value)}}  className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            User: 
                            <input onChange={(e)=>{setUser(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Foto: 
                            <input onChange={(e)=>{setFoto(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Email: 
                            <input onChange={(e)=>{setEmail(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Contraseña:
                            <input onChange={(e)=>{setPass(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-4">
                            Confirmar Contraseña
                            <input onChange={(e)=>{setConf_pass(e.target.value)}} className="text-dark"></input>
                        </label>
                    </form>
                    <button className="btn btn-dark btnEffect" onClick={()=>{Registrar()}}>Registrar</button>
                </div>
            </div>
            
        </div>
        </React.Fragment> 
            
    );

    
}

  
export default Reg_users;