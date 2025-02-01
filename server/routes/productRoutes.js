import express from 'express';
import multer from 'multer';
import path from 'path';
import { createProduct, deleteProduct, editProduct, getproductbyId, getproductbyCategory, getallProduct, getFilteredProducts } from '../controllers/productController.js';
import { authenmiddleware } from '../controllers/authController.js';
import { fileURLToPath } from 'url';

const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'uploads'));  // Absolute path to uploads folder
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); // Get the file extension
        cb(null, `${Date.now()}_${file.fieldname}${ext}`); // Create a unique filename
    }
});


const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|svg/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true); // Accept the file
    } else {
        return cb(new Error('Invalid file type. Only image files (jpg, jpeg, png, svg) are allowed.'));
    }
};

const upload = multer({ 
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB
    }
});


// Define the routes
router.post('/createproduct', upload.fields([
    { name: 'picture_1', maxCount: 1 },
    { name: 'picture_2', maxCount: 1 }
]),authenmiddleware, createProduct);


router.put('/editproduct',upload.fields([
    { name: 'picture_1', maxCount: 1 },
    { name: 'picture_2', maxCount: 1 }
]),authenmiddleware, editProduct);


router.delete('/deleteproduct', authenmiddleware, deleteProduct);
router.get('/getallproduct', getallProduct);
router.get('/getproductbyid', getproductbyId);
router.get('/getproductbycategory', getproductbyCategory);
router.get('/getfilterproduct', getFilteredProducts)

// Export the router
export default router;
