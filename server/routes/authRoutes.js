import express from 'express';
const router = express.Router()
import {login, authen, getUser, register, authenmiddleware} from '../controllers/authController.js'


router.post('/login', login)
router.post('/authen', authen)
router.post('/register',register)
router.get('/getuser', authenmiddleware, getUser)

export default router;