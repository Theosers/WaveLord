import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getNav } from '../navigation/index';
import { BiLogOutCircle } from 'react-icons/bi';
import '../scss/layouts/Sidebar.scss';
import logo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/Reducers/authReducer';
import type { AppDispatch, RootState } from '../store/index';

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

interface NavItem {
  path: string;
  icon: React.ReactNode;
  title: string;
}

const Sidebar: React.FC<SidebarProps> = ({ showSidebar, setShowSidebar }) => {
  const dispatch: AppDispatch = useDispatch();
  const { role } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState<NavItem[]>([]);

  useEffect(() => {
    const navs = getNav(role);
    setAllNav(navs);
  }, [role]);

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

export default Sidebar;
