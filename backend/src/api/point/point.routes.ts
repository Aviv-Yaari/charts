import express from 'express';
import { catchSync } from '../../middlewares/catchSync.middleware';
import { requireAuth } from '../../middlewares/requireAuth.middleware';
import { getRandomPoint } from './point.controller';

const router = express.Router();

router.get('/', requireAuth, catchSync(getRandomPoint));

export default router;
