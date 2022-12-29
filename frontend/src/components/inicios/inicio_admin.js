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
    const [foto,setFoto]=useState("https://appweb-201800534-p2.s3.amazonaws.com/emp.jpg")
    const [datosTabla,setDatosTabla] = useState([])
                                        //lo que esta adentro de este parentesis es su valor incial
    const [usuario,setUsuario]=useState("user")

    
    const [dataVuelos,setDatoVuelos] = useState([]);
    
    const RdatosTabla = async () => {
        const url = `${process.env.API_CONSUME}/usuarios/getHistorial`;
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
            setFoto(pLogin.foto)
        }
        RdatosTabla()
        //EL CORCHETE HACE QUE ESTE COMANDO SE EJECUTE UNA SOLA VEZ AL INICIO DEL PROGRAMA
    },[]);
    return(
        <React.Fragment>
        <header align="center" className="mb-5">
            <h1 className="d-flex justify-content-center">Inicio Admin:</h1>
            <div className="container col-1 mb-5" id="photo_Data">
                <div className="row">
                    <img src={foto} width="80px" height="100px"/> 
                </div>
                <div className="row">
                    <h5>{usuario}</h5>
                </div>
            </div>
        </header>
        <Link id="BtnHome" to="/" className="btn btn-dark btnEffect">Home</Link>
        <div className="content">
            <div className="row mb-2">
                <div className="dropdown-content" id="BtnsAdmin">
                    <Link className="btn btn-dark" to="/regUserA">Administrar Usuarios</Link>
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