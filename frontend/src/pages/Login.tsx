import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6"; 
import { Link } from 'react-router-dom';

const Login = () => {

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
        console.log(state)
    }


    return (
        <div>
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