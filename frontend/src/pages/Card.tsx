import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch,useSelector } from 'react-redux';
import { get_card_products,delete_card_product,messageClear } from '../store/reducers/cardReducer';
import toast from 'react-hot-toast';

const Card = () => {

    const dispatch = useDispatch()
    //const {userInfo} = useSelector(state => state.auth) 
    const {card_products,successMessage,price,buy_product_item,shipping_fee,outofstock_products} = useSelector(state => state.card)

    useEffect(() => {
        dispatch(get_card_products(userInfo.id))
    },[])

    const redirect = () => {
        navigate('/shipping',{
            state: {
                products : [],
                price: 500,
                shipping_fee : 40,
                items: 2
            }
        })
    }
    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
            dispatch(get_card_products(userInfo.id))
        } 

    },[successMessage])
    
    return (
        <div>
           <Header/>
           <section>
            <h2>Card Page </h2>
                <div>
                    <Link to='/'>Home</Link>
                    <span>
                        <IoIosArrowForward />
                    </span>
                    <span>Card </span>
                </div>
           </section>
            <section>
                <div>
                {
                    card_products.length > 0 || outofstock_products > 0 ? <div>
                        <div>
                            <div>
                                <h2>Stock Products {card_products.length}</h2>
                            </div>
                        </div>
                        {
                        <div>
                            <div>
                                <h2>{p.shopName}<</h2>
                            </div>

                            {
                                p.products.map((pt,i) => <div>
                                    <div>
                                        <div>
                                            <img src={pt.productInfo.images[0]} alt="" />
                                            <div>
                                                <h2>{pt.productInfo.name}</h2>
                                                <span>{pt.productInfo.brand}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div>
                                            <h2>${pt.productInfo.price - Math.floor((pt.productInfo.price * pt.productInfo.discount) / 100)}</h2>
                                            <p>${pt.productInfo.price}</p>
                                            <p>-{pt.productInfo.discount}%</p>
                                        </div>
                                        <div>
                                            <div>
                                                <div>-</div> 
                                                <div>{pt.quantity }</div> 
                                                <div>+</div> 
                                            </div>
                                            <button onClick={() => dispatch(delete_card_product(pt._id)) }>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        }        


                        {
                        outofstock_products.length > 0 && <div>
                            <div>
                                <h2>Out of Stock {outofstock_products.length}</h2>
                            </div>

                        <div>
                        {
                            outofstock_products.map((p,i) => <div>
                            <div>
                                <div>
                                    <img src={ p.products[0].images[0] } alt="" />
                                    <div>
                                        <h2>{p.products[0].name}</h2>
                                        <span>{p.products[0].brand}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <h2>${p.products[0].price - Math.floor((p.products[0].price * p.products[0].discount) / 100 )}</h2>
                                    <p>${p.products[0].price}</p>
                                    <p>-{p.products[0].discount}%</p>
                                </div>
                                <div>
                                    <div>
                                        <div>-</div> 
                                        <div>{p.quantity}</div> 
                                        <div>+</div> 
                                    </div>
                                    <button>Delete</button>
                                </div>
                            </div>


                        </div>)
                    }
                    </div>           

                        </div>
                }      

                
                    

                <div>
                    <div>
                        {
                            card_products.length > 0 && <div>
                                <h2>Order Summary</h2>
                                <div>
                                    <span>{buy_product_item} Items </span>
                                    <span>${price} </span>
                                </div>
                                <div>
                                    <span>Shipping Fee </span>
                                    <span>${shipping_fee} </span>
                                </div>
                                <div>
                                    <input type="text" placeholder='Input Vauchar Coupon' />
                                    <button >Apply</button>
                                </div>

                                <div>
                                    <span>Total</span>
                                    <span>${price + shipping_fee} </span>
                                </div>
                                <button onClick={redirect}>
                                    Process to Checkout ({buy_product_item})
                                </button>

                            </div>
                        }

                    </div>
                </div>
















                    </div> 

                    : <div>
                        <Link to='/shops' > Shop Now</Link>
                    </div>
                }
             </div>

            </section>
        <Footer/>
        </div>
    );
};

export default Card;
