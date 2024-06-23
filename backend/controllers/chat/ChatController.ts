import { Request, Response } from 'express';
import sellerModel, { Seller } from '../../models/sellerModel';
import customerModel from '../../models/customerModel';
import sellerCustomerModel, { SellerCustomer, Friend } from '../../models/chat/sellerCustomerModel';
import sellerCustomerMessage from '../../models/chat/sellerCustomerMessage';
import adminSellerMessage from '../../models/chat/adminSellerMessage';
import { responseReturn } from '../../utilities/response';

class ChatController {
    add_customer_friend = async (req: Request, res: Response) => {
        const { sellerId, userId } = req.body;

        try {
            if (sellerId !== '') {
                const seller = await sellerModel.findById(sellerId).exec();
                const user = await customerModel.findById(userId).exec();
                const checkSeller = await sellerCustomerModel.findOne({
                    myId: userId,
                    'myFriends.fdId': sellerId
                }).exec();

                if (!checkSeller) {
                    await sellerCustomerModel.updateOne(
                        { myId: userId },
                        {
                            $push: {
                                myFriends: {
                                    fdId: sellerId,
                                    name: seller?.shopInfo?.shopName || '',
                                    image: seller?.image || ''
                                } as Friend
                            }
                        }
                    );
                }

                const checkCustomer = await sellerCustomerModel.findOne({
                    myId: sellerId,
                    'myFriends.fdId': userId
                }).exec();

                if (!checkCustomer) {
                    await sellerCustomerModel.updateOne(
                        { myId: sellerId },
                        {
                            $push: {
                                myFriends: {
                                    fdId: userId,
                                    name: user?.name || '',
                                    image: ''
                                } as Friend
                            }
                        }
                    );
                }

                const messages = await sellerCustomerMessage.find({
                    $or: [
                        { receverId: sellerId, senderId: userId },
                        { receverId: userId, senderId: sellerId }
                    ]
                }).exec();

                const myFriends = await sellerCustomerModel.findOne({ myId: userId }).exec();
                const currentFd = myFriends?.myFriends.find((friend: Friend) => friend.fdId === sellerId);

                responseReturn(res, 200, {
                    MyFriends: myFriends?.myFriends,
                    currentFd,
                    messages
                });
            } else {
                const myFriends = await sellerCustomerModel.findOne({ myId: userId }).exec();
                responseReturn(res, 200, {
                    MyFriends: myFriends?.myFriends || []
                });
            }
        } catch (error) {
            console.log(error);
            responseReturn(res, 500, { error: 'Internal Server Error' });
        }
    }

    customer_message_add = async (req: Request, res: Response) => {
        const { userId, text, sellerId, name } = req.body;

        try {
            const message = await sellerCustomerMessage.create({
                senderId: userId,
                senderName: name,
                receverId: sellerId,
                message: text
            });

            const data = await sellerCustomerModel.findOne({ myId: userId }).exec();
            const myFriends = data?.myFriends || [];
            const index = myFriends.findIndex((friend: Friend) => friend.fdId === sellerId);
            if (index > -1) {
                const temp = myFriends[index];
                myFriends[index] = myFriends[index - 1];
                myFriends[index - 1] = temp;
            }
            await sellerCustomerModel.updateOne(
                { myId: userId },
                { myFriends }
            );

            const data1 = await sellerCustomerModel.findOne({ myId: sellerId }).exec();
            const myFriends1 = data1?.myFriends || [];
            const index1 = myFriends1.findIndex((friend: Friend) => friend.fdId === userId);
            if (index1 > -1) {
                const temp1 = myFriends1[index1];
                myFriends1[index1] = myFriends1[index1 - 1];
                myFriends1[index1 - 1] = temp1;
            }
            await sellerCustomerModel.updateOne(
                { myId: sellerId },
                { myFriends: myFriends1 }
            );

            responseReturn(res, 201, { message });
        } catch (error) {
            console.log(error);
            responseReturn(res, 500, { error: 'Internal Server Error' });
        }
    }

    get_customers = async (req: Request, res: Response) => {
        const { sellerId } = req.params;
        try {
            const data = await sellerCustomerModel.findOne({ myId: sellerId }).exec();
            responseReturn(res, 200, { customers: data?.myFriends });
        } catch (error) {
            console.log(error);
            responseReturn(res, 500, { error: 'Internal Server Error' });
        }
    }

    get_customers_seller_message = async (req: Request, res: Response) => {
        const { customerId } = req.params;
        const { id } = req;

        try {
            const messages = await sellerCustomerMessage.find({
                $or: [
                    { receverId: customerId, senderId: id },
                    { receverId: id, senderId: customerId }
                ]
            }).exec();

            const currentCustomer = await customerModel.findById(customerId).exec();
            responseReturn(res, 200, { messages, currentCustomer });
        } catch (error) {
            console.log(error);
            responseReturn(res, 500, { error: 'Internal Server Error' });
        }
    }

    seller_message_add = async (req: Request, res: Response) => {
        const { senderId, receverId, text, name } = req.body;
        try {
            const message = await sellerCustomerMessage.create({
                senderId,
                senderName: name,
                receverId,
                message: text
            });

            const data = await sellerCustomerModel.findOne({ myId: senderId }).exec();
            const myFriends = data?.myFriends || [];
            const index = myFriends.findIndex((friend: Friend) => friend.fdId === receverId);
            if (index > -1) {
                const temp = myFriends[index];
                myFriends[index] = myFriends[index - 1];
                myFriends[index - 1] = temp;
            }
            await sellerCustomerModel.updateOne(
                { myId: senderId },
                { myFriends }
            );

            const data1 = await sellerCustomerModel.findOne({ myId: receverId }).exec();
            const myFriends1 = data1?.myFriends || [];
            const index1 = myFriends1.findIndex((friend: Friend) => friend.fdId === senderId);
            if (index1 > -1) {
                const temp1 = myFriends1[index1];
                myFriends1[index1] = myFriends1[index1 - 1];
                myFriends1[index1 - 1] = temp1;
            }
            await sellerCustomerModel.updateOne(
                { myId: receverId },
                { myFriends: myFriends1 }
            );

            responseReturn(res, 201, { message });
        } catch (error) {
            console.log(error);
            responseReturn(res, 500, { error: 'Internal Server Error' });
        }
    }

    get_sellers = async (req: Request, res: Response) => {
        try {
            const sellers = await sellerModel.find({}).exec();
            responseReturn(res, 200, { sellers });
        } catch (error) {
            console.log(error);
            responseReturn(res, 500, { error: 'Internal Server Error' });
        }
    }

    seller_admin_message_insert = async (req: Request, res: Response) => {
        const { senderId, receverId, message, senderName } = req.body;

        try {
            const messageData = await adminSellerMessage.create({
                senderId,
                receverId,
                message,
                senderName
            });
            responseReturn(res, 200, { message: messageData });
        } catch (error) {
            console.log(error);
            responseReturn(res, 500, { error: 'Internal Server Error' });
        }
    }

    get_admin_messages = async (req: Request, res: Response) => {
        const { receverId } = req.params;
        const id = "";

        try {
            const messages = await adminSellerMessage.find({
                $or: [
                    { receverId, senderId: id },
                    { receverId: id, senderId: receverId }
                ]
            }).exec();

            let currentSeller: Partial<Seller> | null = null; // Utilisation de Partial<Seller> pour gérer le cas où currentSeller peut être partiellement défini
            if (receverId) {
                currentSeller = await sellerModel.findById(receverId).exec();
            }
            responseReturn(res, 200, { messages, currentSeller });
        } catch (error) {
            console.log(error);
            responseReturn(res, 500, { error: 'Internal Server Error' });
        }
    }

    get_seller_messages = async (req: Request, res: Response) => {
        const receverId = "";
        const { id } = req;

        try {
            const messages = await adminSellerMessage.find({
                $or: [
                    { receverId, senderId: id },
                    { receverId: id, senderId: receverId }
                ]
            }).exec();

            responseReturn(res, 200, { messages });
        } catch (error) {
            console.log(error);
            responseReturn(res, 500, { error: 'Internal Server Error' });
        }
    }
}

export default new ChatController();
