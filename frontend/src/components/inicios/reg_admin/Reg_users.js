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
        name:'Nombre Completo',
        selector: row => row.nombre,
        sortable:true,
    },{
        name:'Usuario',
        selector: row => row.usuario,
        sortable:true
    },{
        name:'Tipo de Usuario',
        selector: row => row.tipo_usuario,
        sortable:true
    },{
        name:'foto',
        selector: row => row.foto,
        sortable:true
    },{
        name:'Email',
        selector: row => row.email,
        sortable:true
    },{
        name:'Verificado',
        selector: row => String(row.verify),
        sortable:true
    }
]
//las funciones deben de empezar por mayusculas
function Reg_users (props){
    /*a
a. Nombre completo
b. Usuario
c. Foto de perfil
d. Correo electrónico
e. Contraseña
f. Confirmación de contraseña */

//HACER UN APARTADO PARA COLOCAR EL CODIGO DE CONFIRMACION ENVIADO A EMAIL, DICHO APARTADO SERA INVISIBLE 
//HASTA QUE SE PRESIONE REGISTRAR Y LA CONTRASEÑA SEA CORRECTA

    const navigate = useNavigate();
    const [nameC, setNameC] = useState(0);
    const [user, setUser] = useState(0);
    const [foto, setFoto] = useState(0);
    const [image_b64, setImage_b64] = useState(0)
    const [email, setEmail] = useState(0);
    const [password, setPass] = useState(0);
    const [conf_pass, setConf_pass] = useState(0);
    const [datosTabla,setDatosTabla] = useState([])
    const [id_del,setId_del] = useState("");
    const [tipo_usuario,setTipo_usuario] = useState("T")

    const RegistrarU = async () => {
        const ib64_i=await convertBase64(foto)///CONVERTIR IMAGEN A BASE 64
        const foto1 = await ib64_i
        setImage_b64(foto1)
        console.log("Imagen renderizada")
        console.log(image_b64)
        if(ib64_i==0 || image_b64==0 || image_b64==undefined){
            alert("Problemas con el renderizado de la Imagen, por favor intente de Nuevo")
            return
        }

        let newUser ={nombre:nameC,usuario:user,tipo_usuario:tipo_usuario,email:email,foto:image_b64,password:password,verify:false}
        if(password!==conf_pass){
            alert("Las contraseñas deben de ser iguales")
            return
        }
        const url = `${process.env.REACT_APP_API_CONSUME}/admin/addUsers`;
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
        console.log("data ressssss")
        console.log(data_res);
        if(data_res["accion_exitosa"]){
            alert("Registro de Usuario Exitoso")
        }else{
            alert("Fallo al Registrar Usuario")
        }
    };
    
    const DelUser = async () => {
        let newUser ={id:id_del}
        const url = `${process.env.REACT_APP_API_CONSUME}/admin/delUsers`;
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
        console.log(data_res["status"])
        //CUANDO LA ELIMINACION ES CORRECTA DEVUELVE UN {message:"Eliminacion exitosa", status:true} proveniente desde el archivo Cognito en su fucion res.json({})
        //si es erronea la eliminacion devuelve un {accion_exitosa:false}
        //por lo que data["status"] sera igual a undefained y el if lo toma como false
        if(data_res["status"]){
            alert("Eliminacion de Usuario Exitosa")
        }else{
            alert("Fallo al Eliminar Usuarios")
        }
    };
    

    const RdatosTabla = async () => {
        const url = `${process.env.REACT_APP_API_CONSUME}/usuarios/getUsers`;
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

    const convertBase64= (file)=>{
        //SI NO APLICAS EL RESOLVE O EL REJECT EN ALGUNA PARTE EL PROGRMA TRUENA
        return new Promise((resolve,reject)=>{
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload=()=>{
                resolve(fileReader.result)
            }
            fileReader.onerror=(error)=>{
                reject(error)
            }
        })
    }
    useEffect(() => {
       RdatosTabla()
    },[]);
    return(
        <React.Fragment>
        <header align="center"><h1>Administrar Usuarios</h1></header>
        <Link id="BtnHome" to="/initA" className="btn btn-dark btnEffect">Regresar</Link>
        <div className="container">
            <div className="row">
                <div className="col-7">
                <DataTable 
                    columns={columnas}
                    data={datosTabla}
                    customStyles={customStyles}
                    title="Usuarios"
                    striped
                    noDataComponent="No hay autos disponibles"
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    /> 
                </div>
                <div className="col-5">
                    <div className="row my-2"></div>
                    <form className="form-group">
                        <label className="row">
                            Nombre de Usuario: 
                            <input  onChange={(e)=>{setNameC(e.target.value)}}  className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            User: 
                            <input onChange={(e)=>{setUser(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Foto: 
                            <input type="file" onChange={(e)=>{setFoto(e.target.files[0])}} className="text-white"></input>
                        </label>
                        <label className="row mb-1">
                            Email: 
                            <input onChange={(e)=>{setEmail(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-1">
                            Contraseña:
                            <input type="password" onChange={(e)=>{setPass(e.target.value)}} className="text-dark"></input>
                        </label>
                        <label className="row mb-2">
                            Confirmar Contraseña
                            <input type="password" onChange={(e)=>{setConf_pass(e.target.value)}} className="text-dark"></input>
                        </label>
                    </form>
                       <div className="row">
                        <div className="col-4">
                            <button className="btn btn-dark btnEffect mb-2" onClick={()=>{RegistrarU()}}>Registrar</button>
                        </div>
                        <div className="col-4">
                            <input type="radio" value="T" checked={tipo_usuario=== "T"}
                            onChange={(e) => { setTipo_usuario(e.target.value) }} /> Turista
                        </div>
                        <div className="col-4">
                            <input type="radio" value="R" checked={tipo_usuario=== "R"}
                            onChange={(e) => { setTipo_usuario(e.target.value) }} /> Recepcionista
                        </div>
                    </div>
                    <div className="row">
                    <input onChange={(e)=>{setId_del(e.target.value)}} placeholder="INGRESE AQUI ID A ELIMINAR" className="text-dark mb-1"/>
                    <button className="col-2 btn btn-dark btnEffect" onClick={()=>{DelUser()}}>Eliminar</button>  
                    </div>
                </div>

            </div>
            
        </div>
        </React.Fragment> 
            
    );

    
}

  
export default Reg_users;