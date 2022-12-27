const AWS = require('aws-sdk');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const s3 = new AWS.S3()
require("dotenv").config();


const client = new AWS.S3({
  region: process.env.BUCKET_REGION,
  credentials: {accessKeyId: process.env.BUCKET_ID_KEY ,secretAccessKey: process.env.BUCKET_ID_SECRET_KEY,
  },
});

const Upload = async function (req: any, res: any) {
    /// fil[0].ruta?
    const image = req.body.foto;
    console.log(image)
    //const buf = Buffer.from(image, "base64");
    const buff = Buffer.from(image, "base64");

        //fs.createReadStream("./images/"+req.photo.originalname) 
    let params = {
        Key: "lprueb.jpg", //nombre del documento en el bucket
        Body: buff, //contenido del archivo (base64 en el caso sea una imagen, dicho metodo se uso en el frontend como convertBase64())
        Bucket: process.env.BUCKET_NAME,
        ContentEncoding: "base64",
        ContentType: "image/jpg",
    };
    const command = new PutObjectCommand(params);
    await client.send(command)
    return new Promise(function (resolve, reject) {
        client.putObject(params, function (err: any, data: any) {
            if (err) {
                reject(err)
                res.status(400).json({
                    status: false,
                    message: 'Error al Ingresar imagen',
                });
            } else {
                resolve(data)
                res.status(200).json({
                    status: true,
                    message: 'Imagen Ingresada correctamente',
                });
            }
        })
    })
}

module.exports={Upload}
