import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaList } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import { IoIosHome } from "react-icons/io";
import { FaBorderAll } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";

const Dashboard = () => {

    const [filterShow, setFilterShow] = useState(false)
    
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
                            <Link to='/dashboard'>Chat  </Link>
                        </li>
                        <li>
                            <span><RiLockPasswordLine/></span>
                            <Link to='/dashboard/change-password'>Change Password  </Link>
                        </li>
                        <li>
                            <span><IoMdLogOut/></span>
                            <Link to='/dashboard'>Logout </Link>
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
