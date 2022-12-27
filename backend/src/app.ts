
const express = require('express');
const morgan = require('morgan');
const corse = require('cors');

const _app = express();
_app.use(morgan('dev'));
_app.use(express.json());
_app.use(express.urlencoded({extended:true}));
_app.use(corse());
//ROUTES
_app.get('/',function(req:any,res:any){
    res.json({nombre:"Brandon Oswaldo Yax Campos",carnet:201800534, mensaje:"Hola mundo"})
})


_app.use('/usuarios',require('./routes/usuarios.routes'))
_app.use('/recep',require('./routes/recepcionista.routes'))
_app.use('/admin',require('./routes/admin.routes'))

module.exports=_app;
