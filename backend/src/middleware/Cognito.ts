
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const _crypto = require('crypto')
require('dotenv').config();

const cognito = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID,
}

const userPool = new AmazonCognitoIdentity.CognitoUserPool(cognito);
//REGISTRAR USUARIOS
const signUpCognito = async(req:any, res:any) => {
    const usuario =req.body.usuario;
    const password = req.body.password
    const email = req.body.email;
    //const { usuario, password, email } = req.body;
    // aqui pueden encriptar la contrasenia con bcrypt o algo similar
    const attributeList:any = [];
    // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({'': username}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({'Name': 'email', 'Value': email}));
    const username=usuario;
    console.log(`usuario: ${username}  password: ${password}   attributeList: ${attributeList}`)
    return new Promise(function(resolve,reject){
        userPool.signUp(username, password, attributeList, null, async(err:any, data:any)=>{
            if(err){
                console.log(err);
                res.status(500).send
            }else{
                console.log(resolve(data))
                // res.status(200).send(data);
            }
        });
    })
   

}


const deleteUserCognitoA = async (req:any, res:any,usuario:string,pass:string) => {
    const username = usuario
    const password = pass

    const hash = _crypto.createHash('sha256').update(password).digest('hex') + "D**";

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: hash
    });
    
    const userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    console.log("ESTOY EN EL COGNITO")
    return new Promise(function (resolve, reject) {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result: any) {
                cognitoUser.deleteUser((err: any, result: any) => {
                    if (err) {
                        res.status(400).json({
                            status: false,
                            message: 'Error al eliminar usuario',
                        });
                    } else {
                        console.log("COGNITO: ELIMINADO CORRECTAMENTE")
                        res.status(200).json({
                            status: true,
                            message: 'Usuario eliminado correctamente',
                        });
                    }
                });
            },
            onFailure: function (err: any) {
                console.log('Entra aqui con error: ' + err);
                res.status(500).json({
                    'status': false,
                    'msg': err
                });
            }
        })
    })
}
//VERIFICAR QUE LOS USUARIOS HALLAN VERIFICADO SU CORREO
const signInCognito = async(req:any, res:any) => {
    const {usuario, password} = req.body;
    console.log(`usuario:${usuario}, password: ${password}`)
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: usuario,
        Password: password
    });

    const userData = {
        Username: usuario,
        Pool: userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    let prueba;
    return new Promise(function(resolve, reject) {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess:resolve,
            onFailure: reject,
        })
    })
}



module.exports = {
    signUpCognito,
    signInCognito,
    deleteUserCognitoA
}