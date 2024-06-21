import React, { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List} from "react-window";
import { get_payment_request } from '../../store/Reducers/PaymentReducer';
import moment from 'moment';
import '../../scss/admin/PaymentRequest.scss'

function handleOnWheel({ deltaY }) {
    console.log('handleOnWheel', deltaY)
}

const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props} />
))

const PaymentRequest = () => {

    const dispatch = useDispatch()
    const {successMessage, errorMessage, pendingWithdrows } = useSelector(state => state.payment)

    useEffect(() => { 
        dispatch(get_payment_request())
    },[])

    const Row = ({ index, style }) => {
        
        return (
            <div style={style} className="row-container">

                <div>{index + 1}</div>
                <div>${pendingWithdrows[index]?.amount}</div>
                <div>
                    <span>{pendingWithdrows[index]?.status}</span>
                </div>
                <div>{moment(pendingWithdrows[index]?.createdAt).format('LL')}</div>
                <div>
                    <button>Confirm</button>
                </div>
                

            </div>
        )
    }







    return (
        <div className="out">
            <div className="container">
                <h2>Withdrawal Request</h2>

                <div>
                    <div>
                        <div className="title">
                            <div>N°</div>
                            <div>Amount</div>
                            <div>Status</div>
                            <div>Date</div>
                            <div> Action</div>
                            
                        </div>

                        {
                            <List
                            style={{ minWidth : '340px'}}
                            className='List'
                            height={350}
                            itemCount={pendingWithdrows.length}
                            itemSize={35}
                            outerElementType= {outerElementType}
                            >{Row}</List>
                        }

                    </div>
                </div>

            </div>
        </div>
    )
}

export default PaymentRequest;
