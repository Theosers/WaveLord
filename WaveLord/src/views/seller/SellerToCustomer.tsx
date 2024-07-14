import React, { useEffect, useRef, useState } from 'react';
import { FaList } from 'react-icons/fa';
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { get_customer_message, get_customers, send_message } from '../../store/Reducers/chatReducer';
import { Link, useParams } from 'react-router-dom';

import { RootState, AppDispatch } from '../../store/store'; // rootstate from store
import '../../scss/seller/SellerToCustomer.scss';

interface Customer {
    _id: string;
    name: string;
    image?: string;
}

interface Message {
    senderId: string;
    message: string;
}

const SellerToCustomer: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const { customers, messages, currentCustomer } = useSelector((state: RootState) => state.chat);
    const { customerId } = useParams<{ customerId: string }>();

    const dispatch = useDispatch<AppDispatch>();

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

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() !== '' && customerId) {
            dispatch(send_message({ senderId: userInfo?._id, receverId: customerId, message: newMessage }));
            setNewMessage('');
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className='chat-seller-container'>
            <div className={`chat-seller-list ${show ? 'chat-seller-list-off' : ''}`}>
                <div className='chat-seller-list-title'>
                    <h2>Customer</h2>
                    <IoMdClose className='chat-seller-close-icon' onClick={() => setShow(!show)} />
                </div>
                {customers.map((c: Customer, i: number) => (
                    <Link
                        key={i}
                        to={`/seller/dashboard/chat-customer/${c._id}`}
                        className={`chat-seller-subcontainer ${customerId === c._id ? 'chat-seller-active' : ''}`}
                    >
                        <div className='chat-seller-subcontainer'>
                            <img className='chat-seller-img' src={c.image || "/default-avatar.png"} alt="Customer" />
                            <h2 className='chat-seller-name'>{c.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
            <div className={`chat-current-seller ${show ? 'chat-current-seller-off' : ''}`}>
                <div className='chat-current-seller-title-container'>
                    <div className='chat-current-seller-title-container'>
                        <img className='chat-seller-img' src={currentCustomer?.image || "/default-avatar.png"} alt="Customer" />
                        <h2>{currentCustomer?.name}</h2>
                    </div>
                    <FaList className='chat-seller-list-icon' onClick={() => setShow(!show)} />
                </div>
                <div className='chat-box'>
                    {messages.map((message: Message, index: number) => (
                        <div key={index} className={message.senderId === userInfo?._id ? 'right-person' : 'left-person'} ref={scrollRef}>
                            <img className='chat-seller-img' src={message.senderId === userInfo?._id ? userInfo?.image || "/default-avatar.png" : currentCustomer?.image || "/default-avatar.png"} alt="User" />
                            <p>{message.message}</p>
                        </div>
                    ))}
                </div>
                <form className='chat-form' onSubmit={handleSendMessage}>
                    <input 
                        type="text" 
                        value={newMessage} 
                        onChange={(e) => setNewMessage(e.target.value)} 
                        placeholder="Type a message..." 
                    />
                    <button type='submit'>Send</button>
                </form>
            </div>
        </div>
    );
};

export default SellerToCustomer;
