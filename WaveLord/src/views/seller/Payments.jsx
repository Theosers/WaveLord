import React, { forwardRef, useEffect } from 'react';
import { MdCurrencyExchange,MdProductionQuantityLimits } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6"; 
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom';
import '../../scss/seller/Payments.scss'

import { FixedSizeList as List} from "react-window";
import { get_seller_payment_details } from '../../store/Reducers/PaymentReducer';

import '../../scss/admin/PaymentRequest.scss'

function handleOnWheel({ deltaY }) {
    console.log('handleOnWheel', deltaY)
}

const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props} />
))

const Payments = () => {

    const dispatch = useDispatch()
    const {userInfo } = useSelector(state => state.auth)

    const Row = ({ index, style }) => {
        
        return (
            <div style={style} className="row-container">

                <div>{index + 1}</div>
                <div>$6528</div>
                <div>
                    <span>Pending</span>
                </div>
                <div>25 Dec 2023</div>
                
                

            </div>
        )
    }

     useEffect(() => {
        dispatch(get_seller_payment_details(userInfo._id))
    },[])

    return (
        <div className='admin-dashboard'>
            <div className='stats'>
            <div className='stat-card quatre'>
            <MdCurrencyExchange className='icon' />
            <div>
                <h3>$9483</h3>
                <p>Total Sales</p>
            </div>
            </div>
            <div className='stat-card deux'>
            <MdCurrencyExchange className='icon' />
            <div>
                <h3>$350</h3>
                <p>Available Amount</p>
            </div>
            </div>
            <div className='stat-card un'>
            <MdCurrencyExchange className='icon' />
            <div>
                <h3>$100</h3>
                <p>Withdrawal Amount</p>
            </div>
            </div>
            <div className='stat-card trois'>
            <MdCurrencyExchange className='icon' />
            <div>
                <h3>$0</h3>
                <p>Pending Amount</p>
            </div>
            </div>
            </div>

            <div className="main-content">
                <div className="SendPendingRequest">
                    <h3>Send Request</h3>
                    <form action="">
                        <input min="0" type="number" name="amount" />
                        <button>Submit</button>
                    </form>
                    <h3>Pending Request</h3>
                    <div>
                        <div className="title">
                            <div>N°</div>
                            <div>Amount</div>
                            <div>Status</div>
                            <div>Date</div>
                            
                        </div>

                        {
                            <List
                            style={{ minWidth : '340px'}}
                            className='List'
                            height={350}
                            itemCount={9}
                            itemSize={35}
                            outerElementType= {outerElementType}
                            >{Row}</List>
                        }

                    </div>

                </div>
                <div className="SuccessWithdraw">
                    <h3>Sucess Withdraw</h3>
                    <div>
                        <div className="title">
                            <div>N°</div>
                            <div>Amount</div>
                            <div>Status</div>
                            <div>Date</div>
                            
                        </div>

                        {
                            <List
                            style={{ minWidth : '340px'}}
                            className='List'
                            height={350}
                            itemCount={9}
                            itemSize={35}
                            outerElementType= {outerElementType}
                            >{Row}</List>
                        }

                    </div>
                </div>

            </div>
        </div>
    )
};

export default Payments
