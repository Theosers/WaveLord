import React from 'react';
import '../../scss/admin/OrderDetails.scss';

const OrderDetails = () => {
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
                    <div className='right-box'>
                        <div className='seller-order'>
                        <h2>Seller 1 Order : </h2>
                        <span>pending</span>
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
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;