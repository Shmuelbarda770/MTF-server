import express from 'express';
import { deleteSite } from '../controller/SitesController';

const router = express.Router();

router.delete('/deletesite/:id', deleteSite)

export default router;