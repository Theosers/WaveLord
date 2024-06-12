import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import '../scss/layouts/MainLayout.scss';

const MainLayout = () => {

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