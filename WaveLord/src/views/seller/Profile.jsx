import React from "react";
import '../../scss/seller/Profile.scss'
import { FaImages } from "react-icons/fa";
import { FadeLoader } from "react-spinners";

const Profile = () => {

    const image = false
    const loader = true

    return (
        <div className="main-container">
            <form action="">
                <div className="profile-infos">
                    

                    {
                        image ? <img src="http://localhost:3000/src/assets/admin.jpeg" alt=""  />
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
                    }


                    <div className="usual-infos">
                        <span><em>Name : </em>Théo Spartacus</span>
                        <span><em>Email : </em>seller@gmail.com</span>
                        <span><em>Role : </em>Seller</span>
                        <span><em>Status : </em>Active</span>
                        <span><em>Payment Account : </em> <button>Pending</button></span>
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