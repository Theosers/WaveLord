import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import '../../scss/seller/AddProduct.scss';
import { Link } from 'react-router-dom';
import { IoMdCloseCircle, IoMdImages } from "react-icons/io";
import { get_category } from '../../store/Reducers/categoryReducer';
import { add_product, messageClear } from '../../store/Reducers/productReducer';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { RootState, AppDispatch } from '../../store';

const AddProduct: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories } = useSelector((state: RootState) => state.category);
    const { loader, successMessage, errorMessage } = useSelector((state: RootState) => state.product);

    useEffect(() => {
        dispatch(get_category({
            searchValue: '',
            parPage: 10, // Exemple de valeur par défaut
            page: 1 // Exemple de valeur par défaut
        }));
    }, [dispatch]);

    const [state, setState] = useState({
        name: '',
        price: '',
        brand: '',
        stock: '',
        discount: '',
        description: ''
    });

    const inputHandle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const [cateShow, setCateShow] = useState(false);
    const [category, setCategory] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [allCategories, setAllCategories] = useState(categories);

    const categorySearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        if(value) {
            const srcValue = allCategories.filter(c => c.name.toLowerCase().includes(value.toLowerCase()));
            setAllCategories(srcValue);
        } else {
            setAllCategories(categories);
        }
    };

    const [images, setImages] = useState<File[]>([]);
    const [imageShow, setImageShow] = useState<{url: string}[]>([]);

    const imageHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const newImages = Array.from(files);
            setImages([...images, ...newImages]);
            const imageUrl = newImages.map(file => ({ url: URL.createObjectURL(file) }));
            setImageShow([...imageShow, ...imageUrl]);
        }
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            setState({
                name: "",
                description: '',
                discount: '',
                price: "",
                brand: "",
                stock: ""
            });
            setImageShow([]);
            setImages([]);
            setCategory('');
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch]);

    const changeImage = (img: File, index: number) => {
        if (img) {
            const tempUrl = [...imageShow];
            const tempImages = [...images];

            tempImages[index] = img;
            tempUrl[index] = { url: URL.createObjectURL(img) };
            setImageShow(tempUrl);
            setImages(tempImages);
        }
    };

    const removeImage = (index: number) => {
        const filterImage = images.filter((_, i) => i !== index);
        const filterImageUrl = imageShow.filter((_, i) => i !== index);
        setImages(filterImage);
        setImageShow(filterImageUrl);
    };

    const add = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', state.name);
        formData.append('description', state.description);
        formData.append('price', state.price);
        formData.append('stock', state.stock);
        formData.append('discount', state.discount);
        formData.append('brand', state.brand);
        formData.append('shopName', 'EasyShop');
        formData.append('category', category);

        images.forEach((image) => {
            formData.append('images', image);
        });

        dispatch(add_product(formData));
    };

    return (
        <div className='add-product-container'>
            <div className='add-product-header'>
                <h2>Add Product</h2>
                <Link to='/seller/dashboard/products'>All Products</Link>
            </div>
            <div className='add-product-form'>
                <form onSubmit={add}>
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
                                    <div className={`${cateShow ? 'select-category-show' : 'select-category-hide' } `}>
                                        <div className='search-bar'>
                                            <input value={searchValue} onChange={categorySearch} type="text" placeholder='search' />
                                        </div>
                                        <div className='pt-14'></div>
                                        <div className='roll-menu'>
                                            {allCategories.map((c, i) => (
                                                <span key={i} className={`cursor ${category === c.name && 'bgcolor'}`}
                                                    onClick={() => {
                                                        setCateShow(false);
                                                        setCategory(c.name);
                                                        setSearchValue('');
                                                        setAllCategories(categories);
                                                    }}>{c.name}</span>
                                            ))}
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
                    <textarea onChange={inputHandle} value={state.description} id='description' name='description' placeholder='Description'>
                    </textarea>

                    <div className='images'>
                        {imageShow.map((img, i) => (
                            <div className='imageShow' key={i}>
                                <label htmlFor={`image-${i}`}>
                                    <img src={img.url} alt="" />
                                </label>
                                <input onChange={(e) => changeImage(e.target.files![0], i)} type="file" id={`image-${i}`} style={{ display: 'none' }} />
                                <span onClick={() => removeImage(i)} className='close'><IoMdCloseCircle/></span>
                            </div>
                        ))}
                        <label htmlFor="image">
                            <span><IoMdImages /></span>
                            <span>Select Image</span>
                        </label>
                        <input style={{ display: 'none' }} onChange={imageHandle} multiple type="file" id='image' />
                    </div>

                    <button type='submit' disabled={loader}>
                        {loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Add Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
