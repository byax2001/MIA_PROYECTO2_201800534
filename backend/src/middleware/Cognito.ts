
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const _crypto = require('crypto')
require('dotenv').config();

const cognito = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID,
}

const userPool = new AmazonCognitoIdentity.CognitoUserPool(cognito);

const signUpCognito = async(req:any, res:any) => {
    const { usuario, password, email } = req.body;
    // aqui pueden encriptar la contrasenia con bcrypt o algo similar
    const attributeList = [];
    // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({'': username}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({'Name': 'email', 'Value': email}));
    const username=usuario;
    userPool.signUp(username, password, attributeList, null, async(err:any, data:any)=>{
        if(err){
            console.log(err);
            res.status(500).send
        }else{
            console.log(data)
            // res.status(200).send(data);
        }
    });
}
const deleteUserCognitoA = async (req:any, res:any) => {
    const username = req.body.us
    const password = req.body.contranueva

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
    
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result:any) {
            cognitoUser.deleteUser((err:any, result:any) => {
                if (err) {
                    res.status(400).json({
                        status: false,
                        message: 'Error al eliminar usuario',
                    });
                } else {
                    res.status(200).json({
                        status: true,
                        message: 'Usuario eliminado correctamente',
                    });
                }
            });
        },
        onFailure: function (err:any) {
            console.log('Entra aqui con error: ' + err);
            res.status(500).json({
                'status': false,
                'msg':err
                });
        }
    });
}
const signInCognito = async(req:any, res:any) => {
    const {usuario, password} = req.body;
    
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: usuario,
        Password: password
    });

    const userData = {
        Username: usuario,
        Pool: userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result:any) {
            const verified = result;
            console.log(verified);
            res.status(200).json({
                'status': true,
                'msg':result
            });
        },
        onFailure: function (err:any) {
            console.log('Entra aqui con error: ' + err);
            res.status(500).json({
                'status': false,
                'msg':err
                });
        }
    });

}



module.exports = {
    signUpCognito,
    signInCognito,
    deleteUserCognitoA
}