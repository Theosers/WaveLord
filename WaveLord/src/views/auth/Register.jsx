import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import '../../scss/auth/register.scss'
const Register = () => {

    const [state, setState] = useState({
        name: '',
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
                        <h2 className='header'>Registration !</h2>
                        <form onSubmit={submitHandler} >
                            <label htmlFor="name">Name</label>
                            <input onChange={inputHandler} value={state.name}
                                    type="name" placeholder="Name" name='name' id='name' required/>
                            <label htmlFor="email">Email</label>
                            <input onChange={inputHandler} value={state.email}
                                    type="email" placeholder="Email" name='email' id='email' required/>
                            <label htmlFor="">Password</label>
                            <input onChange={inputHandler} value={state.password}
                                    type="password" placeholder="Password" name='password' id='password' required/>
                            <div className="policy">
                                <label htmlFor="checkbox" className='privacy'> I agree to privacy policy</label> 
                                <input type="checkbox" name="checkbox" id="checkbox" required/>                                
                            </div>
                            <button type="submit">Sign Up</button>               
                            <p>Already have an account ? </p>      
                            <Link to="/login">Sign In</Link>                                 
                            <span className='or'>Or</span>
                            <div className='other-signup-buttons'>
                            <span className='un'><FaGoogle/></span>
                            <span className='deux'><FaFacebook/></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;