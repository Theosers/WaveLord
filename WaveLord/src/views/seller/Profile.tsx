import React, { useEffect, useState } from 'react';
import '../../scss/seller/Profile.scss';
import { FaImages } from "react-icons/fa";
import { FadeLoader, PropagateLoader } from "react-spinners";
import { useDispatch, useSelector } from 'react-redux';
import { profile_image_upload, messageClear, profile_info_add } from '../../store/Reducers/authReducer';
import { create_stripe_connect_account } from '../../store/Reducers/sellerReducer';
import toast from 'react-hot-toast';
import { RootState, AppDispatch } from '../../store';
import { overrideStyle } from '../../utils/utils';

interface State {
  division: string;
  district: string;
  shopName: string;
  sub_district: string;
}

const Profile: React.FC = () => {
  const [state, setState] = useState<State>({
    division: '',
    district: '',
    shopName: '',
    sub_district: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  const { userInfo, loader, successMessage } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, dispatch]);

  const add_image = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      dispatch(profile_image_upload(formData));
    }
  };

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const add = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(profile_info_add(state));
  };

  return (
    <div className="main-container">
      <form onSubmit={add}>
        <div className="profile-infos">
          {userInfo?.image ? (
            <img src={userInfo.image} alt="" />
          ) : (
            <label htmlFor="img">
              <span><FaImages /></span>
              <span>Select Image</span>
              {loader && (
                <div>
                  <span>
                    <FadeLoader />
                  </span>
                </div>
              )}
              <input type="file" id="img" onChange={add_image} />
            </label>
          )}

          <div className="usual-infos">
            <span><em>Name : </em>{userInfo?.name}</span>
            <span><em>Email : </em>{userInfo?.email}</span>
            <span><em>Role : </em>{userInfo?.role}</span>
            <span><em>Status : </em>{userInfo?.status}</span>
            <span><em>Payment Account : </em></span>
            {userInfo?.payment === 'active' ? (
              <span><button>{userInfo.payment}</button></span>
            ) : (
              <span onClick={() => dispatch(create_stripe_connect_account())}><button>Click Active</button></span>
            )}
          </div>

          <label htmlFor="shopName">Shop Name</label>
          <input
            value={state.shopName}
            onChange={inputHandle}
            type="text"
            name='shopName'
            id='shopName'
            placeholder='Shop Name'
          />
          <label htmlFor="division">Division Name</label>
          <input
            value={state.division}
            onChange={inputHandle}
            type="text"
            name='division'
            id='division'
            placeholder='Division Name'
          />
          <label htmlFor="district">District Name</label>
          <input
            value={state.district}
            onChange={inputHandle}
            type="text"
            name='district'
            id='district'
            placeholder='District Name'
          />
          <label htmlFor="sub_district">Sub District</label>
          <input
            value={state.sub_district}
            onChange={inputHandle}
            type="text"
            name='sub_district'
            id='sub_district'
            placeholder='Sub District'
          />
        </div>

        <div className="change-password">
          <h2>Change Password</h2>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" placeholder="Email" />
          <label htmlFor="oldPassword">Old Password</label>
          <input type="password" id="oldPassword" name="oldPassword" placeholder="Old Password" />
          <label htmlFor="newPassword">New Password</label>
          <input type="password" id="newPassword" name="newPassword" placeholder="New Password" />
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
