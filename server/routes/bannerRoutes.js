import express from 'express';
import { authenmiddleware } from '../controllers/authController.js';
import { createBannerJW, createBannerRilon, createBannerTop, deleteBannerJW, deleteBannerRilon, deleteBannerTop, getallBannerJW, getallBannerRilon, getallBannerTop } from '../controllers/bannerController.js';

const router = express.Router()

router.get('/getbannertop', getallBannerTop)
router.get('/getbannerrilon', getallBannerRilon)
router.get('/getbannerjw', getallBannerJW)

router.post('/createbannertop', authenmiddleware, createBannerTop)
router.post('/createbannerrilon', authenmiddleware, createBannerRilon)
router.post('/createbannerjw', authenmiddleware, createBannerJW)

router.delete('/deletebannertop', authenmiddleware, deleteBannerTop)
router.delete('/deletebannerrilon', authenmiddleware, deleteBannerRilon)
router.delete('/deletebannerjw', authenmiddleware, deleteBannerJW)


export default router;