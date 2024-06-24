import React, { useEffect, useRef, useState } from 'react';
import { FaList } from 'react-icons/fa6';
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { get_customer_message, get_customers } from '../../store/Reducers/chatReducer';
import { Link, useParams } from 'react-router-dom';

import { RootState } from '../../store/store'; // rootstate from store
import '../../scss/seller/SellerToCustomer.scss';

const SellerToCustomer: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const { customers, messages, currentCustomer } = useSelector((state: RootState) => state.chat);
    const { customerId } = useParams<{ customerId: string }>();

    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            dispatch(get_customers(userInfo._id));
        }
    }, [userInfo, dispatch]);

    useEffect(() => {
        if (customerId) {
            dispatch(get_customer_message(customerId));
        }
    }, [customerId, dispatch]);

    return (
        <div className='chat-seller-container'>
            <div className={`chat-seller-list ${show ? 'chat-seller-list-off' : ''}`}>
                <div className='chat-seller-list-title'>
                    <h2>Customer</h2>
                    <IoMdClose className='chat-seller-close-icon' onClick={() => setShow(!show)} />
                </div>
                
                {customers.map((c, i) => (
                    <Link
                        key={i}
                        to={`/seller/dashboard/chat-customer/${c._id}`}
                        className={`chat-seller-subcontainer ${customerId === c._id ? 'chat-seller-active' : ''}`}
                    >
                        <div className='chat-seller-subcontainer'>
                            <img className='chat-seller-img' src="http://localhost:3000/src/assets/admin.jpeg" alt="Customer" />
                            <h2 className='chat-seller-name'>{c.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
            <div className={`chat-current-seller ${show ? 'chat-current-seller-off' : ''}`}>
                <div className='chat-current-seller-title-container'>
                    <div className='chat-current-seller-title-container'>
                        <img className='chat-seller-img' src="http://localhost:3000/src/assets/admin.jpeg" alt="Admin" />
                        <h2>{currentCustomer?.name}</h2>
                    </div>
                    <FaList className='chat-seller-list-icon' onClick={() => setShow(!show)} />
                </div>
                
                <div className='chat-box'>
                    {messages.map((message, index) => (
                        <div key={index} className={message.senderId === userInfo._id ? 'right-person' : 'left-person'}>
                            <img className='chat-seller-img' src="http://localhost:3000/src/assets/admin.jpeg" alt="Admin" />
                            <p>{message.message}</p>
                        </div>
                    ))}
                </div>
                <form className='chat-form' action="">
                    <input type="text" />
                    <button type='submit'>Send</button>
                </form>
            </div>
        </div>
    );
};

export default SellerToCustomer;
