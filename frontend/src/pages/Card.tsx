import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch,useSelector } from 'react-redux';
import { get_card_products } from '../store/reducers/cardReducer';

const Card = () => {

    const dispatch = useDispatch()
    //const {userInfo} = useSelector(state => state.auth) 

    const navigate = useNavigate()
    const card_products = [1,2]
    const outOfStockProduct = [1,2]

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
                    card_products.length > 0 || outOfStockProduct > 0 ? <div>
                        <div>
                            <div>
                                <h2>Stock Products {card_products.length}</h2>
                            </div>
                        </div>
                        {
                        <div>
                            <div>
                                <h2>Easy Shop</h2>
                            </div>

                            {
                                <div>
                                    <div>
                                        <div>
                                            <img src="http://localhost:3000/images/products/3.webp" alt="" />
                                            <div>
                                                <h2>Product Name </h2>
                                                <span>Brand: Jara</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div>
                                            <h2>$240</h2>
                                            <p>$300</p>
                                            <p>-15%</p>
                                        </div>
                                        <div>
                                            <div>
                                                <div>-</div> 
                                                <div>2</div> 
                                                <div>+</div> 
                                            </div>
                                            <button>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        }        


                        {
                        outOfStockProduct.length > 0 && <div>
                            <div>
                                <h2>Out of Stock {outOfStockProduct.length}</h2>
                            </div>

                        <div>
                        {
                            [1].map((p,i) => <div>
                            <div>
                                <div>
                                    <img src={`http://localhost:3000/public/images/products/${i+1}.webp`} alt="" />
                                    <div>
                                        <h2>Product Name </h2>
                                        <span>Brand: Jara</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <h2>$240</h2>
                                    <p>$300</p>
                                    <p>-15%</p>
                                </div>
                                <div>
                                    <div>
                                        <div>-</div> 
                                        <div>2</div> 
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
                                    <span>2 Items </span>
                                    <span>$343 </span>
                                </div>
                                <div>
                                    <span>Shipping Fee </span>
                                    <span>$40 </span>
                                </div>
                                <div>
                                    <input type="text" placeholder='Input Vauchar Coupon' />
                                    <button >Apply</button>
                                </div>

                                <div>
                                    <span>Total</span>
                                    <span>$430 </span>
                                </div>
                                <button onClick={redirect}>
                                    Process to Checkout 
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
