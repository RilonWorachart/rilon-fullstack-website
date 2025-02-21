import express from 'express';
const router = express.Router()
import {getallForm, createForm} from '../controllers/formController.js'
import { authenmiddleware } from '../controllers/authController.js';



router.post('/createform',createForm)
router.get('/getallform',authenmiddleware, getallForm)


export default router;