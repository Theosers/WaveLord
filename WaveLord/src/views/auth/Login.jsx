import React, { useState, useEffect } from 'react';
import '../../scss/auth/login.scss'
import {Link, useNavigate} from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { PropagateLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { overrideStyle } from '../../utils/utils';
import { seller_login, messageClear } from '../../store/Reducers/authReducer';

const Login = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {loader, errorMessage, successMessage} = useSelector(state => state.auth);


    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setState({
            ...state,
            [name]: value
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(seller_login(state));
    }
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear())
            navigate('/')
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear())
        }
        
    }, [successMessage, errorMessage]);

    return (
        <>
            <div className="loginPage">
                <div className="body-Container">
                    <div className="login-image-container">
                        <h1>Wave Lord</h1>                        
                    </div>
                    <div className="loginForm">
                        <h2>Welcome Back!</h2>
                        <form onSubmit={submitHandler}>
                            <label htmlFor="email">Email</label>
                            <input onChange={inputHandler} value={state.email}
                                    type="email" placeholder="Email" name='email' id='email' required/>
                            <label htmlFor="">Password</label>
                            <input onChange={inputHandler} value={state.password}
                                    type="password" placeholder="Password" name='password' id='password' required/>
                            <button disabled={loader ? true : false} type="submit">
                                {
                                    loader ? <PropagateLoader color='white' cssOverride={overrideStyle}/> : 'Sign In'
                                }
                                </button>
                            <p>Don't Have an account ? </p> 
                            <Link to="/register">Sign Up</Link> 
                            
                            <span className='or'>Or</span>
                            <span className='other-signup-buttons un'><FaGoogle/></span>
                            <span className='other-signup-buttons deux'><FaFacebook/></span>
                        </form>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default Login;
