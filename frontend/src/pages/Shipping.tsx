import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

const Shipping = () => {

    const { state: {products,price,shipping_fee,items }} = useLocation()

    const [res, setRes] = useState(false)
    const [state, setState] = useState({
        name: '',
        address: '',
        phone: '',
        post: '',
        province: '',
        city: '',
        area: ''
    })
    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const save = (e) => {
        e.preventDefault()
        const {name,address,phone,post,province,city,area } = state;
        if (name && address && phone && post && province && city && area) {
            setRes(true)
        }

    }
    
    return (
        <div>
            <Header/>
            <section>
            <div>
                <h2>Shipping Page </h2>
                <div>
                    <Link to='/'>Home</Link>
                    <span>
                        <IoIosArrowForward />
                    </span>
                    <span>Shipping </span>
                </div>
            </div> 
            </section>


        <section>
            <div>
                <h2>Shipping Information </h2>
                {
                !res && <>
                <form onSubmit={save}>
                    <div>
                        <div>
                            <label htmlFor="name"> Name </label>
                            <input onChange={inputHandle} value={state.name} type="text" name="name" id="name" placeholder='Name' /> 
                        </div>

                        <div>
                            <label htmlFor="address"> Address </label>
                            <input onChange={inputHandle} value={state.address} type="text" name="address" id="address" placeholder='Address' /> 
                        </div>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="phone"> Phone </label>
                            <input onChange={inputHandle} value={state.phone} type="text" name="phone" id="phone" placeholder='Phone' /> 
                        </div>

                        <div>
                            <label htmlFor="post"> Post </label>
                            <input onChange={inputHandle} value={state.post} type="text" name="post" id="post" placeholder='Post' /> 
                        </div> 
                    </div>

                    <div>
                        <div>
                            <label htmlFor="province"> Province </label>
                            <input onChange={inputHandle} value={state.province} type="text" name="province" id="province" placeholder='Province' /> 
                        </div>

                        <div>
                            <label htmlFor="city"> City </label>
                            <input onChange={inputHandle} value={state.city} type="text" name="city" id="city" placeholder='City' /> 
                        </div> 
                    </div>

                    <div>
                        <div>
                            <label htmlFor="area"> Area </label>
                            <input onChange={inputHandle} value={state.area} type="text" name="area" id="area" placeholder='Area' /> 
                        </div>

                        <div>
                            <button>Save Change </button>
                        </div> 
                    </div> 
                </form>
                </>
                }

                {
                    res && <div>
                    <h2>Deliver To {state.name}</h2>
                        <p>
                            <span>Home</span>
                            <span>{state.phone} {state.address} {state.province} {state.city} {state.area} </span>
                            <span onClick={() => setRes(false)}>Change </span>
                        </p>
                        <p>Email To ariyan@gmail.com</p>
                    </div>
                }

            </div>








            {
                   products.map((p,i) => <div key={i}>
                    <div>
                        <h2>{p.shopName}</h2>
                    </div>

                        {
                            p.products.map((pt,i) => <div>
                                    <div>
                                        <div>
                                            <img src={pt.productInfo.images[0]} alt="" />
                                            <div>
                                                <h2>{pt.productInfo.name} </h2>
                                                <span>Brand: {pt.productInfo.brand}</span>
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
                                                <div>2</div> 
                                                <div>+</div> 
                                            </div>
                                            <button>Delete</button>
                                        </div>
                                    </div>


                                </div>)
                        }

                    </div>) 
            } 

            
            <div>
                <h2>Order Summary</h2>
                <div>
                    <span>Items Total (items) </span>
                    <span>${price} </span>
                </div>
                <div>
                    <span>Delivery Fee </span>
                    <span>${shipping_fee} </span>
                </div>

                <div>
                    <span>Total Payment </span>
                    <span>${price + shipping_fee} </span>
                </div>


                <div>
                    <span>Total</span>
                    <span>${price + shipping_fee}</span>
                </div>
                <button disabled={res ? false : true} className={`a ${res ? 'b' : 'c'}`}>
                   Place Order 
                </button>
            </div>
        </section>       

          <Footer/>
        </div>
    );
};

export default Shipping;
