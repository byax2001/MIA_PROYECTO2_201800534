import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate,useLocation} from 'react-router-dom'
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
            backgroundColor:"#9b9b9b",
        },
        stripedStyle: {
			backgroundColor: "#646464",
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
const columnas=[
    {
        name:'No',
        selector: row => row.no,
        sortable:true,
    },
    {
        name:'Nombre de Agencia',
        selector: row => row.nombre_agencia,
        sortable:true,
    },{
        name:'Marca',
        selector: row => row.marca,
        sortable:true
    },{
        name:'Placa',
        selector: row => row.placa,
        sortable:true
    },{
        name:'Modelo',
        selector: row => row.modelo,
        sortable:true
    },{
        name:'Precio',
        selector: row => row.precio,
        sortable:true
    },{
        name:'Ciudad',
        selector: row => row.ciudadH,
        sortable:true
    }
]
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
    const [datosTabla,setDatosTabla] = useState([])
    const [user,setUser] = useState(0)
    const userR = useLocation().state


    const Rentar = async () => {
        const url = "http://localhost:8080/usuarios/rAutos";
        let renta={usuario:user,nameAgen:nameAgen,marca:marca,modelo:modelo,precio:precio}
        let config = {
        method: "POST", //ELEMENTOS A ENVIAR
        body: JSON.stringify(renta),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        };
        const res = await fetch(url, config);
        const data_res = await res.json();
        console.log(data_res);
        if(data_res["accion_exitosa"]){
            alert("Peticion de Renta de Vuelo con Exito")
        }
    };
    const RdatosTabla = async () => {
        const url = "http://localhost:8080/usuarios/getAutos";
        let config = {
            method: "GET", //ELEMENTOS A ENVIAR
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
        };
        const res = await fetch(url, config);
        const data_res = await res.json();
        console.log(data_res);
        let DataT =[] 
        DataT=data_res["contenido"]
        for (let i = 0; i < DataT.length; i++) {
            DataT[i]["no"]=i
        }
        console.log(DataT)
        setDatosTabla(DataT)
    };
    useEffect(() => {
        RdatosTabla()
        if(userR!=null){
            setUser(userR.user)
        }
    },[]);

    return(
        <React.Fragment>
        <header align="center"><h1>Renta de Autos </h1></header>
        <Link id="BtnHome" to="/initT" className="btn btn-dark btnEffect">Regresar</Link>
        <div className="container">
            <div className="row">
                <div className="col-7 p-4">
                <DataTable 
                    columns={columnas}
                    data={datosTabla}
                    customStyles={customStyles}
                    title="Autos"
                    striped
                    noDataComponent="No hay autos disponibles"
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    /> 
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