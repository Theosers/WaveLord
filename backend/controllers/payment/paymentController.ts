import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongoose';
import stripePackage from 'stripe';

import sellerModel from '../../models/sellerModel';
import stripeModel from '../../models/stripeModel';
import sellerWallet from '../../models/sellerWallet';
import withdrowRequest from '../../models/withdrowRequest';
import { responseReturn } from '../../utilities/response';
import mongoose from '../../utilities/db';

const { ObjectId } = mongoose.Types;

const stripe = new stripePackage('sk_test_51PV8BIJf3dd1pVi4bvsQpNt4OPi0Obdf2p94k3YVLu0kPRQLDbQ1oIjDmdC5uQ2FEBy9iIOXcqyMfzpcBvB9hhTK00PaNiIES0', {
    apiVersion: '2024-04-10',
});

class PaymentController {
    create_stripe_connect_account = async (req: Request, res: Response) => {
        const { id } = req;
        const uid = uuidv4();

        try {
            const stripeInfo = await stripeModel.findOne({ sellerId: id });

            if (stripeInfo) {
                await stripeModel.deleteOne({ sellerId: id });
            }

            const account = await stripe.accounts.create({ type: 'express' });

            const accountLink = await stripe.accountLinks.create({
                account: account.id,
                refresh_url: 'http://localhost:3001/refresh',
                return_url: `http://localhost:3001/success?activeCode=${uid}`,
                type: 'account_onboarding',
            });

            await stripeModel.create({
                sellerId: id,
                stripeId: account.id,
                code: uid,
            });

            responseReturn(res, 201, { url: accountLink.url });
        } catch (error) {
            console.log('Stripe connect account error: ' + (error as Error).message);
            responseReturn(res, 500, { message: 'Internal Server Error' });
        }
    };

    active_stripe_connect_account = async (req: Request, res: Response) => {
        const { activeCode } = req.params;
        const { id } = req;

        try {
            const userStripeInfo = await stripeModel.findOne({ code: activeCode });

            if (userStripeInfo) {
                await sellerModel.findByIdAndUpdate(id, {
                    payment: 'active',
                });
                responseReturn(res, 200, { message: 'Payment Active' });
            } else {
                responseReturn(res, 404, { message: 'Payment Activation Failed' });
            }
        } catch (error) {
            responseReturn(res, 500, { message: 'Internal Server Error' });
        }
    };

    sumAmount = (data: { amount: number }[]) => {
        return data.reduce((sum, item) => sum + item.amount, 0);
    };

    get_seller_payment_details = async (req: Request, res: Response) => {
        const { sellerId } = req.params;

        try {
            const payments = await sellerWallet.find({ sellerId });

            const pendingWithdrows = await withdrowRequest.find({
                sellerId,
                status: 'pending',
            });

            const successWithdrows = await withdrowRequest.find({
                sellerId,
                status: 'success',
            });

            const pendingAmount = this.sumAmount(pendingWithdrows);
            const withdrowAmount = this.sumAmount(successWithdrows);
            const totalAmount = this.sumAmount(payments);

            const availableAmount = totalAmount - (pendingAmount + withdrowAmount);

            responseReturn(res, 200, {
                totalAmount,
                pendingAmount,
                withdrowAmount,
                availableAmount,
                pendingWithdrows,
                successWithdrows,
            });
        } catch (error) {
            console.log((error as Error).message);
            responseReturn(res, 500, { message: 'Internal Server Error' });
        }
    };

    withdrowal_request = async (req: Request, res: Response) => {
        const { amount, sellerId } = req.body;

        try {
            const withdrowal = await withdrowRequest.create({
                sellerId,
                amount: parseInt(amount, 10),
            });
            responseReturn(res, 200, { withdrowal, message: 'Withdrawal Request Sent' });
        } catch (error) {
            responseReturn(res, 500, { message: 'Internal Server Error' });
        }
    };

    get_payment_request = async (req: Request, res: Response) => {
        try {
            const withdrowalRequestList = await withdrowRequest.find({ status: 'pending' });
            responseReturn(res, 200, { withdrowalRequestList });
        } catch (error) {
            responseReturn(res, 500, { message: 'Internal Server Error' });
        }
    };

    payment_request_confirm = async (req: Request, res: Response) => {
        const { paymentId } = req.body;
        try {
            const payment = await withdrowRequest.findById(paymentId);
            if (!payment) {
                return responseReturn(res, 404, { message: 'Payment not found' });
            }

            const stripeAccount = await stripeModel.findOne({
                sellerId: new ObjectId(payment.sellerId),
            });
            if (!stripeAccount) {
                return responseReturn(res, 404, { message: 'Stripe account not found' });
            }

            await stripe.transfers.create({
                amount: payment.amount * 100,
                currency: 'usd',
                destination: stripeAccount.stripeId,
            });

            await withdrowRequest.findByIdAndUpdate(paymentId, { status: 'success' });
            responseReturn(res, 200, { payment, message: 'Request Confirm Success' });
        } catch (error) {
            responseReturn(res, 500, { message: 'Internal Server Error' });
        }
    };
}

export default new PaymentController();
