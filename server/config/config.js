//config globales, cambiar entre variables de desarrollo y de produccion

//puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//BD
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = "mongodb+srv://madvito:R5VHRpjbdn6oOW9f@cluster0-larmv.mongodb.net/cafe";
}

process.env.URLDB = urlDB;