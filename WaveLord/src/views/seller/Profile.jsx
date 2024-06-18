import React from "react";
import '../../scss/seller/Profile.scss'
import { FaImages } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import { useDispatch, useSelector } from 'react-redux';
import { profile_image_upload } from '../../store/Reducers/authReducer'

const Profile = () => {

    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)

    const image = false
    const loader = true

    const status = 'active' 

    const add_image = (e) => {
        if (e.target.files.length > 0) { 
            const formData = new FormData()
            formData.append('image',e.target.files[0])
            dispatch(profile_image_upload(formData))
        }

    }

    return (
        <div className="main-container">
            <form action=""> // !userInfo?.shopInfo ? <form>
                <div className="profile-infos">
                    
                    {
                        image?.image ? <img src="http://localhost:3000/src/assets/admin.jpeg" alt=""  />
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
                    </div>

                    <label placeholder="Shop Name" htmlFor="">Shop Name</label>
                    <input type="text" />
                    <label placeholder="Division Name" htmlFor="">Division Name</label>
                    <input type="text" />
                    <label placeholder="District Name" htmlFor="">District Name</label>
                    <input type="text" />

                </div>            

                <div className="change-password">
                    <h2>Change Password</h2>

                    
                        <label placeholder="Email" htmlFor="">Email</label>
                        <input type="text" />
                        <label placeholder="Old Password" htmlFor="">Password</label>
                        <input type="password" />
                        <label placeholder="New Password" htmlFor="">New Password</label>
                        <input type="password" />
                        <button>Save Changes</button>
                    

                </div>
            </form>

        </div>
    )
}

export default Profile;
