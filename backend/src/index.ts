
const app = require('./app');
require('dotenv').config()

const PORT = process.env.PORT||8080;

app.listen(PORT,function(){
    console.log(`Puerto esta escuchando ${PORT} Brandon Oswaldo Yax Campos - 201800534`);
})
