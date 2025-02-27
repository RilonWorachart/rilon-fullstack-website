import express from 'express';
const router = express.Router()
import { createForm } from '../controllers/formController.js'



router.post('/createform',createForm)


export default router;