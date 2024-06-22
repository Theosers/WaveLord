import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6"; 
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { customer_login,messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';

const Login = () => {

    const navigate = useNavigate()
    const {loader,errorMessage,successMessage,userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [state, setState] = useState({ 
        email: '',
        password: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const login = (e) => {
        e.preventDefault()
        dispatch(customer_login(state))
    }

    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
        } 
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())  
        } 
        if (userInfo) {
            navigate('/')
        }
    },[successMessage,errorMessage])
    


    return (
        <div>
            {
                loader && <div>
                    <FadeLoader/>
                </div>
            }
            <Header/>
            <div>
                <div>
                    <h2>Login </h2> 

                <div>
                    <form onSubmit={login}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input onChange={inputHandle} value={state.email} type="email" name="email" id="email" placeholder='Email' required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input onChange={inputHandle} value={state.password} type="password" name="password" id="password" placeholder='Password' required />
                    </div>

                    <button>Login</button>

                    </form>
                    <div>
                        <span>Or</span>
                    </div>

                    <button>
                        <span><FaFacebookF /> </span>
                        <span>Login With Facebook </span>
                    </button>

                    <button>
                        <span><FaGoogle  /></span>
                        <span>Login With Google </span>
                    </button> 
                </div>    

                <div>
                <p>Don't Have An Account ? <Link to='/register'> Register</Link> </p>
                </div> 
                    
                <a target='_blank' href="http://localhost:3001/login">
                    <div>
                        Login As a Seller
                    </div>
                </a>

                <a target='_blank' href="http://localhost:3001/register">
                    <div>
                        Register As a Seller
                    </div>
                </a>   
            </div> 

            <div>
                <img src="http://localhost:3000/public/images/login.jpg" alt="" />
            </div>    
        </div>        
            <Footer/>
        </div>
    );
};
export default Login;
