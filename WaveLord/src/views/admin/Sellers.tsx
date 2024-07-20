import React, { useEffect, useState } from 'react';
import '../../scss/admin/Sellers.scss';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import '../../scss/Pagination.scss';
import { FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { get_active_sellers } from '../../store/Reducers/sellerReducer';
import { RootState, AppDispatch } from '../../store';

const Sellers: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchValue, setSearchValue] = useState<string>('');
    const [parPage, setParPage] = useState<number>(5);
    const [show, setShow] = useState<boolean>(false);
    const { sellers, totalSeller } = useSelector((state: RootState) => state.seller);

    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage.toString()),
            page: parseInt(currentPage.toString()),
            searchValue
        };
        dispatch(get_active_sellers(obj));
    }, [dispatch, searchValue, currentPage, parPage]);

    return (
        <div className='largest-container'>
            <h1 className='title-seller'>Sellers</h1>
            <div className='second-container'>
                <div className="gauche">
                    <select onChange={(e) => setParPage(parseInt(e.target.value))}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option> 
                    </select>
                    <input onChange={e => setSearchValue(e.target.value)} value={searchValue} type="text" placeholder='search'/>
                </div>

                <div className='table-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Shop Name</th>
                                <th>Payment Status</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>District</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sellers.map((d, i) => (
                                <tr key={i}>
                                    <td scope='row'>{i + 1}</td>
                                    <td scope='row'>
                                        <img src={d.image} alt="" />
                                    </td>
                                    <td>{d.name}</td>
                                    <td>{d.shopInfo?.shopName}</td>
                                    <td>{d.payment}</td>
                                    <td>{d.email}</td>
                                    <td>{d.status}</td>
                                    <td>{d.shopInfo?.district}</td>
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

                {totalSeller > parPage && (
                    <Pagination 
                        pageNumber={currentPage}
                        setPageNumber={setCurrentPage}
                        totalItem={totalSeller}
                        parPage={parPage}
                        showItem={4}
                    />
                )}
            </div>
        </div>
    );
};

export default Sellers;
