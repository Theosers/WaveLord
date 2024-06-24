import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { active_stripe_connect_account, messageClear } from '../store/Reducers/sellerReducer';
import { FadeLoader } from 'react-spinners';
import error from '../assets/error.png';
import success from '../assets/success.png';
import { RootState } from '../store';

const Success: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loader, successMessage, errorMessage } = useSelector((state: RootState) => state.seller);

  const queryParams = new URLSearchParams(window.location.search);
  const activeCode = queryParams.get('activeCode');

  useEffect(() => {
    if (activeCode) {
      dispatch(active_stripe_connect_account(activeCode));
    }
  }, [activeCode, dispatch]);

  const redirect = () => {
    dispatch(messageClear());
    navigate('/');
  };

  return (
    <div>
      {loader ? (
        <FadeLoader />
      ) : errorMessage ? (
        <>
          <img src={error} alt="Error" />
          <button onClick={redirect}>Back to Dashboard</button>
        </>
      ) : (
        successMessage && (
          <>
            <img src={success} alt="Success" />
            <button onClick={redirect}>Back to Dashboard</button>
          </>
        )
      )}
    </div>
  );
};

export default Success;
