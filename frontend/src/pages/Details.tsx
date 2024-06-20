import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useParams } from 'react-router-dom';
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

const Details = () => {

    const {slug} = useParams()
    const dispatch = useDispatch()
    const {product,relatedProducts,moreProducts} = useSelector(state => state.home)

    useEffect(() => {
        dispatch(product_details(slug))
    },[slug])
    

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
            <p>{product.description}</p>
           </div> 

            <div>
                {
                product.stock ? <>
                    <div>
                        <div>-</div>
                        <div>2</div>
                        <div>+</div>
                    </div>
                    <div>
                        <button>Add To Card</button>
                    </div>
                    </> : ''
                }
                <div>
                    <div>
                        <FaHeart />
                    </div>
                </div>



                <div>
                    <div>
                        <span>Availability</span>
                        <span>Share On</span> 
                    </div> 
                    <div>
                        <span className={`text-${stock ? 'a' : 'b'}`}>
                            {stock ? `In Stock(${stock})` : 'Out Of Stock'}
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
                        stock ? <button>Buy Now</button> : ''
                    }
                    <Link to='#'>
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
                    state === 'reviews' ? <Reviews/> : <p>
            What is Lorem Ipsum?
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                }
            </div>
        </div>

        <div>
            <div>
                <h2 className='font-bold'>From Easy Shop</h2>
            </div>
            <div>
                {
                    [1,2,3].map((p,i) => {
                        return (
                            <Link>
                                <div>
                                    <img src={`http://localhost:3000/public/images/products/${p}.webp`} alt="" /> 
                                    {
                                        discount !== 0 && <div>{discount}%
                                        </div>
                                    }
                                </div>

                                <h2>Product Name </h2>
                                <div>
                                    <h2>$434</h2>
                                    <div>
                                        <Rating ratings={4.5}  />
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
                        [1,2,3,4,5,6].map((p, i) => {
                            return (

                                <SwiperSlide key={i}>
                                    <Link>
                                        <div>
                                            <div>
                                                <img src={`http://localhost:3000/public/images/products/${p}.webp`} alt="" />
                                            </div>
                                                {
                                                    discount !== 0 && <div>{discount}%
                                                    </div>
                                                }
                                        </div>

                                        <div>
                                            <h2>Product Name </h2>
                                            <div>
                                                <h2>$434</h2>
                                                <div>
                                                    <Rating ratings={4.5}  />
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
