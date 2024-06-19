import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6"; 
import { Link } from 'react-router-dom';


const Register = () => {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const register = (e) => {
        e.preventDefault()
        console.log(state)
    }


    return (
        <div>
            <Header/>
            <div>
                <div>
                    <h2>Register </h2>
                </div>
                <div>
                    <form onSubmit={register}>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input onChange={inputHandle} value={state.name} type="text" name="name" id="name" placeholder='Name' required />
                        </div>

                        <div>
                            <label htmlFor="email">Email</label>
                            <input onChange={inputHandle} value={state.email} type="email" name="email" id="email" placeholder='Email' required />
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <input onChange={inputHandle} value={state.password} type="password" name="password" id="password" placeholder='Password' required />
                        </div>

                        <button>Register</button>
                    </form>



                    <div>
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
                        <p>You Have No Account? <Link to='/login'> Login</Link> </p>
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

export default Register;