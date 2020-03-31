//Código que arranca la app
//Imports
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import {initiateDB} from './database' //importamos la funcion para init DB
import router from './routes/routes';

//Importando Rutas

//Inicializaciones
const app: express.Application = express(); //App Init
const port : number = 3702;//Port

//Settings 
app.use(cors());
app.options('*',cors());
app.use( express.json() );
app.use( '', router );
app.use( bodyParser.json() );

//Middlewares
app.use(express.json()); //Para entender los JSON que me llegaran
app.use(express.urlencoded({extended: false}));//Cuando un form de html me llegue pueda interpretarlo

//Rutas (definimo el path y luego indicamos la variable que importamos del folder Routes)



//Aqui utilizamos .use porque tendremos varias rutas

//Archivos estaticos

//DataBase
initiateDB();

//Inicialización del Servidor
app.listen(port,function(){
    console.log('Server Listening on port: '+port)
}
);