import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongoose';
import stripePackage from 'stripe';
import moment from 'moment';

import authOrderModel from '../../models/authOrder';
import customerOrder from '../../models/customerOrder';
import myShopWallet from '../../models/myShopWallet';
import sellerWallet from '../../models/sellerWallet';
import cardModel from '../../models/cardModel';
import { responseReturn } from '../../utilities/response';
import mongoose from '../../utilities/db';

const { ObjectId } = mongoose.Types;

const stripe = new stripePackage('sk_test_51Oml5cGAwoXiNtjJZbPFBKav0pyrR8GSwzUaLHLhInsyeCa4HI8kKf2IcNeUXc8jc8XVzBJyqjKnDLX9MlRjohrL003UDGPZgQ', {
    apiVersion: '2024-04-10',
});

class OrderController {
    paymentCheck = async (id: string) => {
        try {
            const order = await customerOrder.findById(id);
            if (order?.payment_status === 'unpaid') {
                await customerOrder.findByIdAndUpdate(id, {
                    delivery_status: 'cancelled',
                });
                await authOrderModel.updateMany(
                    { orderId: id },
                    { delivery_status: 'cancelled' }
                );
            }
            return true;
        } catch (error) {
            console.log(error);
        }
    };

    place_order = async (req: Request, res: Response) => {
        const { price, products, shipping_fee, shippingInfo, userId } = req.body;
        let authorOrderData = [];
        let cardId = [];
        const tempDate = moment(Date.now()).format('LLL');

        let customerOrderProduct = [];

        for (let i = 0; i < products.length; i++) {
            const pro = products[i].products;
            for (let j = 0; j < pro.length; j++) {
                const tempCusPro = pro[j].productInfo;
                tempCusPro.quantity = pro[j].quantity;
                customerOrderProduct.push(tempCusPro);
                if (pro[j]._id) {
                    cardId.push(pro[j]._id);
                }
            }
        }

        try {
            const order = await customerOrder.create({
                customerId: userId,
                shippingInfo,
                products: customerOrderProduct,
                price: price + shipping_fee,
                payment_status: 'unpaid',
                delivery_status: 'pending',
                date: tempDate,
            });
            for (let i = 0; i < products.length; i++) {
                const pro = products[i].products;
                const pri = products[i].price;
                const sellerId = products[i].sellerId;
                let storePor = [];
                for (let j = 0; j < pro.length; j++) {
                    const tempPro = pro[j].productInfo;
                    tempPro.quantity = pro[j].quantity;
                    storePor.push(tempPro);
                }

                authorOrderData.push({
                    orderId: order.id,
                    sellerId,
                    products: storePor,
                    price: pri,
                    payment_status: 'unpaid',
                    shippingInfo: 'Easy Main Warehouse',
                    delivery_status: 'pending',
                    date: tempDate,
                });
            }

            await authOrderModel.insertMany(authorOrderData);
            for (let k = 0; k < cardId.length; k++) {
                await cardModel.findByIdAndDelete(cardId[k]);
            }

            setTimeout(() => {
                this.paymentCheck(order.id);
            }, 15000);

            responseReturn(res, 200, { message: 'Order Placed Success', orderId: order.id });
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    get_customer_dashboard_data = async (req: Request, res: Response) => {
        const { userId } = req.params;

        try {
            const recentOrders = await customerOrder.find({
                customerId: new ObjectId(userId),
            }).limit(5);
            const pendingOrder = await customerOrder.find({
                customerId: new ObjectId(userId),
                delivery_status: 'pending',
            }).countDocuments();
            const totalOrder = await customerOrder.find({
                customerId: new ObjectId(userId),
            }).countDocuments();
            const cancelledOrder = await customerOrder.find({
                customerId: new ObjectId(userId),
                delivery_status: 'cancelled',
            }).countDocuments();
            responseReturn(res, 200, {
                recentOrders,
                pendingOrder,
                totalOrder,
                cancelledOrder,
            });
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    get_orders = async (req: Request, res: Response) => {
        const { customerId, status } = req.params;

        try {
            let orders = [];
            if (status !== 'all') {
                orders = await customerOrder.find({
                    customerId: new ObjectId(customerId),
                    delivery_status: status,
                });
            } else {
                orders = await customerOrder.find({
                    customerId: new ObjectId(customerId),
                });
            }
            responseReturn(res, 200, {
                orders,
            });
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    get_order_details = async (req: Request, res: Response) => {
        const { orderId } = req.params;

        try {
            const order = await customerOrder.findById(orderId);
            responseReturn(res, 200, {
                order,
            });
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    get_admin_orders = async (req: Request, res: Response) => {
        let { page, searchValue, parPage } = req.query as { [key: string]: string };
        const skipPage = parseInt(parPage) * (parseInt(page) - 1);

        try {
            if (searchValue) {
                // Add search logic here
            } else {
                const orders = await customerOrder.aggregate([
                    {
                        $lookup: {
                            from: 'authororders',
                            localField: '_id',
                            foreignField: 'orderId',
                            as: 'suborder',
                        },
                    },
                ]).skip(skipPage).limit(parseInt(parPage)).sort({ createdAt: -1 });

                const totalOrder = await customerOrder.aggregate([
                    {
                        $lookup: {
                            from: 'authororders',
                            localField: '_id',
                            foreignField: 'orderId',
                            as: 'suborder',
                        },
                    },
                ]);

                responseReturn(res, 200, { orders, totalOrder: totalOrder.length });
            }
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    get_admin_order = async (req: Request, res: Response) => {
        const { orderId } = req.params;
        try {
            const order = await customerOrder.aggregate([
                {
                    $match: { _id: new ObjectId(orderId) },
                },
                {
                    $lookup: {
                        from: 'authororders',
                        localField: '_id',
                        foreignField: 'orderId',
                        as: 'suborder',
                    },
                },
            ]);
            responseReturn(res, 200, { order: order[0] });
        } catch (error) {
            console.log('get admin order details' + (error as Error).message);
        }
    };

    admin_order_status_update = async (req: Request, res: Response) => {
        const { orderId } = req.params;
        const { status } = req.body;

        try {
            await customerOrder.findByIdAndUpdate(orderId, {
                delivery_status: status,
            });
            responseReturn(res, 200, { message: 'Order status change success' });
        } catch (error) {
            console.log('get admin status error' + (error as Error).message);
            responseReturn(res, 500, { message: 'Internal Server Error' });
        }
    };

    get_seller_orders = async (req: Request, res: Response) => {
        const { sellerId } = req.params;
        let { page, searchValue, parPage } = req.query as { [key: string]: string };
        const skipPage = parseInt(parPage) * (parseInt(page) - 1);

        try {
            if (searchValue) {
                // Add search logic here
            } else {
                const orders = await authOrderModel.find({
                    sellerId,
                }).skip(skipPage).limit(parseInt(parPage)).sort({ createdAt: -1 });
                const totalOrder = await authOrderModel.find({
                    sellerId,
                }).countDocuments();
                responseReturn(res, 200, { orders, totalOrder });
            }
        } catch (error) {
            console.log('get seller order error' + (error as Error).message);
            responseReturn(res, 500, { message: 'Internal Server Error' });
        }
    };

    get_seller_order = async (req: Request, res: Response) => {
        const { orderId } = req.params;

        try {
            const order = await authOrderModel.findById(orderId);
            responseReturn(res, 200, { order });
        } catch (error) {
            console.log('get seller details error' + (error as Error).message);
        }
    };

    seller_order_status_update = async (req: Request, res: Response) => {
        const { orderId } = req.params;
        const { status } = req.body;

        try {
            await authOrderModel.findByIdAndUpdate(orderId, {
                delivery_status: status,
            });
            responseReturn(res, 200, { message: 'Order status updated successfully' });
        } catch (error) {
            console.log('get seller order error' + (error as Error).message);
            responseReturn(res, 500, { message: 'Internal Server Error' });
        }
    };

    create_payment = async (req: Request, res: Response) => {
        const { price } = req.body;
        try {
            const payment = await stripe.paymentIntents.create({
                amount: price * 100,
                currency: 'usd',
                automatic_payment_methods: {
                    enabled: true,
                },
            });
            responseReturn(res, 200, { clientSecret: payment.client_secret });
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    order_confirm = async (req: Request, res: Response) => {
        const { orderId } = req.params;
        try {
            await customerOrder.findByIdAndUpdate(orderId, { payment_status: 'paid' });
            await authOrderModel.updateMany({ orderId: new ObjectId(orderId) }, {
                payment_status: 'paid',
                delivery_status: 'pending',
            });
            const cuOrder = await customerOrder.findById(orderId);

            const auOrder = await authOrderModel.find({
                orderId: new ObjectId(orderId),
            });

            const time = moment(Date.now()).format('l');
            const splitTime = time.split('/');

            await myShopWallet.create({
                amount: cuOrder?.price,
                month: splitTime[0],
                year: splitTime[2],
            });

            for (let i = 0; i < auOrder.length; i++) {
                await sellerWallet.create({
                    sellerId: auOrder[i].sellerId.toString(),
                    amount: auOrder[i].price,
                    month: splitTime[0],
                    year: splitTime[2],
                });
            }
            responseReturn(res, 200, { message: 'success' });
        } catch (error) {
            console.log((error as Error).message);
        }
    };
}

export default new OrderController();
