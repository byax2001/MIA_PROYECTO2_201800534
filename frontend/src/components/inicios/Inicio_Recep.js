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

//A,R,NULL todavia no ha sido atendida esta peticion por lo que aparecera entre las opciones
function Inicio_recep (props){  
    const navigate=useNavigate()
    //PARA RECIBIR PARAMETROS DESDE EL LOGIN 
    const pLogin = useLocation().state
                                    //lo que esta adentro de este parentesis es su valor incial
    const [usuario,setUsuario]=useState("user")
    const [Id_pet,setId_pet]=useState(0)
    const [t_pet, setT_pet] = useState(0)

    const colum_vuelos=[
        {
            name:'No',
            selector: row => row.No,
            sortable:true
        },
        {
            name:'User',
            selector: row => row.user,
            sortable:true
        },
        {
            name:'Nombre de Agencia',
            selector: row => row.nameAgen,
            sortable:true
        },
        {
            name:'Origen',
            selector: row => row.origen,
            sortable:true,
            grow:3
        },{
            name:'Destino',
            selector: row => row.destino,
            sortable:true
        },{
            name:'Dias de vuelo',
            selector: row => row.diasvuelo,
            sortable:true
        },{
            name:'Precio',
            selector: row => row.columna,
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
            name:'Usuario',
            selector: row => row.usuario,
            sortable:true,
            grow:3
        },{
            name:'Nombre Agencia',
            selector: row => row.nameAgen,
            sortable:true
        },{
            name:'Marca',
            selector: row => row.marca,
            sortable:true
        },{
            name:'Modelo',
            selector: row => row.modelo,
            sortable:true
        },{
            name:'Precio',
            selector: row => row.precio,
            sortable:true
        }
    ]

    const [dataVuelos,setDataViajes] = useState([]);
    const [dataAutos,setDataAutos] = useState([]);
    //SE EJECUTA AL INICIO DE INICIAR LA PAGINA
    useEffect(() => {
        if (pLogin.PageSol==="login"){
            setUsuario(pLogin.user)
        }
    });
    
    return(
        <React.Fragment>
        <header align="center"><h1>Inicio Recepcionista:</h1></header>
        <Link id="BtnHome" to="/" className="btn btn-dark btnEffect">Home</Link>
        <Link id="BtnHome" to="/" className="btn btn-dark btnEffect">Home</Link>
        <Link id="BtnHome" to="/" className="btn btn-dark btnEffect">Home</Link>
    
        <DataTable 
            columns={colum_vuelos}
            data={dataVuelos}
            title="Peticiones de Renta de Vuelos"
            noDataComponent="Sin Peticiones"
            pagination
            customStyles={customStyles}
            fixedHeader
            fixedHeaderScrollHeight="600px"/> 
        <div className="mb-4"></div>
        
        <DataTable 
            columns={colum_autos}
            data={dataAutos}
            title="Peticiones de Renta de Autos"
            noDataComponent="Sin Peticiones"
            pagination
            customStyles={customStyles}
            fixedHeader
            fixedHeaderScrollHeight="600px"/> 
        <br/>
        <div className="container">
            <div className="row">
                {/*ID DE LA PETICION*/}                
                <div className="col-4">
                    <h5>Id Peticion:</h5>
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
                <input type="radio" value="auto" checked={t_pet==="auto"} 
                onChange={(e)=>{setT_pet(e.target.value)}}/> Auto
                </div>
                <div className="col-2">
                    <input type="radio" value="vuelo" checked={t_pet==="vuelo"}
                    onChange={(e)=>{setT_pet(e.target.value)}}/> Vuelo
                </div>
                {/*ACEPTAR O RECHAZAR */}
                <div className="col-2">
                    <button className="btn btn-dark btnEffect">Aceptar</button>
                </div>
                <div className="col-2">
                    <button className="btn btn-dark btnEffect">Rechazar</button>
                </div>
            </div>
            
        </div>
        </React.Fragment>
    );
    }
export default Inicio_recep;