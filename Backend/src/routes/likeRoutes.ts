import { Router, Response, NextFunction } from 'express';
import { likeVacation, unlikeVacation } from '../controllers/likeController';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware';

const isRegularUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role === 'Admin') {
    return res.status(403).json({ message: 'Admins cannot like or unlike vacations' });
  }
  next();
};

const router = Router();
router.use(authenticateToken, isRegularUser);

router.post('/:vacationId', likeVacation);
router.delete('/:vacationId', unlikeVacation);

export default router;