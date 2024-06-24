import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get_seller_order, messageClear, seller_order_status_update } from '../../store/Reducers/OrderReducer';
import toast from 'react-hot-toast';
import '../../scss/admin/OrderDetails.scss';

interface Product {
  images: string[];
  name: string;
  brand: string;
  quantity: number;
}

interface Order {
  _id: string;
  date: string;
  delivery_status: string;
  shippingInfo: string;
  payment_status: string;
  price: number;
  products: Product[];
}

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const dispatch = useDispatch();
  const [status, setStatus] = useState<string>('');

  const { order, errorMessage, successMessage } = useSelector((state: any) => state.order);

  useEffect(() => {
    if (order) {
      setStatus(order.delivery_status);
    }
  }, [order]);

  useEffect(() => {
    if (orderId) {
      dispatch(get_seller_order(orderId));
    }
  }, [dispatch, orderId]);

  const status_update = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(seller_order_status_update({ orderId, info: { status: e.target.value } }));
    setStatus(e.target.value);
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
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="warehouse">Warehouse</option>
            <option value="placed">Placed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className='duo-box'>
          <div className='big-box'>
            <div className='subtitle-container'>
              <h2>#{order?._id}</h2>
              <span>{order?.date}</span>
            </div>
            <div className='deliver-to'>
              <div className="deliver-to-top-content">
                <h2>Deliver To: {order?.shippingInfo}</h2>
                <span>2504 Ivin Avenue, Egg Harbor Township, NJ 06234 USA</span>
              </div>
              <div className='payment-status'>
                <h2>Payment Status:</h2>
                <span>{order?.payment_status}</span>
              </div>
              <span className='order-details-price'>Price: ${order?.price}</span>
            </div>
            {order?.products?.map((p, i) => (
              <div key={i} className='order-items'>
                <img className='user-image' src={p.images[0]} alt="" />
                <div>
                  <h2>{p.name}</h2>
                  <p>
                    <span>Brand: </span>
                    <span>{p.brand}</span>
                    <span>Quantity: {p.quantity}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
