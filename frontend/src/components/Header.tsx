import React, { useState } from 'react';
import { MdEmail} from "react-icons/md"
import {IoMdPhonePortrait} from "react-icons/io"
import { FaFacebookF, FaList, FaLinkedin, FaGithub, FaLock, FaUser, FaPhoneAlt } from "react-icons/fa"
import { FaTwitter, FaHeart, FaCartShopping } from "react-icons/fa6"
import { IoMdArrowDropdown, IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../scss/Header.scss'

const Header = () => {

    const navigate = useNavigate()
    const {categorys} = useSelector(state => state.home) 
    //const {userInfo} = useSelector(state => state.auth)
    const {card_product_count} = useSelector(state => state.card)

    const {pathname} = useLocation()
    const [showShidebar, setShowShidebar] = useState(true);
    const [categoryShow, setCategoryShow] = useState(true);
    const user = true
    const wishlist_count = 3
    

    const [searchValue, setSearchValue] = useState('')
    const [category, setCategory] = useState('')

    const search = () => {
        navigate(`/products/search?category=${category}&&value=${searchValue}`)
    }
    const redirect_card_page = () => {
        if (userInfo) {
            navigate('/card')
        } else {
            navigate('/login')
        }
    }

    return (
        <div className='main-container'>
            <div className='main-container-top'>
                
        
                <ul>
                    <li>
                        <span><MdEmail/> </span>
                        <span>support@gmail.com</span>
                    </li>
                    <li>
                        <span> <IoMdPhonePortrait /> </span>
                        <span>+(123) 32456 565</span>
                    </li>


                </ul>

                <ul>
                    <a href="#"> <FaFacebookF/> </a>
                    <a href="#"> <FaTwitter/> </a>
                    <a href="#"> <FaLinkedin/> </a>
                    <a href="#"> <FaGithub/> </a>

                    <div className='language'>
                        <img src="http://localhost:3000/public/images/language.png" alt="" />
                        <span><IoMdArrowDropdown /></span>
                        <ul>
                            <li>Hindi</li>
                            <li>English</li>
                        </ul>

                    </div>

                    {
                        user ? <Link className='profile' to='/dashboard'>
                                    <span> <FaUser/> </span>
                                    <span>{user.name}</span>
                                </Link> 
                            : <Link className='profile' to='/login'>
                                    <span> <FaLock /> </span>
                                    <span>Login </span>
                                </Link>
                    }   
                    
                </ul>

                
            

            </div>

            <div className='header'>
                <div className='header-menu'>
                    <Link to='/'>
                        <img src="http://localhost:3000/public/images/logo.png" alt="" />
                    </Link>
                    <div className='' onClick={() => setShowShidebar(false)}>
                        <span> <FaList/> </span>
                    </div>
                </div>


                <div className='navigation-container'>
                    <ul className=''>
                        <li>
                            <Link>Home</Link>
                        </li>

                        <li>
                            <Link to='/shops' >Shop</Link>
                        </li>
                        <li>
                            <Link>Blog</Link>
                        </li>
                        <li>
                            <Link >About Us</Link>
                        </li>
                        <li>
                            <Link>Contact Us</Link>
                        </li>

                    </ul>

                </div>
                <div className='multiple-icons-container'>
                    <div className='icon-container'>
                        <span className=''><FaHeart /></span>
                        <div>
                            {
                                wishlist_count
                            }
                            
                        </div>
                    </div>
                    <div onClick={redirect_card_page} className='icon-container'>
                        <span className=''><FaCartShopping /></span>
                        
                            {
                                wishlist_count
                            }
                       
                    </div>
                </div>
                    
                

            </div>

            <div className='category-container'>
            <div onClick={() => setCategoryShow(!categoryShow) }>
                <div className='category-large-button'>
                    <span><FaList/></span>
                    <span>All Category </span>
                <span className><IoIosArrowDown /></span>
                <ul className='inside-allCategory'>
                    {
                        categorys.map((c,i) => {
                            return (
                            <li key={i} className=''>
                                <img src={c.image} alt="" />
                                <Link to={`/products?category=${c.name}`} className=''>{c.name}</Link>
                            </li>
                            )
                        })
                    }
                </ul>
                </div>
            </div>
            <div className='category-input-container'>
                <select onChange={(e) => setCategory(e.target.value)} name="" id="">
                    <option value="">Select Category</option>
                    {
                        categorys.map((c, i) => <option key={i} value={c.name}>
                            {c.name}
                        </option> )
                    }
                </select>
                <input onChange={(e)=> setSearchValue(e.target.value)} type="text" name='' id='' placeholder='What do you need' />
                <button onClick={search} >Search</button>
            </div>

            <div className='tel-container'>
                
                <span><FaPhoneAlt /></span>
                <div>
                <span>+1343-43233455</span>
                <span>Support 24/7</span> 
                </div>
            </div>
                
            

            </div>
        </div>
    )
}
export default Header;
