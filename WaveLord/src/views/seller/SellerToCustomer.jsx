import React, { useEffect, useRef, useState } from 'react';
import { FaList } from 'react-icons/fa6';
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { get_customer_message, get_customers } from '../../store/Reducers/chatReducer';
import { Link, useParams } from 'react-router-dom';

import { FaRegFaceGrinHearts } from "react-icons/fa6";
import toast from 'react-hot-toast';

import '../../scss/seller/SellerToCustomer.scss';
import { TRUE } from 'sass';

const SellerToCustomer = () => {
    const scrollRef = useRef();
    const [show, setShow] = useState(false);
    const sellerId = 65
    const {userInfo } = useSelector(state => state.auth)
    const {customers,messages,currentCustomer } = useSelector(state => state.chat)
    const { customerId } = useParams()
    

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_customers(userInfo._id))
    },[])

    useEffect(() => {
        if (customerId) {
            dispatch(get_customer_message(customerId))
        }
    },[customerId])


    return (
        <div className='chat-seller-container'>
            <div className={`chat-seller-list ${show ? 'chat-seller-list-off' : ''}`}>
                <div className='chat-seller-list-title'>
                    <h2>Customer</h2>
                    <IoMdClose className='chat-seller-close-icon' onClick={() => setShow(!show)} />
                </div>
                
                {
                    customers.map((c,i) => ( <Link key={i} to={`/seller/dashboard/chat-customer/${c.fdId} className={`chat-seller-subcontainer ${sellerId === s._id ? 'chat-seller-active' : ''}`}>
                            <div className='chat-seller-subcontainer'>
                                <img className='chat-seller-img' src="http://localhost:3000/src/assets/admin.jpeg" alt="" />
                            
                                <h2 className='chat-seller-name'>{c.name}</h2>
                            </div>
                            
                    </Link>
                )}
            </div>
            <div className={`chat-current-seller ${show ? 'chat-current-seller-off' : ''}`}>

                <div className='chat-current-seller-title-container' >
                    <div className='chat-current-seller-title-container' >
                        <img className='chat-seller-img' src="http://localhost:3001/src/assets/admin.jpeg" alt="" />
                        <h2>{currentCustomer.name}</h2>
                    </div>
                    <FaList className='chat-seller-list-icon' onClick={() => setShow(!show)} />
                </div>
                
                
                <div className='chat-box'>
                <div className='left-person'>
                    <img className='chat-seller-img' src="http://localhost:3000/src/assets/admin.jpeg" alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, dolores eum! Hic minus, ex commodi, a incidunt obcaecati culpa sed quaerat nostrum accusantium, sint tempore autem officiis possimus repudiandae fugit?</p>
                </div>
                <div className='right-person'>
                    <img className='chat-seller-img' src="http://localhost:3000/src/assets/admin.jpeg" alt="" />
                    <p>How are you ?</p>
                </div>
                <div className='left-person'>
                    <img className='chat-seller-img' src="http://localhost:3000/src/assets/admin.jpeg" alt="" />
                    <p>How are you ?</p>
                </div>
                <div className='right-person'>
                    <img className='chat-seller-img' src="http://localhost:3000/src/assets/admin.jpeg" alt="" />
                    <p>How are you ?</p>
                </div>

                <div className='left-person'>
                    <img className='chat-seller-img' src="http://localhost:3000/src/assets/admin.jpeg" alt="" />
                    <p>How are you ?</p>
                </div>
                <div className='right-person'>
                    <img className='chat-seller-img' src="http://localhost:3000/src/assets/admin.jpeg" alt="" />
                    <p>How are you ?</p>
                </div>
                <div className='left-person'>
                    <img className='chat-seller-img' src="http://localhost:3000/src/assets/admin.jpeg" alt="" />
                    <p>How are you ?</p>
                </div>
                <div className='right-person'>
                    <img className='chat-seller-img' src="http://localhost:3000/src/assets/admin.jpeg" alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi facilis mollitia recusandae eos est repudiandae voluptate ullam, quasi ipsam vero omnis reprehenderit aliquam. Ullam tempora consequatur accusamus quasi, omnis eum.</p>
                </div>






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
