import { Request, Response } from 'express';
import mongoose from '../../utilities/db';

const { ObjectId } = mongoose.Types;

import cardModel, { CardProduct } from '../../models/cardModel';
import wishlistModel from '../../models/wishlistModel';
import { responseReturn } from '../../utilities/response';


class CardController {
    add_to_card = async (req: Request, res: Response) => {
        const { userId, productId, quantity } = req.body;
        try {
            const product = await cardModel.findOne({
                $and: [
                    { productId: { $eq: productId } },
                    { userId: { $eq: userId } },
                ],
            });

            if (product) {
                responseReturn(res, 404, { error: 'Product Already Added To Cart' });
            } else {
                const newProduct = await cardModel.create({
                    userId,
                    productId,
                    quantity,
                });
                responseReturn(res, 201, { message: 'Added To Cart Successfully', product: newProduct });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };

    get_card_products = async (req: Request, res: Response) => {
        const co = 5;
        const { userId } = req.params;
        try {
            const card_products = await cardModel.aggregate([
                {
                    $match: {
                        userId: {
                            $eq: new ObjectId(userId),
                        },
                    },
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'productId',
                        foreignField: '_id',
                        as: 'products',
                    },
                },
            ]);

            let buy_product_item = 0;
            let calculatePrice = 0;
            let card_product_count = 0;
            const outOfStockProduct = card_products.filter((p: any) => p.products[0].stock < p.quantity);
            for (let i = 0; i < outOfStockProduct.length; i++) {
                card_product_count = card_product_count + outOfStockProduct[i].quantity;
            }
            const stockProduct = card_products.filter((p: any) => p.products[0].stock >= p.quantity);
            for (let i = 0; i < stockProduct.length; i++) {
                const { quantity } = stockProduct[i];
                card_product_count = buy_product_item + quantity;

                buy_product_item = buy_product_item + quantity;
                const { price, discount } = stockProduct[i].products[0];
                if (discount !== 0) {
                    calculatePrice = calculatePrice + quantity * (price - Math.floor((price * discount) / 100));
                } else {
                    calculatePrice = calculatePrice + quantity * price;
                }
            } // end for
            let p: any[] = [];
            let unique = [...new Set(stockProduct.map((p: any) => p.products[0].sellerId.toString()))];
            for (let i = 0; i < unique.length; i++) {
                let price = 0;
                for (let j = 0; j < stockProduct.length; j++) {
                    const tempProduct = stockProduct[j].products[0];
                    if (unique[i] === tempProduct.sellerId.toString()) {
                        let pri = 0;
                        if (tempProduct.discount !== 0) {
                            pri = tempProduct.price - Math.floor((tempProduct.price * tempProduct.discount) / 100);
                        } else {
                            pri = tempProduct.price;
                        }
                        pri = pri - Math.floor((pri * co) / 100);
                        price = price + pri * stockProduct[j].quantity;
                        p[i] = {
                            sellerId: unique[i],
                            shopName: tempProduct.shopName,
                            price,
                            products: p[i]
                                ? [
                                      ...p[i].products,
                                      {
                                          _id: stockProduct[j]._id,
                                          quantity: stockProduct[j].quantity,
                                          productInfo: tempProduct,
                                      },
                                  ]
                                : [
                                      {
                                          _id: stockProduct[j]._id,
                                          quantity: stockProduct[j].quantity,
                                          productInfo: tempProduct,
                                      },
                                  ],
                        };
                    }
                }
            }

            responseReturn(res, 200, {
                card_products: p,
                price: calculatePrice,
                card_product_count,
                shipping_fee: 20 * p.length,
                outOfStockProduct,
                buy_product_item,
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };

    delete_card_products = async (req: Request, res: Response) => {
        const { card_id } = req.params;
        try {
            await cardModel.findByIdAndDelete(card_id);
            responseReturn(res, 200, { message: 'Product Removed Successfully' });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };

    quantity_inc = async (req: Request, res: Response) => {
        const { card_id } = req.params;
        try {
            const product = await cardModel.findById(card_id) as CardProduct;
            if (product) {
                const { quantity } = product;
                await cardModel.findByIdAndUpdate(card_id, { quantity: quantity + 1 });
                responseReturn(res, 200, { message: 'Qty Updated' });
            } else {
                responseReturn(res, 404, { error: 'Product not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };

    quantity_dec = async (req: Request, res: Response) => {
        const { card_id } = req.params;
        try {
            const product = await cardModel.findById(card_id) as CardProduct;
            if (product) {
                const { quantity } = product;
                await cardModel.findByIdAndUpdate(card_id, { quantity: quantity - 1 });
                responseReturn(res, 200, { message: 'Qty Updated' });
            } else {
                responseReturn(res, 404, { error: 'Product not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };

    add_wishlist = async (req: Request, res: Response) => {
        const { slug } = req.body;
        try {
            const product = await wishlistModel.findOne({ slug });
            if (product) {
                responseReturn(res, 404, {
                    error: 'Product Is Already In Wishlist',
                });
            } else {
                await wishlistModel.create(req.body);
                responseReturn(res, 201, {
                    message: 'Product Added to Wishlist Successfully',
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };

    get_wishlist = async (req: Request, res: Response) => {
        const { userId } = req.params;
        try {
            const wishlists = await wishlistModel.find({
                userId,
            });
            responseReturn(res, 200, {
                wishlistCount: wishlists.length,
                wishlists,
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };

    remove_wishlist = async (req: Request, res: Response) => {
        const { wishlistId } = req.params;
        try {
            const wishlist = await wishlistModel.findByIdAndDelete(wishlistId);
            responseReturn(res, 200, {
                message: 'Wishlist Product Removed',
                wishlistId,
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };
}

export default new CardController();
