import express from 'express';
import {getallSearchword, createSearchword, deleteSearchword, getSearchwordbyID} from '../controllers/searchwordController.js'
import { authenmiddleware } from '../controllers/authController.js';

const router = express.Router()

router.post('/createsearchword', authenmiddleware, createSearchword)
router.get('/getallsearchword', getallSearchword)
router.get('/getsearchwordbyid', getSearchwordbyID)
router.delete('/deletesearchword', authenmiddleware, deleteSearchword)

export default router;