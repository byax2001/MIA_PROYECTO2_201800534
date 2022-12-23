import { Component, useEffect} from "react"
import React,{useState,useRef} from 'react';
import {Link,useLocation,Navigate,useNavigate} from 'react-router-dom'
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
    },{
        name:'Usuario:',
        selector: row => row.usuario,
        sortable:true
    },{
        name:'Tipo de Renta',
        selector: row => row.tipoRenta,
        sortable:true,
    },{
        name:'Accion sobre Renta',
        selector: row => row.AoR,
        sortable:true
    },{
        name:'Fecha',
        selector: row => row.fecha,
        sortable:true
    }
];
function Inicio_admin (props){
    const navigate=useNavigate()
    const pLogin = useLocation().state
    const [lista,setLista]=useState(0)
    const [datosTabla,setDatosTabla] = useState([])
                                        //lo que esta adentro de este parentesis es su valor incial
    const [usuario,setUsuario]=useState("user")

    
    const [dataVuelos,setDatoVuelos] = useState([]);
    
    const RdatosTabla = async () => {
        const url = "http://localhost:8080/usuarios/getHistorial";
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
        if (pLogin!==null){
            setUsuario(pLogin.user)
        }
        RdatosTabla()
        //EL CORCHETE HACE QUE ESTE COMANDO SE EJECUTE UNA SOLA VEZ AL INICIO DEL PROGRAMA
    },[]);
    return(
        <React.Fragment>
        <header align="center" className="mb-3"><h1>Inicio Admin: {usuario}</h1></header>
        <Link id="BtnHome" to="/" className="btn btn-dark btnEffect">Home</Link>
        <div className="content">
            <div className="row mb-2">
                <div className="dropdown-content" id="BtnsAdmin">
                    <Link className="btn btn-dark" to="/regUserA">Administrar Turistas</Link>
                    <Link className="btn btn-dark" to="/regAutosA">Administrar Autos</Link>
                    <Link className="btn btn-dark" to="/regViajesA">Administrar Vuelos</Link>
                </div>
            </div>  
            <div className="row">
                <DataTable 
                    columns={colum_nameUser}
                    data={datosTabla}
                    customStyles={customStyles}
                    title="Historial"
                    striped
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    /> 
            </div>
        </div>
        
        </React.Fragment>

    );
    }
export default Inicio_admin;