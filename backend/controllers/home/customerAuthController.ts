import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import customerModel from '../../models/customerModel';
import sellerCustomerModel from '../../models/chat/sellerCustomerModel';
import { responseReturn } from '../../utilities/response';
import { createToken } from '../../utilities/tokenCreate';

class CustomerAuthController {
    customer_register = async (req: Request, res: Response) => {
        const { name, email, password } = req.body;

        try {
            const customer = await customerModel.findOne({ email });
            if (customer) {
                responseReturn(res, 404, { error: 'Email Already Exists' });
            } else {
                const createCustomer = await customerModel.create({
                    name: name.trim(),
                    email: email.trim(),
                    password: await bcrypt.hash(password, 10),
                    method: 'manual',
                });
                await sellerCustomerModel.create({
                    myId: createCustomer.id,
                });
                const token = await createToken({
                    id: createCustomer.id,
                    name: createCustomer.name,
                    email: createCustomer.email,
                    method: createCustomer.method,
                });
                res.cookie('customerToken', token, {
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                });
                responseReturn(res, 201, { message: 'User Register Success', token });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };

    customer_login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const customer = await customerModel.findOne({ email }).select('+password');
            if (customer) {
                const match = await bcrypt.compare(password, customer.password);
                if (match) {
                    const token = await createToken({
                        id: customer.id,
                        name: customer.name,
                        email: customer.email,
                        method: customer.method,
                    });
                    res.cookie('customerToken', token, {
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    });
                    responseReturn(res, 201, { message: 'User Login Success', token });
                } else {
                    responseReturn(res, 404, { error: 'Password Wrong' });
                }
            } else {
                responseReturn(res, 404, { error: 'Email Not Found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };

    customer_logout = async (req: Request, res: Response) => {
        res.cookie('customerToken', '', {
            expires: new Date(Date.now()),
        });
        responseReturn(res, 200, { message: 'Logout Success' });
    };
}

export default new CustomerAuthController();
