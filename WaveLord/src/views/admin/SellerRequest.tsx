import React, { useEffect, useState } from 'react'; 
import '../../scss/admin/SellersRequest.scss'
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import '../../scss/Pagination.scss';
import { FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../components/Search';
import { get_seller_request } from '../../store/Reducers/sellerReducer';
import { RootState, AppDispatch } from '../../store';

const SellerRequest: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { sellers, totalSeller } = useSelector((state: RootState) => state.seller);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchValue, setSearchValue] = useState<string>('');
    const [parPage, setParPage] = useState<number>(5);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        dispatch(get_seller_request({
            parPage,
            searchValue,
            page: currentPage
        }));
    }, [dispatch, parPage, searchValue, currentPage]);

    return (
        <div className='largest-container'>
            <h1 className='title-seller'>Seller Request</h1>
            <div className='second-container'>
                <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />

                <div className='table-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Payment Status</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sellers.map((d, i) => (
                                <tr key={i}>
                                    <td scope='row'>{i + 1}</td>
                                    <td>{d.name}</td>
                                    <td>{d.email}</td>
                                    <td>{d.payment}</td>
                                    <td>{d.status}</td>
                                    <td>
                                        <div className='actions-container'>
                                            <Link to={`/admin/dashboard/seller/details/${d._id}`}>
                                                <FaEye className='fa-action' />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    pageNumber={currentPage}
                    setPageNumber={setCurrentPage}
                    totalItem={totalSeller}
                    parPage={parPage}
                    showItem={3}
                />
            </div>
        </div>
    );
};

export default SellerRequest;
