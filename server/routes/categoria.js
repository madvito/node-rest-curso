const express = require('express');
let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');


let app = express();
let Categoria = require('../models/categoria');


//mostrar todas las categorias
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion') //ordena segun descripcion
        .populate('usuario', 'nombre email') //rellena 'usuario' con los datos nombre y email de la coleccion usuario, si se quiere rellenar otro campo, generar otro ppopulate
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                categorias
            })
        });
});

//mostrar categoria por ID
app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe el id de categoria'
                }
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});

//crear categoria
app.post('/categoria', verificaToken, (req, res) => {
    //regresa la nueva categoria
    //devolver el id del usuario que creo la categoria (req.usuario._id)
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });
    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            res.status(400).json({
                ok: false,
                err: {
                    message: 'Error al crear categoria'
                }
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

//actualizar categoria
app.put('/categoria/:id', verificaToken, (req, res) => {
    //actualizar nombre de la categoria
    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    };
    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });


});

//borrar categoria
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    //solo puede borrarse por un administrador
    //borrar fisicamente(Categoria.findByIdAndRemove)
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Categoria borrada'
        })
    })
});


module.exports = app;