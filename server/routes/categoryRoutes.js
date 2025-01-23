import express from 'express';
const router = express.Router()
import {getallCategory} from '../controllers/categoryController.js'


router.get('/getallcategory',getallCategory)

export default router;