import React, { forwardRef, useEffect, useState, ForwardedRef, ChangeEvent, FormEvent } from 'react';
import { MdCurrencyExchange } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import moment from 'moment';
import toast from 'react-hot-toast';
import { get_seller_payment_details, messageClear, send_withdrowal_request } from '../../store/Reducers/PaymentReducer';
import '../../scss/seller/Payments.scss';
import '../../scss/admin/PaymentRequest.scss';
import { RootState, AppDispatch } from '../../store'; // Adjust the path to your store

function handleOnWheel({ deltaY }: { deltaY: number }) {
  console.log('handleOnWheel', deltaY);
}

const outerElementType = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const Payments: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const {
    successMessage,
    errorMessage,
    loader,
    pendingWithdrows,
    successWithdrows,
    totalAmount,
    withdrowAmount,
    pendingAmount,
    availableAmount,
  } = useSelector((state: RootState) => state.payment);

  const [amount, setAmount] = useState<number>(0);

  const sendRequest = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (availableAmount - amount > 10) {
      if (userInfo && userInfo._id) {
        dispatch(send_withdrowal_request({ amount, sellerId: userInfo._id }));
        setAmount(0);
      }
    } else {
      toast.error('Insufficient Balance');
    }
  };

  const Row: React.FC<ListChildComponentProps> = ({ index, style }) => (
    <div style={style} className="row-container">
      <div>{index + 1}</div>
      <div>${pendingWithdrows[index]?.amount}</div>
      <div>
        <span>{pendingWithdrows[index]?.status}</span>
      </div>
      <div>25 Dec 2023</div>
    </div>
  );

  const Rows: React.FC<ListChildComponentProps> = ({ index, style }) => (
    <div style={style} className="row-container">
      <div>{index + 1}</div>
      <div>${successWithdrows[index]?.amount}</div>
      <div>
        <span>{successWithdrows[index]?.status}</span>
      </div>
      <div>{moment(successWithdrows[index]?.createdAt).format('LL')}</div>
    </div>
  );

  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(get_seller_payment_details(userInfo._id));
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <div className='admin-dashboard'>
      <div className='stats'>
        <div className='stat-card quatre'>
          <MdCurrencyExchange className='icon' />
          <div>
            <h3>${totalAmount}</h3>
            <p>Total Sales</p>
          </div>
        </div>
        <div className='stat-card deux'>
          <MdCurrencyExchange className='icon' />
          <div>
            <h3>${availableAmount}</h3>
            <p>Available Amount</p>
          </div>
        </div>
        <div className='stat-card un'>
          <MdCurrencyExchange className='icon' />
          <div>
            <h3>${withdrowAmount}</h3>
            <p>Withdrawal Amount</p>
          </div>
        </div>
        <div className='stat-card trois'>
          <MdCurrencyExchange className='icon' />
          <div>
            <h3>${pendingAmount}</h3>
            <p>Pending Amount</p>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="SendPendingRequest">
          <h3>Send Request</h3>
          <form onSubmit={sendRequest}>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target.value))}
              value={amount}
              min="0"
              type="number"
              name="amount"
            />
            <button disabled={loader}>{loader ? 'loading..' : 'Submit'}</button>
          </form>
          <h3>Pending Request</h3>
          <div>
            <div className="title">
              <div>N°</div>
              <div>Amount</div>
              <div>Status</div>
              <div>Date</div>
            </div>

            <List
              style={{ minWidth: '340px' }}
              className='List'
              height={350}
              width={400} // Add the width property
              itemCount={pendingWithdrows.length}
              itemSize={35}
              outerElementType={outerElementType}
            >
              {Row}
            </List>
          </div>
        </div>
        <div className="Success_Withdraw">
          <h3>Success Withdraw</h3>
          <div>
            <div className="title">
              <div>N°</div>
              <div>Amount</div>
              <div>Status</div>
              <div>Date</div>
            </div>

            <List
              style={{ minWidth: '340px' }}
              className='List'
              height={350}
              width={400} // Add the width property
              itemCount={successWithdrows.length}
              itemSize={35}
              outerElementType={outerElementType}
            >
              {Rows}
            </List>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
