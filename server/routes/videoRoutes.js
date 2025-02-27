import express from 'express';
import { getVideo, editVideo } from '../controllers/videoController.js'
import { authenmiddleware } from '../controllers/authController.js';

const router = express.Router()



router.get('/getvideo', getVideo)

router.put('/editvideo', authenmiddleware, editVideo)

export default router;