import React, { useState } from 'react';
import '../../scss/auth/login.scss'
import {Link} from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Login = () => {

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
        console.log(state)
    }

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
                            <button type="submit">Sign In</button>
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