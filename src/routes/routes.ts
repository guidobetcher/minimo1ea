import {Router} from 'express';
import userRoute from './userRoute';
const router:Router = Router();

console.log('Hello User');
router.use('/user',userRoute)


export default router;