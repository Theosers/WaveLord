import { Request, Response } from 'express';
import { Types } from 'mongoose';
import formidable, { Fields, Files, File } from 'formidable';
import cloudinary from 'cloudinary';

import { responseReturn } from "../../utilities/response";
import myShopWallet from '../../models/myShopWallet';
import productModel from '../../models/productModel';
import customerOrder from '../../models/customerOrder';
import sellerModel from '../../models/sellerModel';
import adminSellerMessage from '../../models/chat/adminSellerMessage';
import sellerWallet from '../../models/sellerWallet';
import authOrder from '../../models/authOrder';
import sellerCustomerMessage from '../../models/chat/sellerCustomerMessage';
import bannerModel from '../../models/bannerModel';

const { ObjectId } = Types;

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

class DashboardController {
    get_admin_dashboard_data = async (req: Request, res: Response) => {
        try {
            const totalSale = await myShopWallet.aggregate([
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: '$amount' }
                    }
                }
            ]);

            const totalProduct = await productModel.countDocuments();
            const totalOrder = await customerOrder.countDocuments();
            const totalSeller = await sellerModel.countDocuments();
            const messages = await adminSellerMessage.find({}).limit(3);
            const recentOrders = await customerOrder.find({}).limit(5);

            responseReturn(res, 200, {
                totalProduct,
                totalOrder,
                totalSeller,
                messages,
                recentOrders,
                totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0,
            });
        } catch (error) {
            if (error instanceof Error) {
                responseReturn(res, 500, { error: error.message });
            } else {
                responseReturn(res, 500, { error: 'An unknown error occurred.' });
            }
        }
    }

    get_seller_dashboard_data = async (req: Request, res: Response) => {
        const { id } = req;
        try {
            const totalSale = await sellerWallet.aggregate([
                {
                    $match: { sellerId: new ObjectId(id) }
                }, {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: '$amount' }
                    }
                }
            ]);

            const totalProduct = await productModel.countDocuments({ sellerId: new ObjectId(id) });
            const totalOrder = await authOrder.countDocuments({ sellerId: new ObjectId(id) });
            const totalPendingOrder = await authOrder.countDocuments({
                sellerId: new ObjectId(id),
                delivery_status: 'pending'
            });
            const messages = await sellerCustomerMessage.find({
                $or: [
                    { senderId: id },
                    { receverId: id }
                ]
            }).limit(3);
            const recentOrders = await authOrder.find({ sellerId: new ObjectId(id) }).limit(5);

            responseReturn(res, 200, {
                totalProduct,
                totalOrder,
                totalPendingOrder,
                messages,
                recentOrders,
                totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0,
            });
        } catch (error) {
            if (error instanceof Error) {
                responseReturn(res, 500, { error: error.message });
            } else {
                responseReturn(res, 500, { error: 'An unknown error occurred.' });
            }
        }
    }

    add_banner = async (req: Request, res: Response) => {
        const form = formidable({ multiples: true });
        form.parse(req, async (err: Error, fields: Fields, files: Files) => {
            const { productId } = fields;
            const mainban = Array.isArray(files.mainban) ? files.mainban[0] : files.mainban;

            if (err) {
                responseReturn(res, 500, { error: err.message });
                return;
            }

            if (!mainban) {
                responseReturn(res, 400, { error: 'Banner image is required' });
                return;
            }

            try {
                const product = await productModel.findById(productId);
                if (!product) {
                    responseReturn(res, 404, { error: 'Product not found' });
                    return;
                }

                const result = await cloudinary.v2.uploader.upload(mainban.filepath, { folder: 'banners' });
                const banner = await bannerModel.create({
                    productId,
                    banner: result.url,
                    link: product.slug
                });

                responseReturn(res, 200, { banner, message: "Banner Add Success" });
            } catch (error) {
                if (error instanceof Error) {
                    responseReturn(res, 500, { error: error.message });
                } else {
                    responseReturn(res, 500, { error: 'An unknown error occurred.' });
                }
            }
        });
    }

    get_banner = async (req: Request, res: Response) => {
        const { productId } = req.params;
        try {
            const banner = await bannerModel.findOne({ productId: new ObjectId(productId) });
            responseReturn(res, 200, { banner });
        } catch (error) {
            if (error instanceof Error) {
                responseReturn(res, 500, { error: error.message });
            } else {
                responseReturn(res, 500, { error: 'An unknown error occurred.' });
            }
        }
    }

    update_banner = async (req: Request, res: Response) => {
        const { bannerId } = req.params;
        const form = formidable({ multiples: true });

        form.parse(req, async (err: Error, fields: Fields, files: Files) => {
            const mainban = Array.isArray(files.mainban) ? files.mainban[0] : files.mainban;

            if (err) {
                responseReturn(res, 500, { error: err.message });
                return;
            }

            if (!mainban) {
                responseReturn(res, 400, { error: 'Banner image is required' });
                return;
            }

            try {
                const banner = await bannerModel.findById(bannerId);
                if (!banner) {
                    responseReturn(res, 404, { error: 'Banner not found' });
                    return;
                }

                const temp = banner.banner.split('/');
                const imageName = temp[temp.length - 1].split('.')[0];
                await cloudinary.v2.uploader.destroy(imageName);

                const result = await cloudinary.v2.uploader.upload(mainban.filepath, { folder: 'banners' });
                await bannerModel.findByIdAndUpdate(bannerId, { banner: result.url });

                const updatedBanner = await bannerModel.findById(bannerId);
                responseReturn(res, 200, { banner: updatedBanner, message: "Banner Updated Success" });
            } catch (error) {
                if (error instanceof Error) {
                    responseReturn(res, 500, { error: error.message });
                } else {
                    responseReturn(res, 500, { error: 'An unknown error occurred.' });
                }
            }
        });
    }

    get_banners = async (req: Request, res: Response) => {
        try {
            const banners = await bannerModel.aggregate([{ $sample: { size: 5 } }]);
            responseReturn(res, 200, { banners });
        } catch (error) {
            if (error instanceof Error) {
                responseReturn(res, 500, { error: error.message });
            } else {
                responseReturn(res, 500, { error: 'An unknown error occurred.' });
            }
        }
    }
}

export default new DashboardController();
