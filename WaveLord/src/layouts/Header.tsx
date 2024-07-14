import React, { useState, useEffect } from 'react';
import { FaList } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import '../scss/layouts/Header.scss';

interface HeaderProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

interface RootState {
  auth: {
    userInfo: {
      name: string;
      role: string;
    } | null; // Allow userInfo to be null
  };
}

const Header: React.FC<HeaderProps> = ({ showSidebar, setShowSidebar }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='header-container'>
      <div className={`header-inner ${isScrolled ? 'scrolled' : ''}`}>
        <div onClick={() => setShowSidebar(!showSidebar)} className='menu-icon'>
          <span><FaList /></span>
        </div>
        <div className='search-input'>
          <input type="text" name='search' placeholder='search' />
        </div>
        <div className='user-info'>
          <div className='user-details'>
            {userInfo ? (
              <div className='user-text'>
                <h2>{userInfo.name}</h2>
                <span>{userInfo.role}</span>
              </div>
            ) : (
              <div className='user-text'>
                <h2>Guest</h2>
                <span>Role</span>
              </div>
            )}
            <img className='user-image' src='http://localhost:3000/src/assets/admin.jpeg' alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
