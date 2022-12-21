import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'

function Inicio_admin (props){
    const navigate=useNavigate()
    const colum_nameUser=[
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
    const [dataUser,setDatosUser] = useState([]);

    
    

    
    return(
        <React.Fragment>
        <header align="center"><h1>Login Avicar</h1></header>
        <div className="dropdown-content">
            <div className="row">
            <Link to="/tsimbolos">Tabla de Simbolos</Link>
            <Link to="/terrores">Reporte de Errores</Link>
            <Link to="/tbdatos">Reporte Base de datos existentes</Link>
            <Link to="/tt_bdatos">Reporte de tabla de base de datos</Link>
            </div>
            <br/>
            <div className="row">
            <DataTable 
            columns={colum_nameUser}
            data={setDatosUser}
            title="Tabla de Errores"
            pagination
            fixedHeader
            fixedHeaderScrollHeight="600px"/> 
            </div>
        
        </div>
        </React.Fragment>
        
    );
    }
export default Inicio_admin;