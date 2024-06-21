import React, { useState } from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';
import { useLocation } from 'react-router-dom';
import Stripe from '../components/Stripe';

const Payment = () => {

    const { state: {price,items,orderId}} = useLocation()
    const [paymentMethod, setPaymentMethod] = useState('stripe')
    
    return (
        <div>
           <Header/>
           <section>
            <div>
                <div>
                    <div onClick={() => setPaymentMethod('stripe')}>
                        <div>
                            <img src="http://localhost:3000/public/images/payment/stripe.png" alt="" />
                        </div>
                        <span>Stripe</span>
                    </div>  
    
                    <div onClick={() => setPaymentMethod('cod')} className={`a ${paymentMethod === 'cod' ? 'b':'c'} `} >
                        <div>
                            <img src="http://localhost:3000/images/payment/cod.jpg" alt="" />
                        </div>
                        <span>COD</span> 
                    </div>                   
    
                </div> 
                
               {
                paymentMethod === 'stripe' && <div>
                    <Stripe orderId={orderId} price={price} />
                </div>
               }
            {
                paymentMethod === 'cod' && <div>
                    <button>Pay Now</button>
                </div>
            }

            <div>
                <h2>Order Summary </h2>
                <div>
                    <span>{items} Items and Shipping Fee Included </span>
                    <span>${price} </span>
                </div>
                <div>
                    <span>Total Amount </span>
                    <span>${price}</span>
                </div>
            </div>
        </div>
        </section>
        <Footer/>
    </div>
    );
};

export default Payment;
