import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import moment from 'moment';
import categoryModel from '../../models/categoryModel';
import productModel from '../../models/productModel';
import reviewModel from '../../models/reviewModel';
import { responseReturn } from '../../utilities/response';
import queryProducts from '../../utilities/queryProducts';
import mongoose from '../../utilities/db';
const { ObjectId } = mongoose.Types;

class HomeControllers {
    formateProduct = (products: any[]) => {
        const productArray: any[] = [];
        let i = 0;
        while (i < products.length) {
            let temp: any[] = [];
            let j = i;
            while (j < i + 3) {
                if (products[j]) {
                    temp.push(products[j]);
                }
                j++;
            }
            productArray.push([...temp]);
            i = j;
        }
        return productArray;
    }

    get_categorys = async (req: Request, res: Response) => {
        try {
            const categorys = await categoryModel.find({});
            responseReturn(res, 200, {
                categorys,
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };

    get_products = async (req: Request, res: Response) => {
        try {
            const products = await productModel.find({}).limit(12).sort({
                createdAt: -1,
            });
            const allProduct1 = await productModel.find({}).limit(9).sort({
                createdAt: -1,
            });
            const latest_product = this.formateProduct(allProduct1);

            const allProduct2 = await productModel.find({}).limit(9).sort({
                rating: -1,
            });
            const topRated_product = this.formateProduct(allProduct2);

            const allProduct3 = await productModel.find({}).limit(9).sort({
                discount: -1,
            });
            const discount_product = this.formateProduct(allProduct3);

            responseReturn(res, 200, {
                products,
                latest_product,
                topRated_product,
                discount_product,
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };

    price_range_product = async (req: Request, res: Response) => {
        try {
            const priceRange = {
                low: 0,
                high: 0,
            };
            const products = await productModel.find({}).limit(9).sort({
                createdAt: -1,
            });
            const latest_product = this.formateProduct(products);
            const getForPrice = await productModel.find({}).sort({
                price: 1,
            });
            if (getForPrice.length > 0) {
                priceRange.high = getForPrice[getForPrice.length - 1].price;
                priceRange.low = getForPrice[0].price;
            }
            responseReturn(res, 200, {
                latest_product,
                priceRange,
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };

    query_products = async (req: Request, res: Response) => {
        const parPage = 12;
        req.query.parPage = parPage.toString();

        try {
            const products = await productModel.find({}).sort({
                createdAt: -1,
            });
            const totalProduct = new queryProducts(products, req.query)
                .categoryQuery()
                .ratingQuery()
                .searchQuery()
                .priceQuery()
                .sortByPrice()
                .countProducts();

            const result = new queryProducts(products, req.query)
                .categoryQuery()
                .ratingQuery()
                .priceQuery()
                .searchQuery()
                .sortByPrice()
                .skip()
                .limit()
                .getProducts();

            responseReturn(res, 200, {
                products: result,
                totalProduct,
                parPage,
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };

    product_details = async (req: Request, res: Response) => {
        const { slug } = req.params;
        try {
            const product = await productModel.findOne({ slug });

            const relatedProducts = await productModel.find({
                $and: [
                    {
                        _id: {
                            $ne: product?.id,
                        },
                    },
                    {
                        category: {
                            $eq: product?.category,
                        },
                    },
                ],
            }).limit(12);
            const moreProducts = await productModel.find({
                $and: [
                    {
                        _id: {
                            $ne: product?.id,
                        },
                    },
                    {
                        sellerId: {
                            $eq: product?.sellerId,
                        },
                    },
                ],
            }).limit(3);
            responseReturn(res, 200, {
                product,
                relatedProducts,
                moreProducts,
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };

    submit_review = async (req: Request, res: Response) => {
        const { productId, rating, review, name } = req.body;

        try {
            await reviewModel.create({
                productId,
                name,
                rating,
                review,
                date: moment(Date.now()).format('LL'),
            });

            let rat = 0;
            const reviews = await reviewModel.find({
                productId,
            });
            for (let i = 0; i < reviews.length; i++) {
                rat = rat + reviews[i].rating;
            }
            let productRating = 0;
            if (reviews.length !== 0) {
                productRating = parseFloat((rat / reviews.length).toFixed(1));
            }

            await productModel.findByIdAndUpdate(productId, {
                rating: productRating,
            });
            responseReturn(res, 201, {
                message: 'Review Added Successfully',
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    };

    get_reviews = async (req: Request, res: Response) => {
        const { productId } = req.params;
        let { pageNo } = req.query as { [key: string]: string };
        const limit = 5;
        const skipPage = limit * (parseInt(pageNo) - 1);

        try {
            let getRating = await reviewModel.aggregate([
                {
                    $match: {
                        productId: {
                            $eq: new ObjectId(productId),
                        },
                        rating: {
                            $not: {
                                $size: 0,
                            },
                        },
                    },
                },
                {
                    $unwind: '$rating',
                },
                {
                    $group: {
                        _id: '$rating',
                        count: {
                            $sum: 1,
                        },
                    },
                },
            ]);
            let rating_review = [
                {
                    rating: 5,
                    sum: 0,
                },
                {
                    rating: 4,
                    sum: 0,
                },
                {
                    rating: 3,
                    sum: 0,
                },
                {
                    rating: 2,
                    sum: 0,
                },
                {
                    rating: 1,
                    sum: 0,
                },
            ];
            for (let i = 0; i < rating_review.length; i++) {
                for (let j = 0; j < getRating.length; j++) {
                    if (rating_review[i].rating === getRating[j]._id) {
                        rating_review[i].sum = getRating[j].count;
                        break;
                    }
                }
            }

            const getAll = await reviewModel.find({
                productId,
            });
            const reviews = await reviewModel.find({
                productId,
            }).skip(skipPage).limit(limit).sort({ createdAt: -1 });

            responseReturn(res, 200, {
                reviews,
                totalReview: getAll.length,
                rating_review,
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

export default new HomeControllers();
