import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get_seller_order } from '../../store/Reducers/OrderReducer';
import '../../scss/admin/OrderDetails.scss';

const OrderDetails = () => {

    const { orderId } = useParams() 
    const dispatch = useDispatch() 
    const { order,errorMessage,successMessage } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(get_seller_order(orderId))
    },[orderId])
    
    return (
        <div className='order-details-container'>
            <div className='order-details-box'>
                <div className='title-container'>
                    <h2>Order Details</h2>
                    <select name="" id="">
                        <option value="">pending</option>
                        <option value="">processing</option>
                        <option value="">warehouse</option>
                        <option value="">placed</option>
                        <option value="">cancelled</option>
                    </select>
                </div>
                <div className='duo-box'>
                    <div className='big-box'>
                        <div className='subtitle-container'>
                            <h2>#{order._id}</h2>
                            <span>{order.date}</span> 
                        </div>
                        <div className='deliver-to'>
                            <div className="deliver-to-top-content">
                                <h2>Deliver To : {order.shippingInfo}</h2>
                                <span>2504 Ivin Avenue, Egg Harbor Township, NI 06234 USA</span>
                            </div>
                            <div className='payment-status'>
                                <h2>Payment Status : </h2>
                                <span>{order.payment_status}</span>
                            </div>
                            <span className='order-details-price'>Price : ${order.price}</span>
                        </div>

                        {
                            order?.products?.map((p,i) => <div key={i} className='order-items'>
                                <img className='user-image' src={p.images[0]} alt="" />
                                    <div>
                                        <h2>{p.name}</h2>
                                        <p>
                                            <span>Brand : </span>
                                            <span>{p.brand}</span>
                                            <span>Quantity : {p.quantity} </span>
                                        </p>
                                    </div> 
                            </div> 
                            )
                         }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
