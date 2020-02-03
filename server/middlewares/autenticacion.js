const jwt = require('jsonwebtoken');
//VERIFICAR TOKEN

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token invalido'
                }
            });
        }

        req.usuario = decoded.usuario; //dentro del token viene usuario, al verificar el token, se guarda en req.usuario

        next(); //sigue con la prox funcion que este donde se use verificaToken
    });



}


//VERIFICA ADMIN_ROLE


let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }

}


//VERIFICA TOKEN PARA IMG

let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token invalido'
                }
            });
        }

        req.usuario = decoded.usuario; //dentro del token viene usuario, al verificar el token, se guarda en req.usuario

        next(); //sigue con la prox funcion que este donde se use verificaToken
    });
}






module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
}