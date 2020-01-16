const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //para manejar las duplicaciones en la bd

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'] //el segundo valor es un mensaje de error custom, se puede dejar el true solo sin los [] y devuelve msj generico
    },
    email: {
        type: String,
        unique: true, //hacer unico
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        default: 'USER_ROLE',
        enum: rolesValidos //el objeto de roles validos de arriba
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        required: false, //sera true si se registro con cuenta google
        default: false
    }
});

usuarioSchema.methods.toJSON = function() { //sacar el password del json que se retorna
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema); //nombre del modelo/esquema que usara