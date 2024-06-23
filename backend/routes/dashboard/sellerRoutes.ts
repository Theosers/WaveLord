import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import sellerController from '../../controllers/dashboard/sellerController';

const router = Router();

router.get('/request-seller-get', authMiddleware, sellerController.request_seller_get);
router.get('/get-seller/:sellerId', authMiddleware, sellerController.get_seller);
router.post('/seller-status-update', authMiddleware, sellerController.seller_status_update);

router.get('/get-sellers',authMiddleware, sellerController.get_active_sellers) 

router.get('/get-deactive-sellers',authMiddleware, sellerController.get_deactive_sellers) 

export default router;
