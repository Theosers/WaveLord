import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../../scss/seller/SellerToAdmin.scss';


const SellerToAdmin = () => {
    
    const [show, setShow] = useState(false);
  
    return (
        <div className='chat-support-container'>
           
            <div className={`chat-current-support ${show ? 'chat-current-seller-off' : ''}`}>

                <div className='chat-current-seller-title-container' >
                    <div className='chat-current-seller-title-container' >
                        <img className='chat-seller-img' src="http://localhost:3000/src/assets/admin.jpeg" alt="" />
                        <h2>Support</h2>
                    </div>
                    
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

export default SellerToAdmin;
