import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { get_order_details } from '../../store/reducers/orderReducer';

const OrderDetails = () => {

    const {orderId} = useParams()
    const dispatch = useDispatch()

    const {userInfo} = useSelector(state => state.auth)
    const {myOrder} = useSelector(state => state.order)
    
    useEffect(() => {
        dispatch(get_order_details(orderId))
    },[orderId])

    return (
        <div>
            <h2>#{myOrder._id} , <span>{myOrder.date}</span> </h2>
    
            <div>
                <h2>
                Deliver To : {myOrder.shippingInfo?.name} </h2>
                <p>
                    <span>Home</span>
                    <span>{myOrder.shippingInfo?.address}{myOrder.shippingInfo?.province}{myOrder.shippingInfo?.city}</span>
                </p>
                <p>
                    Email To {userInfo.email }
                </p>
            </div>

            <div>
                <h2>Price : ${myOrder.price} Include Shipping</h2>
                <p> Payment Status : <span className={`a ${myOrder.payment_status === 'paid' ? 'b' : 'c' }`}> {myOrder.payment_status} </span> </p>

                <p> Order Status : <span className={`a ${myOrder.delivery_status === 'paid' ? 'b' : 'c' }`}> {myOrder.delivery_status} </span> </p> 
            </div>   
        </div>

        <div>
            <h2>Order Products </h2>
            <div>
                {
                    myOrder.products?.map((p,i) => <div key={i}>
                        <div>
                            <div>
                               <img src={p.images[0]} alt="" />
                               <div>
                                    <Link> {p.name} </Link>
                                    <p> <span>Brand : {p.brand}</span> </p>
                                    <p><span>Quantity : {p.quantity}</span></p>
                               </div>
                            </div>

                        <div>
                                <h2>${p.price - Math.floor((p.price * p.discount) / 100)}</h2>
                                <p>{p.price}</p>
                                <p>-{p.discount}%</p>
                        </div>


            </div>
        </div>

                )
            }
        </div>

    </div>
        </div>
    );
};

export default OrderDetails;
