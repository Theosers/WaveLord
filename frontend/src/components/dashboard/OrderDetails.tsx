import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
        </div>
    );
};

export default OrderDetails;
