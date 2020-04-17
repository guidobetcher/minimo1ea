import { Router } from 'express';
import eventService from '../services/eventService';
import authService from '../services/authService';
import serviceUser from "../services/serviceUser";

const router: Router = Router();

router.get('/',eventService.getEvents); // Return all the events
router.post('/addEvent',eventService.addEvent); // Register an event to the database.
router.post('/updateEvent', eventService.updateEvent);
export default router;
