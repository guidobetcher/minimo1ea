import { Router } from 'express';
import serviceUser from '../services/serviceUser'

const router: Router = Router();

router.get('/getUser',serviceUser.getUserById);
router.post('/addUser',serviceUser.addUser);




export default router;
