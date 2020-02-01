//config globales, cambiar entre variables de desarrollo y de produccion

//puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//Vencimiento del token
//60 segs,60mins,24hrs,30dias
process.env.CADUCIDAD_TOKEN = '48h';

//Seed de autenticacion
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//BD
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI; //var de entorno seteada en heroku
}

process.env.URLDB = urlDB;

//GOOGLE CLIENT
process.env.CLIENT_ID = process.env.CLIENT_ID || '289829149668-lf93r5g1sekcefccepfti495u5342ufe.apps.googleusercontent.com';