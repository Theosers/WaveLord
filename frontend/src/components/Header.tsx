import React from 'react';
import { MdEmail} from "react-icons/md"
import {IoMdPhonePortrait} from "react-icons/io"
import { FaFacebookF, FaLinkedin, FaGithub, FaLock, FaUser } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa6"
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from 'react-router-dom';
import '../scss/Header.scss'

const Header = () => {

    const user = true

    return (
        <div className='main-container'>
            
     
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
                                <span>Theo Sers</span>
                            </Link> 
                        : <Link className='profile' to='/login'>
                                <span> <FaLock /> </span>
                                <span>Login </span>
                            </Link>
                }   
                
            </ul>

            
        

        </div>
    )
}
export default Header;