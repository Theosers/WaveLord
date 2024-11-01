import React, { useEffect, useRef, useState } from 'react';
import { FaList } from 'react-icons/fa6';
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../../scss/admin/ChatSeller.scss';
import { RootState, AppDispatch } from '../../store';

interface Seller {
    _id: string;
    name: string;
}

const ChatSeller: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);
    const { sellerId } = useParams<{ sellerId: string }>();
    const [text, setText] = useState('');
    const [receverMessage, setReceverMessage] = useState('');

    const dispatch = useDispatch<AppDispatch>();

    const sellers: Seller[] = [
        { _id: '0', name: 'gogogadgetoChapeau' },
        { _id: '1', name: 'gogo' },
        { _id: '2', name: 'gogo' },
        { _id: '3', name: 'gogo' },
        { _id: '4', name: 'gogo' },
        { _id: '5', name: 'gogo' }
    ];

    const activeSellers = [0, 1, 2];

    return (
        <div className='chat-seller-container'>
            <div className={`chat-seller-list ${show ? 'chat-seller-list-off' : ''}`}>
                <div className='chat-seller-list-title'>
                    <h2>Sellers</h2>
                    <IoMdClose className='chat-seller-close-icon' onClick={() => setShow(!show)} />
                </div>

                {sellers.map((s, i) => (
                    <Link key={i} to={`/admin/dashboard/chat-sellers/${s._id}`} className={`chat-seller-subcontainer ${sellerId === s._id ? 'chat-seller-active' : ''}`}>
                        <div className='chat-seller-subcontainer'>
                            <img className='chat-seller-img' src="http://localhost:3000/src/assets/admin.jpeg" alt="" />
                            {activeSellers.some(a => a === parseInt(s._id)) && <div className='chat-seller-active-indicator'></div>}
                            <h2 className='chat-seller-name'>{s.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
            <div className={`chat-current-seller ${show ? 'chat-current-seller-off' : ''}`}>
                <div className='chat-current-seller-title-container'>
                    <img className='chat-seller-img' src="http://localhost:3000/src/assets/admin.jpeg" alt="" />
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

export default ChatSeller;
