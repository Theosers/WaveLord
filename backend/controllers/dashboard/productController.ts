import { Request, Response } from 'express';
import formidable, { Fields, Files, File } from 'formidable';
import cloudinary from 'cloudinary';
import productModel from '../../models/productModel';
import { responseReturn } from '../../utilities/response';


class ProductController {
    add_product = async (req: Request, res: Response) => {
        const { id } = req;
        const form = formidable({ multiples: true });

        form.parse(req, async (err: Error, fields: Fields, files: Files) => {
            let { name, category, description, stock, price, discount, shopName, brand } = fields as { [key: string]: string | string[] };
            const images = files.images as File | File[];

            // Vérifier et convertir les types
            if (Array.isArray(name)) {
                name = name[0];
            }

            if (!name || typeof name !== 'string') {
                responseReturn(res, 400, { error: 'Name is required and must be a string' });
                return;
            }

            name = name.trim();
            const slug = name.split(' ').join('-');

            // Vérifier et convertir les autres champs
            const shopNameStr = Array.isArray(shopName) ? shopName[0] : shopName;
            const categoryStr = Array.isArray(category) ? category[0] : category;
            const descriptionStr = Array.isArray(description) ? description[0] : description;
            const stockStr = Array.isArray(stock) ? stock[0] : stock;
            const priceStr = Array.isArray(price) ? price[0] : price;
            const discountStr = Array.isArray(discount) ? discount[0] : discount;
            const brandStr = Array.isArray(brand) ? brand[0] : brand;
            console.log('cloudinary');
            cloudinary.v2.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
                secure: true,
            });
            console.log('cloudinary is set');

            try {
                let allImageUrl: string[] = [];
                const imageArray = Array.isArray(images) ? images : [images];
                for (let i = 0; i < imageArray.length; i++) {
                    const result = await cloudinary.v2.uploader.upload(imageArray[i].filepath, { folder: 'products' });
                    allImageUrl = [...allImageUrl, result.url];
                }

                await productModel.create({
                    sellerId: id,
                    name,
                    slug,
                    shopName: shopNameStr ? shopNameStr.trim() : '',
                    category: categoryStr ? categoryStr.trim() : '',
                    description: descriptionStr ? descriptionStr.trim() : '',
                    stock: stockStr ? parseInt(stockStr) : 0,
                    price: priceStr ? parseInt(priceStr) : 0,
                    discount: discountStr ? parseInt(discountStr) : 0,
                    images: allImageUrl,
                    brand: brandStr ? brandStr.trim() : '',
                });
                responseReturn(res, 201, { message: 'Product Added Successfully' });
            } catch (error) {
                if (error instanceof Error) {
                    responseReturn(res, 500, { error: error.message });
                } else {
                    responseReturn(res, 500, { error: 'An unknown error occurred.' });
                }
            }
        });
    };

    products_get = async (req: Request, res: Response) => {
        const { page, searchValue, parPage } = req.query as { [key: string]: string };
        const { id } = req;
        const skipPage = parseInt(parPage) * (parseInt(page) - 1);

        try {
            if (searchValue) {
                const products = await productModel.find({
                    $text: { $search: searchValue },
                    sellerId: id,
                })
                    .skip(skipPage)
                    .limit(parseInt(parPage))
                    .sort({ createdAt: -1 });
                const totalProduct = await productModel.find({
                    $text: { $search: searchValue },
                    sellerId: id,
                }).countDocuments();
                responseReturn(res, 200, { products, totalProduct });
            } else {
                const products = await productModel.find({ sellerId: id })
                    .skip(skipPage)
                    .limit(parseInt(parPage))
                    .sort({ createdAt: -1 });
                const totalProduct = await productModel.find({ sellerId: id }).countDocuments();
                responseReturn(res, 200, { products, totalProduct });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };

    product_get = async (req: Request, res: Response) => {
        const { productId } = req.params;
        try {
            const product = await productModel.findById(productId);
            responseReturn(res, 200, { product });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };

    product_update = async (req: Request, res: Response) => {
        let { name, description, stock, price, discount, brand, productId } = req.body;
        name = name.trim();
        const slug = name.split(' ').join('-');

        try {
            await productModel.findByIdAndUpdate(productId, {
                name, description, stock, price, discount, brand, productId, slug,
            });
            const product = await productModel.findById(productId);
            responseReturn(res, 200, { product, message: 'Product Updated Successfully' });
        } catch (error) {
            if (error instanceof Error) {
                responseReturn(res, 500, { error: error.message });
            } else {
                responseReturn(res, 500, { error: 'An unknown error occurred.' });
            }
        }
    };

    product_image_update = async (req: Request, res: Response) => {
        const form = formidable({ multiples: true });

        form.parse(req, async (err: Error, fields: Fields, files: Files) => {
            const { oldImage, productId } = fields;
            const newImage = files.newImage as File | File[];

            if (err) {
                responseReturn(res, 400, { error: err.message });
            } else {
                try {
                    cloudinary.v2.config({
                        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                        api_key: process.env.CLOUDINARY_API_KEY,
                        api_secret: process.env.CLOUDINARY_API_SECRET,
                        secure: true,
                    });

                    const newImageFile = Array.isArray(newImage) ? newImage[0] : newImage;
                    const result = await cloudinary.v2.uploader.upload(newImageFile.filepath, { folder: 'products' });

                    if (result) {
                        const product = await productModel.findById(productId);
                        if (!product) {
                            responseReturn(res, 404, { error: 'Product not found' });
                            return;
                        }

                        const images = product.images;
                        const oldImageStr = Array.isArray(oldImage) ? oldImage[0] : oldImage;

                        if (typeof oldImageStr !== 'string') {
                            responseReturn(res, 400, { error: 'Old image is required and must be a string' });
                            return;
                        }

                        const index = images.findIndex(img => img === oldImageStr);
                        if (index !== -1) {
                            images[index] = result.url;
                            await productModel.findByIdAndUpdate(productId, { images });
                            const updatedProduct = await productModel.findById(productId);
                            responseReturn(res, 200, { product: updatedProduct, message: 'Product Image Updated Successfully' });
                        } else {
                            responseReturn(res, 404, { error: 'Old image not found in product' });
                        }
                    } else {
                        responseReturn(res, 404, { error: 'Image Upload Failed' });
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        responseReturn(res, 404, { error: error.message });
                    } else {
                        responseReturn(res, 404, { error: 'An unknown error occurred.' });
                    }
                }
            }
        });
    };
}

export default new ProductController();
