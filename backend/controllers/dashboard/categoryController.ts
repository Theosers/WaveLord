import { Request, Response } from 'express';
import formidable, { Fields, Files, File } from 'formidable';
import cloudinary from 'cloudinary';
import { responseReturn } from "../../utilities/response";
import categoryModel from '../../models/categoryModel';
import { env } from 'process';

class CategoryController {
    add_category = async (req: Request, res: Response) => {
        const form = formidable();
        form.parse(req, async (err: Error, fields: Fields, files: Files) => {
            if (err) {
                responseReturn(res, 404, { error: 'Something went wrong' });
                return;
            }

            let name: string | undefined;
            if (fields.name) {
                name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
            }

            const image = Array.isArray(files.image) ? files.image[0] : files.image;

            if (!name || !image) {
                responseReturn(res, 400, { error: 'Name and image are required' });
                return;
            }

            name = name.trim();
            const slug = name.split(' ').join('-');

            cloudinary.v2.config({
                cloud_name: process.env.CLOUDINARY_NAME, 
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
                secure: true,
            });

            try {
                const result = await cloudinary.v2.uploader.upload((image as File).filepath, { folder: 'categorys' });

                if (result) {
                    const category = await categoryModel.create({
                        name,
                        slug,
                        image: result.url
                    });
                    responseReturn(res, 201, { category, message: 'Category Added Successfully' });
                } else {
                    responseReturn(res, 404, { error: 'Image Upload Failed' });
                }
            } catch (error) {
                if (error instanceof Error) {
                    responseReturn(res, 500, { error: error.message });
                } else {
                    responseReturn(res, 500, { error: 'Internal Server Error' });
                }
            }
        });
    }

    // end method

    get_category = async (req: Request, res: Response) => {
        const { page, searchValue, parPage } = req.query as { [key: string]: string };

        try {
            let skipPage = 0;
            if (parPage && page) {
                skipPage = parseInt(parPage) * (parseInt(page) - 1);
            }

            if (searchValue && page && parPage) {
                const categorys = await categoryModel.find({
                    $text: { $search: searchValue }
                }).skip(skipPage).limit(parseInt(parPage)).sort({ createdAt: -1 });
                const totalCategory = await categoryModel.find({
                    $text: { $search: searchValue }
                }).countDocuments();
                responseReturn(res, 200, { categorys, totalCategory });
            } else if (searchValue === '' && page && parPage) {
                const categorys = await categoryModel.find({}).skip(skipPage).limit(parseInt(parPage)).sort({ createdAt: -1 });
                const totalCategory = await categoryModel.find({}).countDocuments();
                responseReturn(res, 200, { categorys, totalCategory });
            } else {
                const categorys = await categoryModel.find({}).sort({ createdAt: -1 });
                const totalCategory = await categoryModel.find({}).countDocuments();
                responseReturn(res, 200, { categorys, totalCategory });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred.');
            }
        }
    }

    // end method
}

export default new CategoryController();
