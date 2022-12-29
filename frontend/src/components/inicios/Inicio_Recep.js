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
    const [t_pet, setT_pet] = useState("")
    const [foto,setFoto]=useState("https://appweb-201800534-p2.s3.amazonaws.com/recep.jpg")
    

    const [dataVuelos,setDataVuelos] = useState([]);
    const [dataAutos,setDataAutos] = useState([]);
    //SE EJECUTA AL INICIO DE INICIAR LA PAGINA
    
    const RdatosTabla = async () => {
        const url = `${process.env.REACT_APP_API_CONSUME}/usuarios/Pr_vuelos`;
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
        const url2 = `${process.env.REACT_APP_API_CONSUME}/usuarios/Pr_autos`;
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
    //ACEPTAR PETICION
    const A_peticion=async()=>{
        const url = `${process.env.REACT_APP_API_CONSUME}/recep/AoR`;
        if(isNaN(Id_pet)|| t_pet==""){//si es true id_pet es un string que no se puede pasar a int
            alert("ID incorrecto o no se ha seleccionado el tipo de peticion que es" )
            return
        }
        setId_pet(Number(Id_pet))
        let AoR={usuario:usuario,id:Id_pet,tipoRenta:t_pet,AoR:"Aceptado"}
        let config = {
        method: "POST", //ELEMENTOS A ENVIAR
        body: JSON.stringify(AoR),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        };
        const res = await fetch(url, config);
        const data_res = await res.json();
        console.log(data_res);
        if(data_res["accion_exitosa"]){
            alert("Peticion de Renta de Vuelo con Exito")
        }
    }
    //RECHAZAR PETICION
    const R_peticion=async()=>{
        const url = `${process.env.REACT_APP_API_CONSUME}/recep/AoR`;
        if(isNaN(Id_pet) || t_pet==""){//si es true id_pet es un string que no se puede pasar a int
            alert("ID incorrecto o no se ha selecciondo tipo de peticion")
            return
        }
        setId_pet(Number(Id_pet))
        let AoR={usuario:usuario,id:Id_pet,tipoRenta:t_pet,AoR:"Rechazado"}
        let config = {
        method: "POST", //ELEMENTOS A ENVIAR
        body: JSON.stringify(AoR),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        };
        const res = await fetch(url, config);
        const data_res = await res.json();
        console.log(data_res);
        if(data_res["accion_exitosa"]){
            alert("Peticion de Renta de Vuelo con Exito")
        }
    }

    useEffect(() => {
        if (pLogin!=null){
            setUsuario(pLogin.user)
            setFoto(pLogin.foto)
        }
        RdatosTabla()
    },[]);
    
    return(
        <React.Fragment>
        <header align="center" className="mb-5">
            <h1 className="d-flex justify-content-center">Inicio Recepcionista:</h1>
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
                        <input onChange={(e) => { setId_pet(e.target.value) }}  className="text-dark" />
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
                        <button className="btn btn-dark btnEffect" onClick={(e)=>{A_peticion()}}>Aceptar</button>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-dark btnEffect" onClick={(e)=>{R_peticion()}}>Rechazar</button>
                    </div>
                </div>
            </div>
            <div className="mb-3"></div>
        </div>
        <div className="container">
    
                <DataTable 
                columns={colum_vuelos}
                data={dataVuelos}
                title="Peticiones de Renta de Vuelos"
                noDataComponent="Sin Peticiones"
                pagination
                customStyles={customStyles}
                fixedHeader
                fixedHeaderScrollHeight="600px"/> 
           
            <div className="mb-2"></div>
         
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
        </React.Fragment>
    );
}
export default Inicio_recep;