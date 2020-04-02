import { Router } from 'express';
import serviceUser from '../services/serviceUser';
import authService from '../services/authService';

const router: Router = Router();

router.get('/getUser',authService.authenticateJWT,serviceUser.getUserById); // Returns the user matching with an id.
router.post('/addUser',serviceUser.addUser); // Register a user to the database.
router.post('/login',serviceUser.userLogin); // Verifies the credentials and turns the corresponding user




export default router;
