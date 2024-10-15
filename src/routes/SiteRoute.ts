import express from 'express';
import { deleteSite, getAllSites, searchSites } from '../controller/SitesController';

const router = express.Router();

router.delete('/deletesite/:id', deleteSite);
router.post('/getAllSites', getAllSites);
router.post('/searchSites', searchSites);

export default router;