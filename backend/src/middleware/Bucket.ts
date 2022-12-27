import { buffer } from "stream/consumers";

const AWS = require('aws-sdk');
const s3 = new AWS.S3()
const fs = require('fs')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
require("dotenv").config();


const client = new AWS.S3({
  region: process.env.BUCKET_REGION,
  credentials: {accessKeyId: process.env.BUCKET_ID_KEY ,secretAccessKey: process.env.BUCKET_ID_SECRET_KEY,
  },
});

const Upload = async function (req: any, res: any,name:string) {
    /// fil[0].ruta?
    let image = req.body.foto;
    //const buf = Buffer.from(image, "base64");
    image = String(image).trim()
    image =  image.replace("data:", "").replace(/^.+,/, "");
    //LIMPIAR LOS CARACTERES ANTERIORES EN EL STRING BASE64 O LA IMAGEN DARA ERRORES
    //console.log(String(image))
    const buff = Buffer.from(image, "base64");
        //fs.createReadStream("./images/"+req.photo.originalname) 
    let params = {
        Key: `${name}.jpg`, //nombre del documento en el bucket
        Body: buff, //contenido del archivo (base64 en el caso sea una imagen, dicho metodo se uso en el frontend como convertBase64())
        Bucket: process.env.BUCKET_NAME,
        ContentEncoding: "base64",
        ContentType: "image/jpg",
    };
    return new Promise(function (resolve, reject) {
        client.putObject(params, function (err: any, data: any) {
            if (err) {
                reject(err)
                res.status(400).json({
                    status: false,
                    accion_exitosa:false,
                    message: 'Error al Ingresar imagen',
                });
            } else {
                resolve(data)
                res.status(200).json({
                    status: true,
                    accion_exitosa:true,
                    message: 'Imagen Ingresada correctamente',
                });
            }
        })
    })
}


export async function uploadfile(file:any){
    const stream = fs.createReadStream(file.tempFilePath)
    const uploadParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: file.name,
        Body: stream
    }
    const command = new PutObjectCommand(uploadParams)
    return await client.send(command)

}

module.exports={Upload}
