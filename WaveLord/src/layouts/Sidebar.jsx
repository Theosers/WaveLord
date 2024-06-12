import React, { useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getNav } from '../navigation/index';
import { BiLogOutCircle } from 'react-icons/bi';
import '../scss/layouts/Sidebar.scss';
import logo from '../assets/logo.png';

const Sidebar = ({ showSidebar, setShowSidebar }) => {

    const {pathname} = useLocation();
    const [allNav, setAllNav] = useState([]);
    useEffect(() => {
        const navs = getNav('seller');
        setAllNav(navs);
        
    }, []);



    return (
        <div>
          <div onClick={() => setShowSidebar(false)} className={`overlay ${!showSidebar ? 'invisible' : 'visible'}`}></div>
          
          <div className={`sidebar ${showSidebar ? 'open' : ''}`}>
            <div className='logo-container'>
              <Link to='/'>
                <img src={logo} alt="Logo" />
              </Link>
            </div>
            <div className='nav-links'>
              <ul>
                {allNav.map((n, i) => (
                  <li key={i}>
                    <Link to={n.path} className={`${pathname === n.path ? 'active' : ''}`}>
                      <span>{n.icon}</span>
                      <span>{n.title}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <button onClick={() => dispatch(logout({ navigate, role }))} className='logout'>
                    <span><BiLogOutCircle /></span>
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    };

export default Sidebar