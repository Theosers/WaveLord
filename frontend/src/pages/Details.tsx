import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import Carousel from 'react-multi-carousel'; 
import Rating from '../components/Rating';
import 'react-multi-carousel/lib/styles.css'
import { FaHeart } from "react-icons/fa6";
import { FaFacebookF} from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import {Pagination } from 'swiper/modules';
import 'swiper/css'; 
import 'swiper/css/pagination';
import {Swiper, SwiperSlide } from 'swiper/react';

import Reviews from '../components/Reviews';

import { useDispatch, useSelector } from 'react-redux';
import { product_details } from '../store/reducers/homeReducer';
import toast from 'react-hot-toast';
import { add_to_card,messageClear,add_to_wishlist } from '../store/reducers/cardReducer';

const Details = () => {

    const navigate = useNavigate()
    const {slug} = useParams()
    const dispatch = useDispatch()
    const {product,relatedProducts,moreProducts} = useSelector(state => state.home)
    const {userInfo } = useSelector(state => state.auth)
    const {errorMessage,successMessage } = useSelector(state => state.card)

    useEffect(() => {
        dispatch(product_details(slug))
    },[slug])


    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
        } 
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())  
        } 

    },[successMessage,errorMessage])
    

    const images = [1,2,3,4,5,6]
    const [image, setImage] = useState('')
    const discount = 10
    const stock = 3
    const [state, setState] = useState('reviews')

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mdtablet: {
            breakpoint: { max: 991, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3
        },
        smmobile: {
            breakpoint: { max: 640, min: 0 },
            items: 2
        },
        xsmobile: {
            breakpoint: { max: 440, min: 0 },
            items: 1
        },
    }


    const [quantity, setQuantity] = useState(1)

    const inc = () => {
        if (quantity >= product.stock) {
            toast.error('Out of Stock')
        } else {
            setQuantity(quantity + 1)
        }
    }

    const dec = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const add_card = () => {
        if (userInfo) {
           dispatch(add_to_card({
            userId: userInfo.id,
            quantity,
            productId : product._id
           }))
        } else {
            navigate('/login')
        }
    }

    const add_wishlist = () => {
        if (userInfo) {
            dispatch(add_to_wishlist({
                userId: userInfo.id,
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                discount: product.discount,
                rating: product.rating,
                slug: product.slug
            }))
        } else {
            navigate('/login')
        }

    }

    const buynow = () => {
        let price = 0;
        if (product.discount !== 0) {
            price = product.price - Math.floor((product.price * product.discount) / 100)
        } else {
            price = product.price
        }

        const obj = [
            {
                sellerId: product.sellerId,
                shopName: product.shopName,
                price :  quantity * (price - Math.floor((price * 5) / 100)),
                products : [
                    {
                        quantity,
                        productInfo: product
                    }
                ]
            }
        ]

        navigate('/shipping',{
            state: {
                products : obj,
                price: price * quantity,
                shipping_fee : 50,
                items: 1
            }
        }) 
   }


    return (
        <div>
            <Header/>
            <section>
                <div>
                    <h2>Product Details </h2>
                    <div>
                        <Link to='/'>Home</Link>
                        <span>
                        <IoIosArrowForward />
                        </span>
                        <span>Product Details </span>
                    </div> 
                </div> 
            </section>

            <section>
        <div>
            <div>
                <div>
                    <Link to='/'>Home</Link>
                    <span className='pt-1'><IoIosArrowForward /></span>
                    <Link to='/'>{ product.category }</Link>
                    <span className='pt-1'><IoIosArrowForward /></span>
                    <span>{ product.name } </span>
                </div>

            </div>
        </div>
    </section>

    <section>
    <div>
        <div>
            <img src={image ? image : product.images?.[0] } alt="" />
        </div>
        <div>
            {
                product.images && <Carousel
                autoPlay={true}
                infinite={true} 
                responsive={responsive}
                transitionDuration={500}>
                {
                    product.images.map((img, i) => {
                    return (
                        <div>
                            <img src={img} alt="" /> 
                        </div>
                    )
                    })
                }
                </Carousel>
            }
        </div>    

        <div>
            <div>
                <h3>{product.name} </h3>
            </div>
            <div>
                <div>
                    <Rating ratings={4.5} />
                </div>
                <span>(24 reviews)</span> 
            </div>
            <div>
                {
                product.discount !== 0 ? <>
                    Price : <h2>${product.price}</h2>
                    <h2>${product.price - Math.floor((product.price * product.discount) / 100)} (-{product.discount}%) </h2>

                </> : <h2> Price : ${product.price} </h2>
                }
            </div>       


            <div className='text-slate-600'>
            <p>{product.description</p>
            <p>Shop Name : {product.shopName}</p>
           </div> 

            <div>
                {
                product.stock ? <>
                    <div>
                        <div onClick={dec}>-</div>
                        <div>{quantity}</div>
                        <div onClick={inc}>+</div>
                    </div>
                    <div>
                        <button onClick={add_card}>Add To Card</button>
                    </div>
                    </> : ''
                }
                <div>
                    <div onClick={add_wishlist}>
                        <FaHeart />
                    </div>
                </div>



                <div>
                    <div>
                        <span>Availability</span>
                        <span>Share On</span> 
                    </div> 
                    <div>
                        <span className={`text-${product.stock ? 'a' : 'b'}`}>
                            {product.stock ? `In Stock(${product.stock})` : 'Out Of Stock'}
                        </span>

                        <ul>
                            <li>
                                <a href="#"> <FaFacebookF /> </a>
                            </li>
                            <li>
                                <a href="#"> <FaTwitter /> </a>
                            </li>
                            <li>
                                <a href="#"> <FaLinkedin /> </a>
                            </li>
                            <li>
                                <a href="#"> <FaGithub /> </a>
                            </li>
                        </ul> 
                    </div>
                </div>

                <div>
                    {
                        product.stock ? <button onClick={buynow}>Buy Now</button> : ''
                    }
                    <Link to={`/dashboard/chat/${product.sellerId}`}>
                        Chat Seller
                    </Link>
                </div>
            </div>  
        </div> 

    </div> 
    </section>



    <section>
        <div>
            <div>
                <button onClick={() => setState('reviews')} className={`a ${state === 'reviews' ? 'a' : 'b'}`}>Reviews </button>

                <button onClick={() => setState('description')} className={`a ${state === 'description' ? 'b' : 'c' }`}>Description </button>
            </div>
            <div>
                {
                    state === 'reviews' ? <Reviews product={product} /> : <p>
                        {product.description}
                    </p>
                }
            </div>
        </div>

        <div>
            <div>
                <h2 className='font-bold'>From {product.shopName}</h2>
            </div>
            <div>
                {
                   moreProducts.map((p,i) => {
                        return (
                            <Link>
                                <div>
                                    <img src={ p.images[0]} alt="" /> 
                                    {
                                        p.discount !== 0 && <div>{p.discount}%
                                        </div>
                                    }
                                </div>

                                <h2>{p.name}</h2>
                                <div>
                                    <h2>${p.price}</h2>
                                    <div>
                                        <Rating ratings={p.rating}  />
                                    </div>
                                </div>

                            </Link>
                        )
                    })
                }

            </div>
        </div>
        </section>


        <section>
            <div>
                <h2>Related Products </h2>
                <div>
                    <Swiper
                    slidesPerView='auto'
                    breakpoints={{
                                1280 : {
                                    slidesPerView: 3
                                },
                                565 : {
                                    slidesPerView: 2
                                }
                                }}
                    spaceBetween={25}
                    loop={true}
                    pagination={{
                        clickable: true,
                        el: '.custom_bullet'
                        }}
                    modules={[Pagination]}
                    className='mySwiper'> 

                    {
                        relatedProducts.map((p, i) => {
                            return (

                                <SwiperSlide key={i}>
                                    <Link>
                                        <div>
                                            <div>
                                                <img src={p.images[0] } alt="" />
                                            </div>
                                                {
                                                    p.discount !== 0 && <div>{p.discount}%
                                                    </div>
                                                }
                                        </div>

                                        <div>
                                            <h2>{p.name}</h2>
                                            <div>
                                                <h2>${p.price}</h2>
                                                <div>
                                                    <Rating ratings={p.rating}  />
                                                </div>
                                            </div>
                                        </div>

                                    </Link>
                                </SwiperSlide>
                            )
                        })
                    }
                    </Swiper>
                </div>


                

            </div>
            </section>



            <Footer/> 
        </div>
    );
};

export default Details;
