import '../../scss/admin/SellerDetails.scss';
import React, { useEffect, useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get_seller, seller_status_update, messageClear } from '../../store/Reducers/sellerReducer';
import toast from 'react-hot-toast';
import { RootState, AppDispatch } from '../../store';

const SellerDetails: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { seller, successMessage } = useSelector((state: RootState) => state.seller);
    const { sellerId } = useParams<{ sellerId: string }>();

    useEffect(() => {
        if (sellerId) {
            dispatch(get_seller(sellerId));
        }
    }, [sellerId, dispatch]);

    const [status, setStatus] = useState<string>('');

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (sellerId) {
            dispatch(seller_status_update({
                sellerId,
                status
            }));
        }
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
    }, [successMessage, dispatch]);

    useEffect(() => {
        if (seller) {
            setStatus(seller.status);
        }
    }, [seller]);

    return (
        <>
            <h1 className='second-container'>Seller Details</h1>
            <div className='second-container'>
                <div className="inner-container">
                    <div className='triparte'>
                        <div className='triparte-1ersection'>
                            <div>
                                {seller?.image ? <img src="http://localhost:3000/src/assets/admin.jpeg" alt="" /> : <span>Image Not Uploaded </span>}
                            </div>
                        </div>
                        <div className='triparte-2emesection'>
                            <div>
                                <h2>Basic Info</h2>
                            </div>
                            <div>
                                <div>
                                    <span>Name : </span>
                                    <span>{seller?.name}</span>
                                </div>
                                <div>
                                    <span>Email : </span>
                                    <span>{seller?.email}</span>
                                </div>
                                <div>
                                    <span>Role : </span>
                                    <span>{seller?.role}</span>
                                </div>
                                <div>
                                    <span>Status : </span>
                                    <span>{seller?.status}</span>
                                </div>
                                <div>
                                    <span>Payment Status : </span>
                                    <span>{seller?.payment}</span>
                                </div>
                            </div>
                        </div>
                        <div className='triparte-3emesection'>
                            <div>
                                <h2>Address</h2>
                            </div>
                            <div>
                                <div>
                                    <span>Shop Name : </span>
                                    <span>{seller?.shopInfo?.shopName}</span>
                                </div>
                                <div>
                                    <span>Division : </span>
                                    <span>{seller?.shopInfo?.division}</span>
                                </div>
                                <div>
                                    <span>District : </span>
                                    <span>{seller?.shopInfo?.district}</span>
                                </div>
                                <div>
                                    <span>State : </span>
                                    <span>{seller?.shopInfo?.sub_district}</span>
                                </div>
                                <div>
                                    <span>Payment Status : </span>
                                    <span>{seller?.payment}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='submit-part'>
                        <form onSubmit={submit}>
                            <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                                <option value="">--Select Status--</option>
                                <option value="active">Active</option>
                                <option value="deactive">Deactive</option>
                            </select>
                            <button>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SellerDetails;
