require('./config/config')

const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //para trabajar POST

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())






app.get('/', (req, res) => {
    //res.send('Hello world'); send envia un html
    res.json('Hello world'); //envia json
})

app.get('/usuario', (req, res) => {
    res.json('get usuario'); //envia json
})

app.post('/usuario', (req, res) => {

    let body = req.body; //req.body es el resultado del payload que procesa bodyParser

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        }); //devolver un error 400(bad request)
    } else {
        res.json({
            persona: body
        }); //envia json

    }

})

app.put('/usuario/:id', (req, res) => { //id vuelve como valor para el put
    let id = req.params.id;


    res.json({
        id
    }); //envia json
})

app.delete('/usuario', (req, res) => {
    res.json('delete usuario'); //envia json
})

app.listen(process.env.PORT, () => {
    console.log("escuchando el puerto", 3000);
})