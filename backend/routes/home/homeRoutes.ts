import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import homeControllers from '../../controllers/home/homeControllers';

const router = Router();

router.get('/get-categories', authMiddleware, homeControllers.get_categorys);
router.get('/get-products', authMiddleware, homeControllers.get_products);
router.get('/price-range-latest-product', authMiddleware,  homeControllers.price_range_product);
router.get('/query-products', authMiddleware, homeControllers.query_products);
router.get('/product-details/:slug', authMiddleware, homeControllers.product_details);
router.post('/customer/submit-review',authMiddleware, homeControllers.submit_review);
router.get('/customer/get-reviews/:productId', authMiddleware, homeControllers.get_reviews);

export default router;
