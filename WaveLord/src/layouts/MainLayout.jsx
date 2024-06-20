import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { socket } from '../utils/utils'
import { useSelector } from 'react-redux';
import '../scss/layouts/MainLayout.scss';

const MainLayout = () => {

    const {userInfo } = useSelector(state => state.auth)

    useEffect(() => {
        if (userInfo && userInfo.role === 'seller') {
            socket.emit('add_seller', userInfo._id,userInfo)
        } else {
            socket.emit('add_admin', userInfo)
        }
    },[userInfo])

    const [showSidebar, setShowSidebar] = useState(false);



    return (
        
        <div className='mainlayout-container'> 
            <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
            <div className='outlet-container'>
            <Outlet/>
            </div>
        </div>
    );
};

export default MainLayout;
