import express from 'express';
const router = express.Router()
import {getallCategory, createCategory, deleteCategory, editCategory} from '../controllers/categoryController.js'
import { authen } from '../controllers/authController.js';

router.get('/getallcategory',getallCategory)
router.post('/createcategory',authen, createCategory)
router.delete('/deletecategory',authen, deleteCategory)
router.put('/editcategory',authen, editCategory)

export default router;