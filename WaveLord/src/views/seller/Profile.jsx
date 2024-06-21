import React, { useEffect, useState } from 'react';
import '../../scss/seller/Profile.scss'
import { FaImages } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import { useDispatch, useSelector } from 'react-redux';
import { profile_image_upload,messageClear,profile_info_add } from '../../store/Reducers/authReducer'
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils'; 
import { create_stripe_connect_account } from '../../store/Reducers/sellerReducer';
import toast from 'react-hot-toast';

const Profile = () => {

    const [state, setState] =  useState({
        division: '',
        district: '',
        shopName: '',
        sub_district: '' 
    })

    const dispatch = useDispatch()
    const { userInfo,loader,successMessage } = useSelector(state => state.auth)

    const image = false

    const status = 'active' 

    useEffect(() => {

        if (successMessage) {
            toast.success(successMessage)
            messageClear() 
        } 
    },[successMessage])

    const add_image = (e) => {
        if (e.target.files.length > 0) { 
            const formData = new FormData()
            formData.append('image',e.target.files[0])
            dispatch(profile_image_upload(formData))
        }

    }

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const add = (e) => {
        e.preventDefault()
        dispatch(profile_info_add(state))
    }
// </form> !userInfo?.shopInfo ? <form onSubmit={add}>
    return (
        <div className="main-container">
            <form action=""> 
                <div className="profile-infos">
                    
                    {
                        userInfo?.image ? <img src={userInfo.image} alt=""  />
                              : <label htmlFor="img">
                                <span><FaImages/></span>
                                <span>Select Image</span>
                                {
                                    loader && <div>
                                        <span>
                                            <FadeLoader/>
                                        </span>
                                    </div>
                                }
                              </label>
                    } // onChange={add_image} sur un input


                    <div className="usual-infos">
                        <span><em>Name : </em>{userInfo.name}</span>
                        <span><em>Email : </em>{userInfo.email}</span>
                        <span><em>Role : </em>{userInfo.role}</span>
                        <span><em>Status : </em>{userInfo.status}</span>
                        <span><em>Payment Account : </em> <button>{userInfo.payment}</button></span>
                        {
                            userInfo.payment === 'active' ? <span><button>{userInfo.payment}</button></span>
                            : <span onClick={()=> dispatch(create_stripe_connect_account())}><button>Click Active</button></span>
                        } 









                        
                    </div>

                    <label placeholder="Shop Name" htmlFor="">Shop Name</label> // { userInfo.shopInfo?.shopName } et le reste 44.1
                    <input value={state.shopName} onChange={inputHandle} type="text" name='shopName' id='Shop' placeholder='Shop Name'/>
                    <label placeholder="Division Name" htmlFor="">Division Name</label>
                    <input value={state.division} onChange={inputHandle} type="text" />
                    <label placeholder="District Name" htmlFor="">District Name</label>
                    <input value={state.district} onChange={inputHandle} type="text" />

                    // il manque value={state.sub_district} onChange={inputHandle} dans l'input inexistant et le label associé

                </div>            

                <div className="change-password">
                    <h2>Change Password</h2>

                    
                        <label placeholder="Email" htmlFor="">Email</label>
                        <input type="text" />
                        <label placeholder="Old Password" htmlFor="">Password</label>
                        <input type="password" />
                        <label placeholder="New Password" htmlFor="">New Password</label>
                        <input type="password" />
                        <button>Save Changes</button> // mettre le bouton
                    

                </div>
            </form>

        </div>
    )
}

export default Profile;
