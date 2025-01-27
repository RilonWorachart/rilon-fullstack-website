import express from 'express';
import multer from 'multer';
import { createProduct, deleteProduct, editProduct, getproductbyId, getproductbyCategory, getallProduct } from '../controllers/productController.js';
import { authenmiddleware } from '../controllers/authController.js';
const router = express.Router();



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "../public/uploads")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage})


router.get('/getallproduct', getallProduct);
router.get('/getproductbyid', getproductbyId);
router.get('/getproductbycategory', getproductbyCategory);
router.post('/createproduct', authenmiddleware,upload.single('file'), createProduct);
router.put('/editproduct', authenmiddleware, editProduct);
router.delete('/deleteproduct', authenmiddleware, deleteProduct);

// Using export default in ES Modules
export default router;