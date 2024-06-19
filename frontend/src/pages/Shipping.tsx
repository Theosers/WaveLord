import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

const Shipping = () => {

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
                   [1,2].map((p,i) => <div>
                    <div>
                        <h2>Easy Shop</h2>
                    </div>

                        {
                            [1,2].map((p,i) => <div>
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

                    </div>) 
            } 

            
            <div>
                <h2>Order Summary</h2>
                <div>
                    <span>Items Total (5) </span>
                    <span>$343 </span>
                </div>
                <div>
                    <span>Delivery Fee </span>
                    <span>$40 </span>
                </div>

                <div>
                    <span>Total Payment </span>
                    <span>$450 </span>
                </div>


                <div>
                    <span>Total</span>
                    <span>$490 </span>
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