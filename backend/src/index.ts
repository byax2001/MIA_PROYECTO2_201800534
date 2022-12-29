
const app = require('./app');
require('dotenv').config()
const _path = require('path')
const _fs = require('fs')
const cognitoI = require('./middleware/Cognito')
const createResponseObject = require('create-response-object');

const PORT = process.env.PORT||8080;
let x =0;

const FormatDataBase = ()=>{
    const pathFile = _path.join(__dirname,'./BaseDatos/BaseDatos.json')
    const texto:string = String(_fs.readFileSync(pathFile,'utf-8'))
    let _Bdatos = JSON.parse(texto);
    let _usuario= _Bdatos["usuarios"]
    if (process.env.USUARIO != _usuario[0]["usuario"] || process.env.PASSWORD !=_usuario[0]["password"]){
        let user = process.env.USUARIO
        let pass = process.env.PASSWORD
        let email = process.env.EMAIL
        let foto = process.env.PHOTO_ADMIN
        RegAdmin()
        const admin:object = {nombre:"admin",usuario:user,tipo_usuario:"A",foto:foto,
                    email:email,password:pass,verify:false}
        const Bdatos:Object = {usuarios:[admin],autos:[],viajes:[],renta_vuelos:[],renta_autos:[],RentasR:[]}
        _fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
    }
    
}
const RegAdmin = async () => {
    //ELIMINACION DE LA BASE DE DATOS ANTERIOR
    let user = process.env.USUARIO
    let pass = process.env.PASSWORD
    let email = process.env.EMAIL
    try{
        await cognitoI.signUpAdminCognito({body:{usuario:user,password:pass,email:email}}, await createResponseObject('200','Hello World!'));
    }catch(e){
        console.log(e)
        console.log("AAAAAAA trono")
    }
}

app.listen(PORT,function(){
    FormatDataBase()
    console.log(`Puerto esta escuchando ${PORT} Brandon Oswaldo Yax Campos - 201800534`);
})
