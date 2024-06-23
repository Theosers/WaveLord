import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import productController from '../../controllers/dashboard/productController';

const router = Router();

router.post('/product-add', authMiddleware, productController.add_product);
router.get('/products-get', authMiddleware, productController.products_get);
router.get('/product-get/:productId', authMiddleware, productController.product_get);
router.post('/product-update', authMiddleware, productController.product_update);
router.post('/product-image-update', authMiddleware, productController.product_image_update);

export default router;
