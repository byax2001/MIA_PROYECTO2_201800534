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
const columnas=[
    {
        name:'ID',
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
function Reg_autos (props){
    /*a
a. Nombre de la agencia
b. Marca
c. Placa
d. Modelo
e. Precio
f. Ciudad en la que se encuentra el vehículo*/

    const navigate = useNavigate();
    const [nameAgen, setNameAgen] = useState(0);
    const [marca, setMarca] = useState(0);
    const [placa, setPlaca] = useState(0);
    const [modelo, setModelo] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [ciudad, setCiudad] = useState(0);
    const [id_del,setId_del] = useState("");
    const [datosTabla,setDatosTabla] = useState([])
  

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
    const Registrar = function(){

    }
    useEffect(() => {
        RdatosTabla()
    },[]);


    return(
        <React.Fragment>
        <header align="center"><h1>Administrar Autos</h1></header>
        <Link id="BtnHome" to="/initA" className="btn btn-dark btnEffect">Regresar</Link>
        <div className="container">
            <div className="row">
                <div className="col-7">
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
                            Placa
                            <input onChange={(e)=>{setPlaca(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Modelo
                            <input onChange={(e)=>{setModelo(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Precio
                            <input onChange={(e)=>{setPrecio(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Ciudad en la que se encuentra el vehiculo:
                            <input onChange={(e)=>{setCiudad(e.target.value)}} className="text-dark"></input>
                        </label>
                    </form>
                <button className="btn btn-dark btnEffect mb-3" onClick={()=>{Registrar()}}>Registrar</button>
                <div className="row">
                    <input onChange={(e)=>{setId_del(e.target.value)}} placeholder="INGRESE AQUI ID A ELIMINAR" className="text-dark mb-1"/>
                    <button className="col-2 btn btn-dark btnEffect" onClick={()=>{}}>Eliminar</button>  
                </div>
                </div>
            </div>
            
        </div>
        </React.Fragment> 
            
    );

    
}

  
export default Reg_autos;