//Código que arranca la app
//Imports
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import {initiateDB} from './database' //importamos la funcion para init DB
import router from './routes/routes';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';
import passport from "passport";
import User from "./models/User";

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
app.use(passport.initialize()); //

//Rutas (definimo el path y luego indicamos la variable que importamos del folder Routes)

// passport config
// passport.use(new passportLocal.Strategy({
//         usernameField: 'email'
//     },
//     function(username, password, done) {
//         console.log('In Local Strategy')
//         User.findOne({ email: username }, function(err, user:any) {
//             if (err) { return done(err); }
//             if (!user) {
//                 return done(null, false, { message: 'Incorrect email.' });
//             }
//             user.comparePassword(password, (err: Error, isMatch: boolean) => {
//                 if (err) { return done(err); }
//                 if (isMatch) {
//                     return done(undefined, user);
//                 }
//                 return done(undefined, false, { message: "Invalid username or password." });
//             });
//         });
//     }
// ));

//Aqui utilizamos .use porque tendremos varias rutas

//Archivos estaticos

//DataBase
initiateDB();

//Inicialización del Servidor
app.listen(port,function(){
    console.log('Server Listening on port: '+port);

    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

}
);


