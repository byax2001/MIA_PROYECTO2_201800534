import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useLocation,useNavigate} from 'react-router-dom'
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
        name:'No',
        selector: row => row.no,
        sortable:true,
    },
    {
        name:'Nombre de Agencia',
        selector: row => row.nombre_agencia,
        sortable:true,
    },{
        name:'Ciudad de Origen',
        selector: row => row.ciudad_origen,
        sortable:true
    },{
        name:'Ciudad de Destino',
        selector: row => row.ciudad_destino,
        sortable:true
    },{
        name:'Dias de Vuelo',
        selector: row => row.dias_vuelo,
        sortable:true
    },{
        name:'Precio de Vuelo',
        selector: row => row.precio,
        sortable:true
    }
]

function Inicio_turista (props){
    const navigate=useNavigate()
    const pLogin = useLocation().state
                                //lo que esta adentro de este parentesis es su valor incial
    const [usuario,setUsuario]=useState("user")
                                                //lo que esta adentro de este parentesis es su valor incial
    const [datosTabla,setDatosTabla] = useState([])
    const RdatosTabla = async () => {
        const url = "http://localhost:8080/usuarios/getViajes";
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
    //SE EJECUTA AL INICIO DE INICIAR LA PAGINA
    useEffect(() => {
        if (pLogin!=null){
            setUsuario(pLogin.user)
        }
        RdatosTabla()
    },[]);
    //modificar el array usestate
   
    return(
        <React.Fragment>
        <header align="center"><h1>Inicio de Turista:</h1></header>
        <Link id="BtnHome" to="/" className="btn btn-dark btnEffect">Logout</Link>
        <Link id="BrAutos" to="/rentaAutos" className="btn btn-dark btnEffect">Rentar Autos</Link>
        <Link id="BrVuelos" to="/rentaVuelos" className="btn btn-dark btnEffect">Rentar Vuelos</Link>
        <div className="mb-4"></div>
        <DataTable 
            columns={columnas}
            data={datosTabla}
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