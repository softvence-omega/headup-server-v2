import express from 'express';
import { usercontroller } from './user.controller';
const router = express.Router();
router.post('/', usercontroller.createUser);
router.post('/sendEmail', usercontroller.sendEmail);

export const userRoute = router;
