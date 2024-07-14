import React, { useEffect, useState } from 'react';
import '../../scss/seller/AddProduct.scss';
import { Link, useParams } from 'react-router-dom';
import { IoMdCloseCircle, IoMdImages } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { get_category } from '../../store/Reducers/categoryReducer';
import { get_product, update_product, messageClear, product_image_update } from '../../store/Reducers/productReducer';
import toast from 'react-hot-toast';
import { RootState, AppDispatch } from '../../store';

interface Category {
    name: string;
}

interface Product {
    name: string;
    price: number;
    brand: string;
    stock: number;
    discount: number;
    description: string;
    category: string;
    images: string[];
}

const EditProduct: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { categories } = useSelector((state: RootState) => state.category);
    const { product, loader, successMessage, errorMessage } = useSelector((state: RootState) => state.product);

    useEffect(() => {
        dispatch(get_category({ searchValue: '', parPage: 10, page: 1 }));
    }, [dispatch]);

    useEffect(() => {
        if (productId) {
            dispatch(get_product(productId));
        }
    }, [dispatch, productId]);

    const [state, setState] = useState<Product>({
        name: '',
        price: 0,
        brand: '',
        stock: 0,
        discount: 0,
        description: '',
        category: '',
        images: []
    });

    useEffect(() => {
        if (product) {
            setState({
                name: product.name,
                description: product.description,
                discount: product.discount,
                price: product.price,
                brand: product.brand,
                stock: product.stock,
                category: product.category,
                images: product.images
            });
            setCategory(product.category);
            setImageShow(product.images);
        }
    }, [product]);

    const inputHandle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const [cateShow, setCateShow] = useState(false);
    const [category, setCategory] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [allCategories, setAllCategories] = useState<Category[]>([]);

    const categorySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        if (value) {
            let srcValue = categories.filter((c: Category) => c.name.toLowerCase().includes(value.toLowerCase()));
            setAllCategories(srcValue);
        } else {
            setAllCategories(categories);
        }
    };

    const [images, setImages] = useState<File[]>([]);
    const [imageShow, setImageShow] = useState<{ url: string }[]>([]);

    const imageHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files!);
        setImages([...images, ...files]);
        let imageUrl = files.map(file => ({ url: URL.createObjectURL(file) }));
        setImageShow([...imageShow, ...imageUrl]);
    };

    const changeImage = (img: string, index: number, files: FileList) => {
        if (files.length > 0) {
            dispatch(product_image_update({
                oldImage: img,
                newImage: files[0],
                productId: productId!
            }));
        }
    };

    const removeImage = (i: number) => {
        const filterImage = images.filter((_, index) => index !== i);
        const filterImageUrl = imageShow.filter((_, index) => index !== i);
        setImages(filterImage);
        setImageShow(filterImageUrl);
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch]);

    const update = (e: React.FormEvent) => {
        e.preventDefault();
        const obj = {
            name: state.name,
            description: state.description,
            discount: state.discount,
            price: state.price,
            brand: state.brand,
            stock: state.stock,
            productId: productId!
        };
        dispatch(update_product(obj));
    };

    return (
        <div className='add-product-container'>
            <div className='add-product-header'>
                <h2>Edit Product</h2>
                <Link to='/seller/dashboard/products'>All Products</Link>
            </div>

            <div className='add-product-form'>
                <form onSubmit={update}>
                    <div className='form-details-container'>
                        <div className='form-left-container'>
                            <label htmlFor='name'>Product Name</label>
                            <input onChange={inputHandle} value={state.name}
                             type='text' id='name' name='name' placeholder='Product Name' />

                            <label htmlFor='category'>Category</label>
                            <div>
                                <div className='category-container'>
                                    <input readOnly onClick={() => setCateShow(!cateShow)}
                                        value={category} type='text' id='category' name='category'
                                        placeholder='-- select category --'/>
                                    <div className={`${cateShow ? 'select-category-show' : 'select-category-hide'}`}>
                                        <div className='search-bar'>
                                            <input value={searchValue} onChange={categorySearch} type="text" placeholder='search' />
                                        </div>

                                        <div className='pt-14'></div>
                                        <div className='roll-menu'>
                                            {
                                                allCategories.length > 0 && allCategories.map((c, i) => <span key={i} className={`cursor ${category === c.name && 'bgcolor'}`}
                                                onClick={() => {
                                                    setCateShow(false);
                                                    setCategory(c.name);
                                                    setSearchValue('');
                                                    setAllCategories(categories);
                                                }}>{c.name}</span>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <label htmlFor='price'>Price</label>
                            <input onChange={inputHandle} value={state.price} type='number' id='price' name='price' placeholder='Price'/>
                        </div>
                        <div className='form-right-container'>
                            <label htmlFor='brand'>Brand Name</label>
                            <input onChange={inputHandle} value={state.brand} type='text' id='brand' name='brand' placeholder='Brand Name' />

                            <label htmlFor='stock'>Product Stock</label>
                            <input onChange={inputHandle} value={state.stock} type='text' id='stock' name='stock' placeholder='Product Stock'/>

                            <label htmlFor='discount'>Discount</label>
                            <input onChange={inputHandle} value={state.discount} type='number' id='discount' name='discount' placeholder='Product Discount'/>
                        </div>
                    </div>

                    <label htmlFor='description'>Description</label>
                        <textarea onChange={inputHandle} value={state.description} id='description' name='description'>
                            This product is a great product and you should buy it.
                        </textarea>

                    <div className='images'>
                        {
                            (imageShow && imageShow.length > 0) && imageShow.map((img, i) => <div className='imageShow' key={i}>
                                <label htmlFor={`${i}`}>
                                    <img src={img.url} alt="" />
                                </label>
                                <input onChange={(e) => changeImage(img.url, i, e.target.files!)} type="file" id={`${i}`} style={{ display: 'none' }} />
                                <span onClick={() => removeImage(i)} className='close'><IoMdCloseCircle /></span>
                            </div>)
                        }

                        <label htmlFor="image">
                            <span><IoMdImages /></span>
                            <span>Select Image</span>
                        </label>
                        <input style={{ display: 'none' }} onChange={imageHandle} multiple type="file" id='image' />
                    </div>

                    <button type='submit'>Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
