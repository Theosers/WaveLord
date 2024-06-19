import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF} from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import '../scss/Footer.scss'
const Footer = () => {
    return (
        <footer>
            <div>
                <img src="http://localhost:3000/public/images/logo.png" alt="logo" />
                <ul>
                    <li>Address :  2504 Ivins Avenue, Egg Harbor Township, NJ 08234,</li>
                    <li>Phone : 4343434344</li>
                    <li>Email : support@easylearingbd.com</li>
                </ul> 

                <h2>Usefull Links </h2>
                <div>
                    <ul>
                        <li>
                            <Link>About Us </Link>
                        </li>
                        <li>
                            <Link>About Our Shop </Link>
                        </li>
                        <li>
                            <Link>Delivery Information </Link>
                        </li>
                        <li>
                            <Link>Privacy Policy </Link>
                        </li>
                        <li>
                            <Link>Blogs  </Link>
                        </li>
                    </ul>
                </div> 
                <div>
                    <ul>
                            <li>
                                <Link>Our Service </Link>
                            </li>
                            <li>
                                <Link>Company Profile</Link>
                            </li>
                            <li>
                                <Link>Delivery Information </Link>
                            </li>
                            <li>
                                <Link>Privacy Policy </Link>
                            </li>
                            <li>
                                <Link>Blogs  </Link>
                            </li>
                    </ul>
                </div>
                <div>
                    <div>
                        <h2>Join Our Shop</h2>
                        <span>Get Email updates about tour latest and shop specials offers</span>
                        <div>
                            <input type="text" placeholder='Enter Your Email' />
                            <button>Subscribe</button>

                        </div> 
                    </div> 
                </div>

                <div>
                    <ul>
                            <li>
                                <a href="#"><FaFacebookF/> </a>
                            </li>

                            <li>
                                <a href="#"><FaTwitter/> </a>
                            </li>
                            <li>
                                <a href="#"><FaLinkedin/> </a>
                            </li>
                            <li>
                                <a href="#"><FaGithub/> </a>
                            </li>

                    </ul>
                </div>

                <div>
                    <span>Copiright @ 2024 All Rights Reserved </span>
                </div>

            </div>
        </footer>
    );
};
export default Footer;