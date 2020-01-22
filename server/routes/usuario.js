const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore'); //amplia las opciones de js, se usara para usar la funcion pick

const Usuario = require('../models/usuario');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion'); //importar el middleware para verificar token

const app = express();

//verificaToken validara el token antes de continuar
app.get('/usuario', verificaToken, (req, res) => {



    let desde = req.query.desde || 0; //recupera el valor "desde" de la url?desde=valor de manera opcional
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    //res.json('get usuario local'); envia json
    Usuario.find({ estado: true }, 'nombre email role estado google img') //busca todos los elementos ,2 param filtra los elementos a devolver
        .skip(desde) //se salta n registros
        .limit(limite) //limitar resultados a n
        .exec((err, usuarios) => { //ejecutar la query
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.count({ estado: true }, (err, conteo) => { //Para devolver la cantidad de resultados dentro del json de respuesta
                res.json({
                    ok: true,
                    usuarios,
                    conteo
                });

            });




        })


})

app.post('/usuario', [verificaToken, verificaAdmin_Role], (req, res) => { //para usar mas de 1 middleware, hay que juntarlos en []

    let body = req.body; //req.body es el resultado del payload que procesa bodyParser

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //para que haga el hash(encriptado) de forma sincrona(sin callback ni promesa) 10=num de veces que encriptara
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });



    // if (body.nombre === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         mensaje: 'El nombre es necesario'
    //     }); //devolver un error 400(bad request)
    // } else {
    //     res.json({
    //         persona: body
    //     }); //envia json

    // }

})

app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => { //id vuelve como valor para el put
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); //crea un clon del objeto filtrando, solo tendra los elementos que esten en el arreglo

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => { //runValidators hace correr las validaciones del modelo para asegurarse que no se las salten al actualziar

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

});

app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    //res.json('delete usuario'); envia json

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });



    // Borrar de la BD
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }
    //     if (!usuarioBorrado) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'Usuario no encontrado'
    //             }
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     });

    // });

});

module.exports = app;