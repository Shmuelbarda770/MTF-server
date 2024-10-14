import express from 'express';
import { deleteSite, getAllSites } from '../controller/SitesController';

const router = express.Router();

router.delete('/deletesite/:id', deleteSite)
router.post('/getAllSites', getAllSites)

export default router;