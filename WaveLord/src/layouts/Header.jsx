import React from 'react';
import { FaList } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import '../scss/Header.scss';

const Header = ({showSidebar, setShowSidebar}) => {

  return (
    <div className='header-container'>
      <div className='header-inner'>
        <div onClick={() => setShowSidebar(!showSidebar)} className='menu-icon'>
          <span><FaList/></span>
        </div>
        <div className='search-input'>
          <input type="text" name='search' placeholder='search' />
        </div>
        <div className='user-info'>
          <div className='user-details'>
            <div className='user-text'>
              <h2>userInfos.name</h2>
              <span>userInfos.role</span>
            </div>
            <img className='user-image' src='http://localhost:3000/src/assets/admin.jpeg' alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
