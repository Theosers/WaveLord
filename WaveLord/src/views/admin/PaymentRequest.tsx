import React, { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List } from "react-window";
import { confirm_payment_request, get_payment_request, messageClear } from '../../store/Reducers/PaymentReducer';
import moment from 'moment';
import toast from 'react-hot-toast';
import '../../scss/admin/PaymentRequest.scss';
import { RootState, AppDispatch } from '../../store';

interface RowProps {
    index: number;
    style: React.CSSProperties;
}

interface OuterElementProps {
    onWheel: (event: React.WheelEvent<HTMLDivElement>) => void;
}

function handleOnWheel(event: React.WheelEvent<HTMLDivElement>) {
    console.log('handleOnWheel', event.deltaY);
}

const OuterElementType = forwardRef<HTMLDivElement, OuterElementProps>((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequest: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { successMessage, errorMessage, pendingWithdrows, loader } = useSelector((state: RootState) => state.payment);
    const [paymentId, setPaymentId] = useState<string>('');

    useEffect(() => {
        dispatch(get_payment_request());
    }, [dispatch]);

    const confirm_request = (id: string) => {
        setPaymentId(id);
        dispatch(confirm_payment_request(id));
    };

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

    const Row: React.FC<RowProps> = ({ index, style }) => {
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
        );
    };

    return (
        <div className="out">
            <div className="container">
                <h2>Withdrawal Request</h2>
                <div className='inner-content'>
                    <div>
                        <div className="title">
                            <div>N°</div>
                            <div>Amount</div>
                            <div>Status</div>
                            <div>Date</div>
                            <div>Action</div>
                        </div>
                        <List
                            style={{ minWidth: '340px' }}
                            className='List'
                            height={350}
                            itemCount={pendingWithdrows.length}
                            itemSize={35}
                            outerElementType={OuterElementType}
                        >
                            {Row}
                        </List>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentRequest;
