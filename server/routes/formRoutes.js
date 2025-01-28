import express from 'express';
const router = express.Router()
import {getallForm, createForm, sendMail} from '../controllers/formController.js'
import { authenmiddleware } from '../controllers/authController.js';



router.post('/createform',createForm)
router.get('/getallform',authenmiddleware, getallForm)
router.post('/send-email', sendMail)


export default router;