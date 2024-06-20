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
                    <Stripe/>
                </div>
               }
            {
                paymentMethod === 'cod' && <div className='w-full px-4 py-8 bg-white shadow-sm'>
                    <button className='px-10 py-[6px] rounded-sm hover:shadow-green-500/20 hover:shadow-lg bg-[#059473] text-white'>Pay Now</button>
                </div>
            }
        </div>
        </section>
        <Footer/>
    </div>
    );
};

export default Payment;
