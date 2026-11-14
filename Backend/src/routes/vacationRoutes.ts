import { Router } from 'express';
import { getAllVacations, getVacationById, addVacation, updateVacation, deleteVacation, getVacationReports, exportVacationsCsv } from '../controllers/vacationController';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware';
import { upload } from '../middleware/uploadMiddleware';

const router = Router();
router.use(authenticateToken);

router.get('/', getAllVacations);
router.get('/reports/csv', isAdmin, exportVacationsCsv);
router.get('/reports', isAdmin, getVacationReports);
router.get('/:id', isAdmin, getVacationById);
router.post('/', isAdmin, upload.single('image'), addVacation);
router.put('/:id', isAdmin, upload.single('image'), updateVacation);
router.delete('/:id', isAdmin, deleteVacation);

export default router;