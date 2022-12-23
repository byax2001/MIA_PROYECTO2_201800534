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
    useEffect(() => {
        
    });

    const LogM=async(user,password)=>{
        
        const url="http://localhost:8080/usuarios/vLog"
         let config={
            method:'GET', 
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
            if(tipo_user=="A"){
                navigate("/initA",{state:{user:usuarioBD,PageSol:"login"}})
            }else if (tipo_user=="R"){
                navigate("/initR",{state:{user:usuarioBD,PageSol:"login"}})
            }else{
                navigate("/initT",{state:{user:usuarioBD,PageSol:"login"}})
            }   
        } else{
            let error = "Contraseña o Usuario Incorrectos o Usuario no verificado"
            alert(error)
        }
    }



    return(
        <React.Fragment>
        <header align="center"><h1>Administrar Viajes</h1></header>
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