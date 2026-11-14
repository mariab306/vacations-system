import { Router } from 'express';
import { getRecommendation } from '../controllers/aiController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
router.use(authenticateToken);
router.post('/recommendation', getRecommendation);

export default router;