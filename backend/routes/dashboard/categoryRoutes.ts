import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import categoryController from '../../controllers/dashboard/categoryController'; 

const router = Router();

router.post('/category-add', authMiddleware, categoryController.add_category);
router.get('/category-get', authMiddleware, categoryController.get_category);

export default router;
