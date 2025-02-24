import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import {getallCategory, createCategory, deleteCategory, editCategory, getCategorybyID} from '../controllers/categoryController.js'
import { authenmiddleware } from '../controllers/authController.js';

const router = express.Router()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'uploads'));  // Absolute path to uploads folder
        // cb(null, path.join(__dirname, '..', 'uploads')); 
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
        fileSize: 3 * 1024 * 1024 // 3MB
    }
});

router.post('/createcategory', upload.fields([
    { name: 'picture_1', maxCount: 1 }
]), authenmiddleware, createCategory)


router.put('/editcategory', upload.fields([
    { name: 'picture_1', maxCount: 1 }
]), authenmiddleware, editCategory)


router.get('/getallcategory', getallCategory)
router.get('/getcategorybyid', getCategorybyID)
router.delete('/deletecategory', authenmiddleware, deleteCategory)

export default router;