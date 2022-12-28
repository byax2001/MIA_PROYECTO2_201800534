import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,Navigate,useLocation,useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import Login from "../Login";

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
    const [foto,setFoto]=useState("https://appweb-201800534-p2.s3.amazonaws.com/emp.jpg")
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
        if (pLogin!=null && pLogin.foto != undefined){
            setUsuario(pLogin.user)
            setFoto(pLogin.foto)
            console.log(`FOTO DE USUARIO : ${Login.foto}`)
            
        }
        RdatosTabla()
    },[]);
    //modificar el array usestate
    const goRautos= ()=>{
        navigate("/rentaAutos",{state:{user:usuario}})
    }
    const goRvuelos= ()=>{
        navigate("/rentaVuelos",{state:{user:usuario}})
    }
    return(
        <React.Fragment>
        <header align="center" className="mb-5">
            <h1 className="d-flex justify-content-center">Inicio de Turista:</h1>
            <div className="container col-1 mb-5" id="photo_Data">
                <div className="row">
                    <img src={foto} width="80px" height="100px"/> 
                </div>
                <div className="row">
                    <h5>{usuario}</h5>
                </div>
            </div>
        </header>
        <Link  id="BtnHome" to="/" className="btn btn-dark btnEffect">Logout</Link>
        <button id="BrAutos" className="btn btn-dark btnEffect" onClick={()=>{goRautos()}}>Rentar Autos</button>
        <button id="BrVuelos" className="btn btn-dark btnEffect" onClick={()=>{goRvuelos()}}>Rentar Vuelos</button>
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