import { Router } from 'express';
import serviceUser from '../services/serviceUser'

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const router: Router = Router();

router.get('/getUser',serviceUser.getUserById,swaggerUi.setup(swaggerDocument));
router.post('/addUser',serviceUser.addUser,swaggerUi.setup(swaggerDocument));




export default router;