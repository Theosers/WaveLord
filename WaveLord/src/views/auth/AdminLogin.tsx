import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import '../../scss/auth/adminLogin.scss';
import { Link, useNavigate } from 'react-router-dom';
import { admin_login, messageClear } from '../../store/Reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { RootState, AppDispatch } from '../../store';

const AdminLogin: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loader, errorMessage, successMessage } = useSelector((state: RootState) => state.auth);

    const [state, setState] = useState({
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
        dispatch(admin_login(state));
    };

    const overrideStyle: React.CSSProperties = {
        display: 'flex',
        margin: '0 auto',
        height: '24px',
        justifyContent: 'center',
        alignItems: 'center'
    };

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            navigate('/');
        }
    }, [errorMessage, successMessage, dispatch, navigate]);

    return (
        <>
            <div className="loginPage">
                <div className="body-Container">
                    <div className="login-image-container">
                        <h1>Wave Lord</h1>
                    </div>
                    <div className="loginForm">
                        <div className='admin-login'>
                            <span>Admin</span>
                            <div className="logo-image"></div>
                        </div>
                        <h2>Welcome Back!</h2>
                        <form onSubmit={submitHandler}>
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
                            <button disabled={loader} type="submit">
                                {loader ? <PropagateLoader color='white' cssOverride={overrideStyle} /> : 'Login'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;
