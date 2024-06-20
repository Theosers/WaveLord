import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaList } from 'react-icons/fa';

const Dashboard = () => {
    return (
        <div>
           <Header/>
           <div>
                <div>
                    <div>
                        <button><FaList/> </button>
                    </div>
                </div>
           </div>
           <Footer/>
        </div>
    );
};

export default Dashboard;
