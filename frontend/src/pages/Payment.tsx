import React, { useState } from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';
import { useLocation } from 'react-router-dom';

const Payment = () => {

    const { state: {price,items,orderId}} = useLocation()
    const [paymentMethod, setPaymentMethod] = useState('stripe')
    
    return (
        <div>
           <Header/>
           <section>
            <div>
                <div>
                    <div>
                        <img src="http://localhost:3000/public/images/payment/stripe.png" alt="" />
                    </div>
                    <span>Stripe</span>
                </div>                  
            </div>
        </section>
        <Footer/>
        </div>
    );
};

export default Payment;
