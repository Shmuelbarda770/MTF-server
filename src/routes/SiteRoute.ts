import express from 'express';
import { deleteSite,getAllSites,createSite } from '../controller/SitesController';

const router = express.Router();

router.delete('/deletesite/:id', deleteSite)
router.post('/getAllSites', getAllSites);
router.post('/createSite', createSite);

export default router;