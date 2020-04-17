import {Router} from 'express';
import userRoute from './userRoute';
import eventRoute from './eventRoute';
const router:Router = Router();

router.use('/user',userRoute);
router.use('/event',eventRoute);

export default router;



