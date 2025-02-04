import express from 'express';
import {getallBrand, createBrand, deleteBrand, getBrandbyID} from '../controllers/brandController.js'
import { authenmiddleware } from '../controllers/authController.js';

const router = express.Router()


router.post('/createbrand', authenmiddleware, createBrand)
router.get('/getallbrand', getallBrand)
router.get('/getbrandbyid', getBrandbyID)
router.delete('/deletebrand', authenmiddleware, deleteBrand)

export default router;