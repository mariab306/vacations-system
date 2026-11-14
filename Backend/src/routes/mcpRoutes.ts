import { Router } from 'express';
import { handleMcpQuery } from '../controllers/mcpController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
router.use(authenticateToken);
router.post('/query', handleMcpQuery);

export default router;