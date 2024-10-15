import express from 'express';
import { deleteSite ,getAllSites, searchSites,createSite} from '../controller/SitesController';

const router = express.Router();

router.delete('/deleteSite/:id', deleteSite);;
router.post('/getAllSites', getAllSites);
router.post('/searchSites', searchSites);
router.delete('/createSite', createSite);

export default router;