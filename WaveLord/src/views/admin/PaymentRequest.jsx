import React, { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List} from "react-window";
import { confirm_payment_request, get_payment_request,messageClear } from '../../store/Reducers/PaymentReducer';
import moment from 'moment';
import toast from 'react-hot-toast';
import '../../scss/admin/PaymentRequest.scss'

function handleOnWheel({ deltaY }) {
    console.log('handleOnWheel', deltaY)
}

const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props} />
))

const PaymentRequest = () => {

    const dispatch = useDispatch()
    
    const {successMessage, errorMessage, pendingWithdrows,loader } = useSelector(state => state.payment)
    const [paymentId, setPaymentId] = useState('')

    console.log(successMessage, errorMessage, pendingWithdrows,loader)

    useEffect(() => { 
        dispatch(get_payment_request())
    },[])

    const confirm_request = (id) => {
        setPaymentId(id)
        dispatch(confirm_payment_request(id))
    }

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    },[successMessage,errorMessage])
    
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
                    <button disabled={loader} onClick={() => confirm_request(pendingWithdrows[index]?._id)}>
                        {(loader && paymentId === pendingWithdrows[index]?._id) ? 'loading..' : 'Confirm'}
                    </button>
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
