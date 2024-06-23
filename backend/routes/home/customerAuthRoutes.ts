import { Router } from 'express';
import customerAuthController from '../../controllers/home/customerAuthController';

const router = Router();

router.post('/customer/customer-register', customerAuthController.customer_register);
router.post('/customer/customer-login', customerAuthController.customer_login);

router.get('/customer/logout', customerAuthController.customer_logout);

export default router;
