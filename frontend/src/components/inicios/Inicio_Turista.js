import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'

const datoprueba=[
]

const columnas=[
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

export const UpdateTabla=function(){
    datoprueba.push({nombre:"Fernandojijo",tiposimbolo:"Variable",tipodato:"i64",ambito:"Local",fila:32,columna:71})
    console.log("Xd")
    return datoprueba
}
function Inicio_turista (props){
    const navigate=useNavigate()
    const columnas=[
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
    const [dataViajes,setDataViajes] = useState([]);
    
    //SE EJECUTA AL INICIO DE INICIAR LA PAGINA
    useEffect(() => {
        
    });
    //modificar el array usestate
    const push_DataViajes=function(newElement){
        let array = []
        array = dataViajes
        array.push(newElement)
        setDataViajes(dataViajes.concat(array))
    };

    return(
        <React.Fragment>
        <header align="center"><h1>Usuario Turista:</h1></header>
        <Link id="BtnHome" to="/" className="btn btn-dark btnEffect">Logout</Link>
        <Link id="BtnHome" to="/rentaAutos" className="btn btn-dark btnEffect">Rentar Autos</Link>
        <Link id="BtnHome" to="/rentaVuelos" className="btn btn-dark btnEffect">Rentar Vuelos</Link>
        <DataTable 
            columns={columnas}
            data={dataViajes}
            title="Tabla de Errores"
            pagination
            fixedHeader
            fixedHeaderScrollHeight="600px"
            /> 
        </React.Fragment>
    );
    }
export default Inicio_turista;