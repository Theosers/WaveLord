import React, { useState } from 'react';
import { PaymentElement,LinkAuthenticationElement,useStripe,useElements } from '@stripe/react-stripe-js' 

const CheckoutForm = ({orderId}) => {

    localStorage.setItem('orderId',orderId)
    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const paymentElementOptions = {
        loyout: 'tabs'
    }

    const submit = async (e) => {
        e.preventDefault()
    }


    return (
        <form onSubmit={submit} id='payment-form'>
            <LinkAuthenticationElement id='link-authentication-element'/>
            <PaymentElement id='payment-element' options={paymentElementOptions} />

            <button disabled={isLoading || !stripe || !elements} id='submit'>
                <span id='button-text'>
                    {
                        isLoading ? <div>Loading...</div> : "Pay Now"
                    }
                </span> 
            </button>
               {message && <div>{message}</div>}
        </form>
    );
};

export default CheckoutForm;
