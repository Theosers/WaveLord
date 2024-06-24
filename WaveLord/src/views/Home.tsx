import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';

const Home: React.FC = () => {
    const { role } = useSelector((state: RootState) => state.auth);
    
    if (role === 'seller') return <Navigate to='/seller/dashboard' replace />;
    else if (role === 'admin') return <Navigate to='/admin/dashboard' replace />;
    else return <Navigate to='/login' replace />;
};

export default Home;
