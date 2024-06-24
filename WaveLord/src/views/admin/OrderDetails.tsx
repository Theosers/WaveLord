import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { admin_order_status_update, get_admin_order, messageClear } from '../../store/Reducers/OrderReducer';
import toast from 'react-hot-toast';
import '../../scss/admin/OrderDetails.scss';
import { RootState, AppDispatch } from '../../store';

const OrderDetails: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [status, setStatus] = useState<string>('');
    const { order, errorMessage, successMessage } = useSelector((state: RootState) => state.order);
    const { orderId } = useParams<{ orderId: string }>();

    useEffect(() => {
        if (order) {
            setStatus(order.delivery_status);
        }
    }, [order]);

    useEffect(() => {
        if (orderId) {
            dispatch(get_admin_order(orderId));
        }
    }, [orderId, dispatch]);

    const status_update = (e: ChangeEvent<HTMLSelectElement>) => {
        if (orderId) {
            dispatch(admin_order_status_update({ orderId, info: { status: e.target.value } }));
            setStatus(e.target.value);
        }
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch]);

    return (
        <div className='order-details-container'>
            <div className='order-details-box'>
                <div className='title-container'>
                    <h2>Order Details</h2>
                    <select onChange={status_update} value={status}>
                        <option value="pending">pending</option>
                        <option value="processing">processing</option>
                        <option value="warehouse">warehouse</option>
                        <option value="placed">placed</option>
                        <option value="cancelled">cancelled</option>
                    </select>
                </div>
                <div className='duo-box'>
                    <div className='big-box'>
                        <div className='subtitle-container'>
                            <h2>#12345</h2>
                            <span>3 Jan 2024</span>
                        </div>
                        <div className='deliver-to'>
                            <div className="deliver-to-top-content">
                                <h2>Deliver To : Théo Sers</h2>
                                <span>2504 Ivin Avenue, Egg Harbor Township, NI 06234 USA</span>
                            </div>
                            <div className='payment-status'>
                                <h2>Payment Status : </h2>
                                <span>Paid</span>
                            </div>
                            <span className='order-details-price'>Price : $920</span>
                        </div>
                        <div className='order-items'>
                            <img className='user-image' src='http://localhost:3000/src/assets/admin.jpeg' alt='' />
                            <div>
                                <h2>Product Name here</h2>
                                <p>
                                    <span>Brand : </span>
                                    <span>Easy</span>
                                    <span>Quantity : 3</span>
                                </p>
                            </div>
                        </div>
                        <div className='order-items'>
                            <img className='user-image' src='http://localhost:3000/src/assets/admin.jpeg' alt='' />
                            <div>
                                <h2>Product Name here</h2>
                                <p>
                                    <span>Brand : </span>
                                    <span>Easy</span>
                                    <span>Quantity : 3</span>
                                </p>
                            </div>
                        </div>
                        <div className='order-items'>
                            <img className='user-image' src='http://localhost:3000/src/assets/admin.jpeg' alt='' />
                            <div>
                                <h2>Product Name here</h2>
                                <p>
                                    <span>Brand : </span>
                                    <span>Easy</span>
                                    <span>Quantity : 3</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {order?.suborder?.map((o, i) => (
                        <div key={i} className='right-box'>
                            <div className='seller-order'>
                                <h2>Seller {i + 1} Order : </h2>
                                <span>{o.delivery_status}</span>
                            </div>
                            {o.products?.map((p, j) => (
                                <div key={j} className='order-items'>
                                    <img className='user-image' src={p.images[0]} alt='' />
                                    <div>
                                        <h2>{p.name}</h2>
                                        <p>
                                            <span>Brand : </span>
                                            <span>{p.brand}</span>
                                            <span>Quantity : {p.quantity}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
