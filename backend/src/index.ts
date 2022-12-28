
const app = require('./app');
require('dotenv').config()
const _path = require('path')
const _fs = require('fs')
const PORT = process.env.PORT||8080;
let x =0;
const FormatDataBase = ()=>{
    const pathFile = _path.join(__dirname,'./BaseDatos/BaseDatos.json')
    const texto:string = String(_fs.readFileSync(pathFile,'utf-8'))
    let _Bdatos = JSON.parse(texto);
    let _usuario= _Bdatos["usuarios"]
    if (process.env.USUARIO != _usuario[0]["usuario"] || process.env.PASSWORD !=_usuario[0]["password"]){
        try {
            _fs.unlinkSync(pathFile)
            console.log("Base de Datos Formateada")
        } catch(err) {}
        let user = process.env.USUARIO
        let pass = process.env.PASSWORD
        let email = process.env.EMAIL
        let foto = process.env.PHOTO_ADMIN
        const admin:object = {nombre:"admin",usuario:user,tipo_usuario:"A",foto:foto,
                    email:email,password:pass,verify:true}
        const Bdatos:Object = {usuarios:[admin],autos:[],viajes:[],renta_vuelos:[],renta_autos:[],RentasR:[]}
        _fs.writeFileSync(pathFile,JSON.stringify(Bdatos),'utf-8',4)
    }
    
}

app.listen(PORT,function(){
    FormatDataBase()
    console.log(`Puerto esta escuchando ${PORT} Brandon Oswaldo Yax Campos - 201800534`);
})
