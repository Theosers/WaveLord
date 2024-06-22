import React, { useEffect, useState } from 'react';import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6"; 
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { customer_register,messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';


const Register = () => {

    const {loader,errorMessage,successMessage } = useSelector(state => state.auth)

    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })
    const dispatch = useDispatch()

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const register = (e) => {
        e.preventDefault()
        console.log(state)
        dispatch(customer_register(state))
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

export default Register;
