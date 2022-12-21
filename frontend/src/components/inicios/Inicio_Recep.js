import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'
function Inicio_recep (props){  
    const navigate=useNavigate()
                                    //lo que esta adentro de este parentesis es su valor incial
    const [Id_pet,setId_pet]=useState(0)
    const [t_pet, setT_pet] = useState(0)
    const [Accion_pet,setAccion_pet]=useState(false)

    const colum_vuelos=[
        {
            name:'No',
            selector: row => row.No,
            sortable:true
        },
        {
            name:'Descripcion',
            selector: row => row.descripcion,
            sortable:true,
            grow:3
        },{
            name:'Ambito',
            selector: row => row.ambito,
            sortable:true
        },{
            name:'Linea',
            selector: row => row.linea,
            sortable:true
        },{
            name:'Columna',
            selector: row => row.columna,
            sortable:true
        },{
            name:'Fecha y Hora',
            selector: row => row.tiempo,
            sortable:true
        }
    ]
    const colum_autos=[
        {
            name:'No',
            selector: row => row.No,
            sortable:true
        },
        {
            name:'Descripcion',
            selector: row => row.descripcion,
            sortable:true,
            grow:3
        },{
            name:'Ambito',
            selector: row => row.ambito,
            sortable:true
        },{
            name:'Linea',
            selector: row => row.linea,
            sortable:true
        },{
            name:'Columna',
            selector: row => row.columna,
            sortable:true
        },{
            name:'Fecha y Hora',
            selector: row => row.tiempo,
            sortable:true
        }
    ]
    const [dataVuelos,setDataViajes] = useState([]);
    const [dataAutos,setDataAutos] = useState([]);
    //SE EJECUTA AL INICIO DE INICIAR LA PAGINA
    useEffect(() => {
        
    });
    
    return(
        <React.Fragment>
        <header align="center"><h1>Usuario Turista:</h1></header>
        <Link id="BtnHome" to="/" className="btn btn-dark btnEffect">Home</Link>
        <Link id="BtnHome" to="/" className="btn btn-dark btnEffect">Home</Link>
        <Link id="BtnHome" to="/" className="btn btn-dark btnEffect">Home</Link>
        <h1>Peticion de Renta de Vuelos</h1>
        <br/>
        <DataTable 
            columns={colum_vuelos}
            data={dataVuelos}
            title="Tabla de Errores"
            pagination
            fixedHeader
            fixedHeaderScrollHeight="600px"/> 
        <h1>Peticion de Renta de Autos</h1>
        <br/>
        <DataTable 
            columns={colum_autos}
            data={dataAutos}
            title="Tabla de Errores"
            pagination
            fixedHeader
            fixedHeaderScrollHeight="600px"/> 
        <br/>
        <div className="container">
            <div className="row">
                {/*ID DE LA PETICION*/}                
                <div className="col-4">
                    <h3>Id Peticion:</h3>
                </div>
                {/*TIPO DE PETICION*/}
                <div className="col-4">
                    Tipo de Renta:
                </div>
                {/*ACEPTAR O RECHAZAR */}
                <div className="col-4">
                    Accion:
                </div>
            </div>
            <div className="row">
                {/*ID DE LA PETICION*/}        
                <div className="col-4">
                    <input onChange={(e)=>{setId_pet(e.target.value)}}/>
                </div>
                 {/*TIPO DE PETICION*/}
                <div className="col-2">
                    <h5>Auto</h5>
                </div>
                <div className="col-2">
                    <h5>Vuelo</h5>
                </div>
                {/*ACEPTAR O RECHAZAR */}
                <div className="col-2">
                    <h5>Aceptar</h5>
                </div>
                <div className="col-2">
                    <h5>Rechazar</h5>
                </div>
            </div>
            
        </div>
        </React.Fragment>
    );
    }
export default Inicio_recep;