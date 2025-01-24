import express from 'express';
const router = express.Router()
import {login, authen, getUser, register} from '../controllers/authController.js'


router.post('/login', login)
router.get('/authen', authen)
router.post('/register',register)
router.get('/getuser', authen, getUser)

export default router;