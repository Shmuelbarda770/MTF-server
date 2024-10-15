import express from 'express';
import { deleteSite ,getAllSites,createSite} from '../controller/SitesController';

const router = express.Router();

router.delete('/deletesite/:id', deleteSite);
router.post('/getAllSites', getAllSites)
router.delete('/createSite', createSite);

export default router;