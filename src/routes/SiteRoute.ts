import express from 'express';
import { deleteSite ,createSite} from '../controller/SitesController';

const router = express.Router();

router.delete('/deletesite/:id', deleteSite);
router.delete('/createSite', createSite);

export default router;