import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import '../../scss/auth/register.scss';
import { useSelector, useDispatch } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { seller_register, messageClear } from '../../store/Reducers/authReducer';
import toast from 'react-hot-toast';
import { RootState, AppDispatch } from '../../store';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loader, successMessage, errorMessage } = useSelector((state: RootState) => state.auth);

    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    });

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(seller_register(state));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            navigate('/');
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch, navigate]);

    return (
        <>
            <div className="loginPage">
                <div className="body-Container">
                    <div className="login-image-container">
                        <h1>Wave Lord</h1>
                    </div>
                    <div className="loginForm">
                        <h2 className='header'>Registration !</h2>
                        <form onSubmit={submitHandler}>
                            <label htmlFor="name">Name</label>
                            <input
                                onChange={inputHandler}
                                value={state.name}
                                type="text"
                                placeholder="Name"
                                name='name'
                                id='name'
                                required
                            />
                            <label htmlFor="email">Email</label>
                            <input
                                onChange={inputHandler}
                                value={state.email}
                                type="email"
                                placeholder="Email"
                                name='email'
                                id='email'
                                required
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={inputHandler}
                                value={state.password}
                                type="password"
                                placeholder="Password"
                                name='password'
                                id='password'
                                required
                            />
                            <div className="policy">
                                <label htmlFor="checkbox" className='privacy'> I agree to privacy policy</label>
                                <input type="checkbox" name="checkbox" id="checkbox" required />
                            </div>
                            <button disabled={loader} type="submit">
                                {loader ? <PropagateLoader color='white' cssOverride={overrideStyle} /> : 'Sign up'}
                            </button>
                            <p>Already have an account?</p>
                            <Link to="/login">Sign In</Link>
                            <span className='or'>Or</span>
                            <div className='other-signup-buttons'>
                                <span className='un'><FaGoogle /></span>
                                <span className='deux'><FaFacebook /></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
