import React, { useEffect, useRef, useState } from 'react';
import { FaList } from 'react-icons/fa6';
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { get_customers } from '../../store/Reducers/chatReducer';

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


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_customers(userInfo._id))
    },[])



    return (
        <div className='chat-seller-container'>
            <div className={`chat-seller-list ${show ? 'chat-seller-list-off' : ''}`}>
                <div className='chat-seller-list-title'>
                    <h2>Customer</h2>
                    <IoMdClose className='chat-seller-close-icon' onClick={() => setShow(!show)} />
                </div>
                
                {[{'_id':'0', 'name':'gogogadgetoChapeau'},{'_id':'0', 'name':'gogo'},{'_id':'0', 'name':'gogo'},
                    {'_id':'0', 'name':'gogo'},{'_id':'0', 'name':'gogo'},{'_id':'0', 'name':'gogo'}
                ].map((s, i) => (
                    <Link key={i} to={`/admin/dashboard/chat-sellers/${s._id}`} className={`chat-seller-subcontainer ${sellerId === s._id ? 'chat-seller-active' : ''}`}>
                        <div className='chat-seller-subcontainer'>
                            <img className='chat-seller-img' src="http://localhost:3000/src/assets/admin.jpeg" alt="" />
                            {[0,1,2].some(a => a.sellerId === s._id) && <div className='chat-seller-active-indicator'></div>}
                            <h2 className='chat-seller-name'>{s.name}</h2>
                        </div>
                        
                       
                        
                        
                    </Link>
                ))}
            </div>
            <div className={`chat-current-seller ${show ? 'chat-current-seller-off' : ''}`}>

                <div className='chat-current-seller-title-container' >
                    <div className='chat-current-seller-title-container' >
                        <img className='chat-seller-img' src="http://localhost:3000/src/assets/admin.jpeg" alt="" />
                        <h2>Théo Sayonara</h2>
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
