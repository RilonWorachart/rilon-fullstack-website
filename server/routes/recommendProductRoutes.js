import express from 'express';
import multer from 'multer';
import path from 'path';
import { createrecommendProduct, deleterecommendProduct, getallrecommendProduct} from '../controllers/recommendProductController.js';
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
router.post('/createrecommendproduct', upload.fields([
    { name: 'image', maxCount: 1 },
]),authenmiddleware, createrecommendProduct);


router.delete('/deleterecommendproduct', authenmiddleware, deleterecommendProduct);
router.get('/getallrecommendproduct', getallrecommendProduct);


// Export the router
export default router;
