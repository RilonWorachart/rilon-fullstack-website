import express from 'express';
import multer from 'multer';
import path from 'path';
import { createProduct, deleteProduct, editProduct, getproductbyId, getproductbyCategory, getallProduct, getFilteredProducts, getallCatelogProduct, deleteProductModel, deleteProductPicture2 } from '../controllers/productController.js';
import { authenmiddleware } from '../controllers/authController.js';
import { fileURLToPath } from 'url';

const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, path.join(__dirname, '..', 'public', 'uploads'));  // Absolute path to uploads folder on localhost
        cb(null, path.join(__dirname, 'api', 'uploads'));  // Absolute path to uploads folder on c-panel
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); // Get the file extension
        cb(null, `${Date.now()}_${file.fieldname}${ext}`); // Create a unique filename
    }
});


const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|svg|glb|gltf/;
    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    // Log the file extension and MIME type for debugging
    console.log("File Extension:", extname);
    console.log("MIME Type:", mimetype);

    // Check if the extension is valid
    const isValidExtension = fileTypes.test(extname);

    // Check if the MIME type matches allowed types
    const isValidMimeType =
        mimetype === 'model/gltf-binary' ||  // Correct MIME type for .glb files
        mimetype === 'application/json' ||   // Correct MIME type for .gltf files
        mimetype === 'application/octet-stream' ||  // Possible fallback for .glb MIME type
        fileTypes.test(mimetype);            // For other image types (jpeg, png, etc.)

    console.log("Valid Extension:", isValidExtension);
    console.log("Valid MIME Type:", isValidMimeType);

    if (isValidExtension && isValidMimeType) {
        return cb(null, true); // Accept the file
    } else {
        return cb(new Error('Invalid file type. Only image files (jpg, jpeg, png, svg, glb, gltf) are allowed.'));
    }
};

const upload = multer({ 
    storage,
    fileFilter,
    limits: {
        fileSize: 6 * 1024 * 1024 // 6MB
    }
});


// Define the routes
router.post('/createproduct', upload.fields([
    { name: 'picture_1', maxCount: 1 },
    { name: 'picture_2', maxCount: 1 },
    { name: 'model',  maxCount: 1}
]), authenmiddleware, createProduct);


router.put('/editproduct',upload.fields([
    { name: 'picture_1', maxCount: 1 },
    { name: 'picture_2', maxCount: 1 },
    { name: 'model',  maxCount: 1}
]), authenmiddleware, editProduct);


router.get('/getallproduct', getallProduct);
router.get('/getproductbyid', getproductbyId);
router.get('/getproductbycategory', getproductbyCategory);
router.get('/getfilterproduct', getFilteredProducts)
router.get('/getallcatelog', getallCatelogProduct)
router.delete('/deleteproduct', authenmiddleware, deleteProduct);
router.delete('/deleteproductpicture2',authenmiddleware,deleteProductPicture2);
router.delete('/deleteproductmodel',authenmiddleware,deleteProductModel);

// Export the router
export default router;
