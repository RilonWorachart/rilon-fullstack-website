import express from 'express';
const router = express.Router()
import {login, authen} from '../controllers/authController.js'


router.post('/login',login)
router.get('/authen',authen)

export default router;