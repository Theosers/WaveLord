import { Request, Response } from 'express';
import adminModel from '../models/adminModel';
import sellerModel from '../models/sellerModel';
import sellerCustomerModel from '../models/chat/sellerCustomerModel';
import { responseReturn } from '../utilities/response';
import bcrypt from 'bcrypt';
import { createToken } from '../utilities/tokenCreate';
import cloudinary from 'cloudinary';
import formidable, { Files, File } from 'formidable';

cloudinary.v2.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: true,
});

class AuthControllers {
    admin_login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const admin = await adminModel.findOne({ email }).select('+password');
            if (admin) {
                const match = await bcrypt.compare(password, admin.password);
                if (match) {
                    const token = await createToken({
                        id: admin.id,
                        role: admin.role,
                    });
                    res.cookie('accessToken', token, {
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    });
                    responseReturn(res, 200, { token, message: 'Login Success' });
                } else {
                    responseReturn(res, 404, { error: 'Password Wrong' });
                }
            } else {
                responseReturn(res, 404, { error: 'Email not Found' });
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            responseReturn(res, 500, { error: message });
        }
    };

    seller_login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const seller = await sellerModel.findOne({ email }).select('+password');
            if (seller) {
                const match = await bcrypt.compare(password, seller.password);
                if (match) {
                    const token = await createToken({
                        id: seller.id,
                        role: seller.role,
                    });
                    res.cookie('accessToken', token, {
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    });
                    responseReturn(res, 200, { token, message: 'Login Success' });
                } else {
                    responseReturn(res, 404, { error: 'Password Wrong' });
                }
            } else {
                responseReturn(res, 404, { error: 'Email not Found' });
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            responseReturn(res, 500, { error: message });
        }
    };

    seller_register = async (req: Request, res: Response) => {
        const { email, name, password } = req.body;
        try {
            const getUser = await sellerModel.findOne({ email });
            if (getUser) {
                responseReturn(res, 404, { error: 'Email Already Exit' });
            } else {
                const seller = await sellerModel.create({
                    name,
                    email,
                    password: await bcrypt.hash(password, 10),
                    method: 'menualy',
                    shopInfo: {},
                });
                await sellerCustomerModel.create({
                    myId: seller.id,
                });

                const token = await createToken({ id: seller.id, role: seller.role });
                res.cookie('accessToken', token, {
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                });

                responseReturn(res, 201, { token, message: 'Register Success' });
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Internal Server Error';
            responseReturn(res, 500, { error: message });
        }
    };

    getUser = async (req: Request, res: Response) => {
        const { id, role } = req;
        try {
            if (role === 'admin') {
                const user = await adminModel.findById(id);
                responseReturn(res, 200, { userInfo: user });
            } else {
                const seller = await sellerModel.findById(id);
                responseReturn(res, 200, { userInfo: seller });
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Internal Server Error';
            responseReturn(res, 500, { error: message });
        }
    };

    profile_image_upload = async (req: Request, res: Response) => {
        const { id } = req;
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files: Files) => {
            if (err) {
                return responseReturn(res, 500, { error: 'Form parse error' });
            }

            const image = files.image;
            if (!image || Array.isArray(image)) {
                return responseReturn(res, 400, { error: 'No image provided' });
            }

            try {
                const result = await cloudinary.v2.uploader.upload((image as File).filepath, { folder: 'profile' });
                if (result) {
                    await sellerModel.findByIdAndUpdate(id, {
                        image: result.url,
                    });
                    const userInfo = await sellerModel.findById(id);
                    responseReturn(res, 201, { message: 'Profile Image Upload Successfully', userInfo });
                } else {
                    responseReturn(res, 404, { error: 'Image Upload Failed' });
                }
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Image upload error';
                responseReturn(res, 500, { error: message });
            }
        });
    };

    profile_info_add = async (req: Request, res: Response) => {
        const { division, district, shopName, sub_district } = req.body;
        const { id } = req;
        try {
            await sellerModel.findByIdAndUpdate(id, {
                shopInfo: {
                    shopName,
                    division,
                    district,
                    sub_district,
                },
            });
            const userInfo = await sellerModel.findById(id);
            responseReturn(res, 201, { message: 'Profile info Add Successfully', userInfo });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Internal Server Error';
            responseReturn(res, 500, { error: message });
        }
    };

    logout = async (req: Request, res: Response) => {
        try {
            res.cookie('accessToken', null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            });
            responseReturn(res, 200, { message: 'Logout Success' });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Internal Server Error';
            responseReturn(res, 500, { error: message });
        }
    };
}

export default new AuthControllers();
