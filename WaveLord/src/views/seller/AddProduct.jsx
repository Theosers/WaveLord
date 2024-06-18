import React, { useEffect, useState } from 'react';
import '../../scss/seller/AddProduct.scss';
import { Link } from 'react-router-dom';
import { IoMdCloseCircle, IoMdImages } from "react-icons/io";
import { add_product } from '../../store/Reducers/productReducer';

const AddProduct = () => {

    const dispatch = useDispatch()
    const { categorys } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(get_category({
            searchValue: '',
            parPage: '',
            page: ""
        }))
    }, [])

    const [state, setState] = useState({
        name: '',
        price: '',
        brand: '',
        stock: '',
        discount: '',
        description: ''
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
        
    }

    const [cateShow, setCateShow] = useState(false);
    const [category, setCategory] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [allCategories, setAllCategories] = useState([]);

    const categorySearch = (e) => { 
        const value = e.target.value;
        setSearchValue(value);
        if(value) {
            let srcValue = allCategories.filter(c => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
            setAllCategories(srcValue);
        } else {
            setAllCategories(categories);
        }
    }

    const [images, setImages] = useState([])
    const [imageShow, setImageShow] = useState([])
    const imageHandle = (e) => {
        const files = e.target.files
        const length = files.length
        
        if (length > 0) {
            setImages([...images, ...files])
            let imageUrl = []
            for (let i = 0; i < length; i++) {
                imageUrl.push({url: URL.createObjectURL(files[i])})
            }
            setImageShow([...imageShow, ...imageUrl])

        }
    }
    
    const changeImage = (img, index) => {
        if (img) {
            let tempUrl = imageShow
            let tempImages = images

            tempImages[index] = img
            tempUrl[index] = {url : URL.createObjectURL(img)}
            setImageShow([...tempUrl])
            setImages([...tempImages])

        }
    }

    const removeImage = (i) => {

        const filterImage = images.filter((img,index) => index !== i) 
        const filterImageUrl = imageShow.filter((img,index) => index !== i)

        setImages(filterImage)
        setImageShow(filterImageUrl)
    }

    const add = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name',state.name)
        formData.append('description',state.description)
        formData.append('price',state.price)
        formData.append('stock',state.stock)
        formData.append('discount',state.discount)
        formData.append('brand',state.brand)
        formData.append('shopName','EasyShop')
        formData.append('category',category)

        for (let i = 0; i < images.length; i++) {
            formData.append('images',images[i]) 
        }
        dispatch(add_product(formData))
    }

    useEffect(() => {
        setAllCategory(categorys)
    },[categorys])
    
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
                                    <input readOnly onClick={()=> setCateShow(!cateShow)}
                                        onChange={inputHandle} value={category} type='text' id='category' name='category'
                                        placeholder='-- select category --'/>
                                    <div className={`${cateShow ? 'select-category-show' : 'select-category-hide' } `}>
                                        <div className='search-bar'>
                                            <input value={searchValue} onChange={categorySearch} type="text" placeholder='search' />
                                        </div>
                                
                                        <div className='pt-14'></div>
                                        <div className='roll-menu'>
                                        {
                                            allCategories.map((c, i) => <span className={`cursor ${category === c.name && 'bgcolor'}` }
                                            onClick={() => {
                                                setCateShow(false);
                                                setCategory(c.name);
                                                setSearchValue('');
                                                setAllCategories(categories);
                                            }}>{c.name} </span>)
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
                            <input onChange={inputHandle} value={state.brand}type='text' id='brand' name='brand' placeholder='Brand Name' />

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
                            imageShow.map((img,i) => <div className='imageShow' key={i}>
                                <label htmlFor={i}>
                                    <img src={img.url} alt="" />
                                </label>
                                <input onChange={(e)=> changeImage(e.target.files[0], i)} type="file" id={i} style={{display: 'none'}} />
                                <span onClick={()=> removeImage(i)} className='close'><IoMdCloseCircle/></span>
                            </div>)
                        }

                        <label  htmlFor="image">
                            <span><IoMdImages /></span>
                            <span>Select Image</span>
                        </label>
                        <input style={{display: 'none'}} onChange={imageHandle} multiple type="file" id='image'  />
                        
                    </div>

                    <button type='submit'>Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
