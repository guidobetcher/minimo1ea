import {Router} from 'express';
import userRoute from './userRoute';
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const router:Router = Router();

router.use('/user',userRoute,swaggerUi.serve)


export default router;



