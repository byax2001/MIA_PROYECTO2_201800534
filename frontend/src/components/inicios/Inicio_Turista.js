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

function Inicio_turista (props){
    const navigate=useNavigate()
    
    const columnas=[
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
                                                //lo que esta adentro de este parentesis es su valor incial
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
        <header align="center"><h1>Inicio de Turista:</h1></header>
        <Link id="BtnHome" to="/" className="btn btn-dark btnEffect">Logout</Link>
        <Link id="BrAutos" to="/rentaAutos" className="btn btn-dark btnEffect">Rentar Autos</Link>
        <Link id="BrVuelos" to="/rentaVuelos" className="btn btn-dark btnEffect">Rentar Vuelos</Link>
        <div className="mb-4"></div>
        <DataTable 
            columns={columnas}
            data={dataViajes}
            title="Vuelos"
            noDataComponent="No hay vuelos disponibles"
            pagination
            fixedHeader
            customStyles={customStyles}
            fixedHeaderScrollHeight="600px"
            /> 
        </React.Fragment>
    );
    }
export default Inicio_turista;