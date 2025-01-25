import express from 'express';
const router = express.Router();
import { createProduct, deleteProduct, editProduct, getproductbyId, getproductbyCategory, getallProduct } from '../controllers/productController.js';
import { authenmiddleware } from '../controllers/authController.js';


router.get('/getallproduct', getallProduct);
router.get('/getproductbyid', getproductbyId);
router.get('/getproductbycategory', getproductbyCategory);
router.post('/createproduct', authenmiddleware, createProduct);
router.put('/editproduct', authenmiddleware, editProduct);
router.delete('/deleteproduct', authenmiddleware, deleteProduct);

// Using export default in ES Modules
export default router;