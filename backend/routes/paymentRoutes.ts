import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import paymentController from '../controllers/payment/paymentController';

const router = Router();

router.get('/payment/create-stripe-connect-account', authMiddleware, paymentController.create_stripe_connect_account);

router.put('/payment/active-stripe-connect-account/:activeCode', authMiddleware, paymentController.active_stripe_connect_account);

router.get('/payment/seller-payment-details/:sellerId', authMiddleware, paymentController.get_seller_payment_details);

router.post('/payment/withdrowal-request', authMiddleware, paymentController.withdrowal_request);

router.get('/payment/request', authMiddleware, paymentController.get_payment_request);

router.post('/payment/request-confirm', authMiddleware, paymentController.payment_request_confirm);

export default router;
