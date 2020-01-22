require('./config/config');

const express = require('express');
const mongoose = require('mongoose');


const app = express();
const bodyParser = require('body-parser'); //para trabajar POST



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//importar index que trae todas las rutas
app.use(require('./routes/index'));




app.get('/', (req, res) => {
    //res.send('Hello world'); send envia un html
    res.json('Hello world'); //envia json
})



mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, res) => { //conexion a la DB
        if (err) throw err;
        console.log('Base de datos Online');
    });


app.listen(process.env.PORT, () => {
    console.log("escuchando el puerto", 3000);
})