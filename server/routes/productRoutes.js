import express from 'express';
const router = express.Router();
import { createProduct, deleteProduct, editProduct, getproductbyId, getproductbyCategory, getallProduct } from '../controllers/productController.js';
import { authen } from '../controllers/authController.js';


router.get('/getallproduct', getallProduct);
router.get('/getproductbyid', getproductbyId);
router.get('/getproductbycategory', getproductbyCategory);
router.post('/createproduct', authen, createProduct);
router.put('/editproduct', authen, editProduct);
router.delete('/deleteproduct', authen, deleteProduct);

// Using export default in ES Modules
export default router;