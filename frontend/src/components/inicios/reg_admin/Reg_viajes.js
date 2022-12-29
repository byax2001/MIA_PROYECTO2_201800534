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
//las funciones deben de empezar por mayusculas
function Reg_viajes (props){
    /*
a. Nombre de la agencia
b. Ciudad de origen
c. Ciudad de destino
d. Días de vuelo
e. Precio de vuelo*/

    const navigate = useNavigate();
    const [nameAgen, setNameAgen] = useState(0);
    const [cityOrigen, setCityOrigen] = useState(0);
    const [cityDestino, setCityDestino] = useState(0);
    const [diasvuelo, setDiasVuelo] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [datosTabla,setDatosTabla] = useState([])
    const [id_del,setId_del] = useState("");

    

    const RdatosTabla = async () => {
        const url = `${process.env.API_CONSUME}/usuarios/getViajes`;
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
    },[]);

    const RegViaje = async () => {
        let newUser ={nameAgen:nameAgen,ciudad_origen:cityOrigen,ciudad_destino:cityDestino,dias_vuelo:diasvuelo,precio:precio}
    
        const url = `${process.env.API_CONSUME}/admin/addVuelos`;
        let config = {
            method: "POST", //ELEMENTOS A ENVIAR
            body: JSON.stringify(newUser),
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
        };
        const res = await fetch(url, config);
        const data_res = await res.json();
        console.log(data_res);
        if(data_res["accion_exitosa"]){
            alert("Registro de Viajes Exitoso")
        }
    };
    const DelViaje = async () => {
        let AutoId ={id:id_del}
        const url = `${process.env.API_CONSUME}/admin/delVuelos`;
        let config = {
            method: "POST", //ELEMENTOS A ENVIAR
            body: JSON.stringify(AutoId),
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
        };
        const res = await fetch(url, config);
        const data_res = await res.json();
        console.log(data_res);
        if(data_res["accion_exitosa"]){
            alert("Eliminacion de Vuelos Exitosa")
        }else{
            alert("Fallo al Eliminar Vuelos")
        }
    };



    return(
        <React.Fragment>
        <header align="center"><h1>Administrar Viajes</h1></header>
        <Link id="BtnHome" to="/initA" className="btn btn-dark btnEffect">Regresar</Link>
        <div className="container">
            <div className="row">
                <div className="col-7">
                <DataTable 
                    columns={columnas}
                    data={datosTabla}
                    customStyles={customStyles}
                    title="Viajes"
                    striped
                    noDataComponent="No hay vuelos disponibles"
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    /> 
                </div>
                <div className="col-5">
                    <div className="row my-2"></div>
                    <form className="form-group">
                        <label className="row">
                            Nombre de la Agencia:
                            <input  onChange={(e)=>{setNameAgen(e.target.value)}}  className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Ciudad de Origen:
                            <input onChange={(e)=>{setCityOrigen(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Ciudad de Destino: 
                            <input onChange={(e)=>{setCityDestino(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Dias de vuelo: 
                            <input onChange={(e)=>{setDiasVuelo(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-2">
                            Precio de Vuelo
                            <input onChange={(e)=>{setPrecio(e.target.value)}} className="text-dark"></input>
                        </label>
                    </form>
                    <button className="btn btn-dark btnEffect mb-3" onClick={()=>{RegViaje()}}>Registrar</button>
                    <div className="row">
                        <input onChange={(e)=>{setId_del(e.target.value)}} placeholder="INGRESE AQUI ID A ELIMINAR" className="text-dark mb-1"/>
                        <button className="col-2 btn btn-dark btnEffect" onClick={()=>{DelViaje()}}>Eliminar</button>  
                    </div>
                </div>
            </div>
            
        </div>
        </React.Fragment> 
            
    );

    
}

  
export default Reg_viajes;