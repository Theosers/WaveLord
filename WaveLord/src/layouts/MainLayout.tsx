import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { socket } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomer, updateSellers } from '../store/Reducers/chatReducer';
import '../scss/layouts/MainLayout.scss';

interface RootState {
  auth: {
    userInfo: {
      _id: string;
      role: string;
      [key: string]: any;
    };
  };
}

const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.role === 'seller') {
      socket.emit('add_seller', userInfo._id, userInfo);
    } else {
      socket.emit('add_admin', userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    socket.on('activeCustomer', (customers) => {
      dispatch(updateCustomer(customers));
    });
    socket.on('activeSeller', (sellers) => {
      dispatch(updateSellers(sellers));
    });
  }, [dispatch]);

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className='mainlayout-container'> 
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
      <div className='outlet-container'>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
