import express from 'express';
const router = express.Router()
import {getallCategory, createCategory, deleteCategory, editCategory, getCategorybyID} from '../controllers/categoryController.js'
import { authenmiddleware } from '../controllers/authController.js';



router.get('/getallcategory',getallCategory)
router.get('/getcategorybyid',getCategorybyID)
router.post('/createcategory',authenmiddleware, createCategory)
router.delete('/deletecategory',authenmiddleware, deleteCategory)
router.put('/editcategory',authenmiddleware, editCategory)

export default router;