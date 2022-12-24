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
const colum_vuelos=[
    {
        name:'No',
        selector: row => row.no,
        sortable:true,
    },{
        name:'Usuario',
        selector: row => row.usuario,
        sortable:true,
    },{
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

const colum_autos=[
    {
        name:'No',
        selector: row => row.no,
        sortable:true,
    },{
        name:'Usuario',
        selector: row => row.usuario,
        sortable:true,
    },{
        name:'Nombre de Agencia',
        selector: row => row.nombre_agencia,
        sortable:true,
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
//A,R,NULL todavia no ha sido atendida esta peticion por lo que aparecera entre las opciones
function Inicio_recep (props){  
    const navigate=useNavigate()
    //PARA RECIBIR PARAMETROS DESDE EL LOGIN 
    const pLogin = useLocation().state
                                    //lo que esta adentro de este parentesis es su valor incial
    const [usuario,setUsuario]=useState("user")
    const [Id_pet,setId_pet]=useState(0)
    const [t_pet, setT_pet] = useState(0)

    

    const [dataVuelos,setDataVuelos] = useState([]);
    const [dataAutos,setDataAutos] = useState([]);
    //SE EJECUTA AL INICIO DE INICIAR LA PAGINA
    
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
        setDataVuelos(DataT)

        //URL 2 
        const url2 = "http://localhost:8080/usuarios/Pr_autos";
        const res2 = await fetch(url2, config);
        const data_res2 = await res2.json();
        console.log(data_res2);
        let DataT2 =[] 
        DataT2=data_res2["contenido"]
        for (let i = 0; i < DataT2.length; i++) {
            DataT2[i]["no"]=i
        }
        console.log(DataT2)
        setDataAutos(DataT2)



    };

    useEffect(() => {
        if (pLogin!=null){
            setUsuario(pLogin.user)
        }
        RdatosTabla()
    },[]);
    
    return(
        <React.Fragment>
        <header align="center"><h1>Inicio Recepcionista:</h1></header>
        <Link id="BtnHome" to="/" className="btn btn-dark btnEffect">Home</Link>
        <div className="container">
            <div className="row">
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
                        <input onChange={(e) => { setId_pet(e.target.value) }} />
                    </div>
                    {/*TIPO DE PETICION*/}
                    <div className="col-2">
                        <input type="radio" value="auto" checked={t_pet === "auto"}
                            onChange={(e) => { setT_pet(e.target.value) }} /> Auto
                    </div>
                    <div className="col-2">
                        <input type="radio" value="vuelo" checked={t_pet === "vuelo"}
                            onChange={(e) => { setT_pet(e.target.value) }} /> Vuelo
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
            <div className="mb-2"></div>
            <div className="row">
                <DataTable 
                columns={colum_vuelos}
                data={dataVuelos}
                title="Peticiones de Renta de Vuelos"
                noDataComponent="Sin Peticiones"
                pagination
                customStyles={customStyles}
                fixedHeader
                fixedHeaderScrollHeight="600px"/> 
            </div>
            <div className="mb-2"></div>
            <div className="row">
                <DataTable 
                columns={colum_autos}
                data={dataAutos}
                title="Peticiones de Renta de Autos"
                noDataComponent="Sin Peticiones"
                pagination
                customStyles={customStyles}
                fixedHeader
                fixedHeaderScrollHeight="600px"/> 
            </div>
        </div>
        
        
        
        

        
        </React.Fragment>
    );
    }
export default Inicio_recep;