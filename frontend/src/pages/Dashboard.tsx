import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaList } from 'react-icons/fa';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { IoIosHome } from "react-icons/io";
import { FaBorderAll } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import api from '../api/api';
import { useDispatch } from 'react-redux';
import { user_reset } from '../store/reducers/authReducer'
import { reset_count } from '../store/reducers/cardReducer'

const Dashboard = () => {

    const [filterShow, setFilterShow] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logout = async () => {
        try {
            const {data} = await api.get('/customer/logout')
            localStorage.removeItem('customerToken')
            dispatch(user_reset())
            dispatch(reset_count())
            navigate('/login')

        } catch (error) {
            console.log(error.response.data)
        }
    }
    
    return (
        <div>
           <Header/>
           <div>
                <div>
                    <button><FaList/> </button>
                </div>
           </div>



            <div>
                    <ul> 
                        <li>
                            <span><IoIosHome /></span>
                            <Link to='/dashboard'>Dashboard </Link>
                        </li>
                        <li>
                            <span><FaBorderAll/></span>
                            <Link to='/dashboard/my-orders'>My Orders </Link>
                        </li>
                        <li>
                            <span><FaHeart/></span>
                            <Link to='/dashboard/my-wishlist'>Wishlist </Link>
                        </li>
                        <li>
                            <span><IoChatbubbleEllipsesSharp/></span>
                            <Link to='/dashboard/chat'>Chat  </Link>
                        </li>
                        <li>
                            <span><RiLockPasswordLine/></span>
                            <Link to='/dashboard/change-password'>Change Password  </Link>
                        </li>
                        <li onClick={logout}>
                            <span><IoMdLogOut/></span>
                            <Link>Logout </Link>
                        </li> 
                </ul> 

                <div>
                    <Outlet/>
                </div>
            </div>        
           
           <Footer/>
        </div>
    );
};

export default Dashboard;
