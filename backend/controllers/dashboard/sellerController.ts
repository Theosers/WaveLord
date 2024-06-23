import { Request, Response } from 'express';
import formidable from 'formidable';
import cloudinary from 'cloudinary';
import { ObjectId } from 'mongoose';

import sellerModel from '../../models/sellerModel';
import { responseReturn } from '../../utilities/response';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

class SellerController {
    request_seller_get = async (req: Request, res: Response) => {
        const { page, searchValue, parPage } = req.query as { [key: string]: string };
        const skipPage = parseInt(parPage) * (parseInt(page) - 1);

        try {
            if (searchValue) {
                // Add search logic here
            } else {
                const sellers = await sellerModel.find({ status: 'pending' })
                    .skip(skipPage)
                    .limit(parseInt(parPage))
                    .sort({ createdAt: -1 });
                const totalSeller = await sellerModel.find({ status: 'pending' }).countDocuments();
                responseReturn(res, 200, { sellers, totalSeller });
            }
        } catch (error) {
            if (error instanceof Error) {
                responseReturn(res, 500, { error: error.message });
            } else {
                responseReturn(res, 500, { error: 'An unknown error occurred.' });
            }
        }
    };

    get_seller = async (req: Request, res: Response) => {
        const { sellerId } = req.params;
        try {
            const seller = await sellerModel.findById(sellerId);
            responseReturn(res, 200, { seller });
        } catch (error) {
            if (error instanceof Error) {
                responseReturn(res, 500, { error: error.message });
            } else {
                responseReturn(res, 500, { error: 'An unknown error occurred.' });
            }
        }
    };

    seller_status_update = async (req: Request, res: Response) => {
        const { sellerId, status } = req.body;
        try {
            await sellerModel.findByIdAndUpdate(sellerId, { status });
            const seller = await sellerModel.findById(sellerId);
            responseReturn(res, 200, { seller, message: 'Seller Status Updated Successfully' });
        } catch (error) {
            if (error instanceof Error) {
                responseReturn(res, 500, { error: error.message });
            } else {
                responseReturn(res, 500, { error: 'An unknown error occurred.' });
            }
        }
    };

    get_active_sellers = async (req: Request, res: Response) => {
        const { page, searchValue, parPage } = req.query as { [key: string]: string };
        const pageNumber = parseInt(page);
        const parPageNumber = parseInt(parPage);

        const skipPage = parPageNumber * (pageNumber - 1);

        try {
            if (searchValue) {
                const sellers = await sellerModel.find({
                    $text: { $search: searchValue },
                    status: 'active',
                }).skip(skipPage).limit(parPageNumber).sort({ createdAt: -1 });

                const totalSeller = await sellerModel.find({
                    $text: { $search: searchValue },
                    status: 'active',
                }).countDocuments();
                responseReturn(res, 200, { totalSeller, sellers });
            } else {
                const sellers = await sellerModel.find({ status: 'active' })
                    .skip(skipPage)
                    .limit(parPageNumber)
                    .sort({ createdAt: -1 });

                const totalSeller = await sellerModel.find({ status: 'active' }).countDocuments();
                responseReturn(res, 200, { totalSeller, sellers });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log('active seller get ' + error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };

    get_deactive_sellers = async (req: Request, res: Response) => {
        const { page, searchValue, parPage } = req.query as { [key: string]: string };
        const pageNumber = parseInt(page);
        const parPageNumber = parseInt(parPage);

        const skipPage = parPageNumber * (pageNumber - 1);

        try {
            if (searchValue) {
                const sellers = await sellerModel.find({
                    $text: { $search: searchValue },
                    status: 'deactive',
                }).skip(skipPage).limit(parPageNumber).sort({ createdAt: -1 });

                const totalSeller = await sellerModel.find({
                    $text: { $search: searchValue },
                    status: 'deactive',
                }).countDocuments();
                responseReturn(res, 200, { totalSeller, sellers });
            } else {
                const sellers = await sellerModel.find({ status: 'deactive' })
                    .skip(skipPage)
                    .limit(parPageNumber)
                    .sort({ createdAt: -1 });

                const totalSeller = await sellerModel.find({ status: 'deactive' }).countDocuments();
                responseReturn(res, 200, { totalSeller, sellers });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log('deactive seller get ' + error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };
}

export default new SellerController();
