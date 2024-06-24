import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuArrowDownSquare } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';

import Pagination from '../Pagination';
import { get_admin_orders } from '../../store/Reducers/OrderReducer';
import { RootState, AppDispatch } from '../../store';

import '../../scss/admin/Orders.scss';
import '../../scss/Pagination.scss';

const Orders: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);
    const [show, setShow] = useState<string | null>(null);

    const { myOrders, totalOrder } = useSelector((state: RootState) => state.order);

    useEffect(() => {
        const obj = {
            parPage,
            page: currentPage,
            searchValue
        };
        dispatch(get_admin_orders(obj));
    }, [searchValue, currentPage, parPage, dispatch]);

    return (
        <div className='orders-container'>
            <div className='orders-box'>
                <div className='controls'>
                    <select onChange={(e) => setParPage(parseInt(e.target.value))}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                    <input onChange={e => setSearchValue(e.target.value)} value={searchValue} type="text" placeholder='search' />
                </div>

                <div className='recent-orders'>
                    <div className='recent-orders-header'>
                        <h2>Recent Orders</h2>
                        <Link to="#">View All</Link>
                    </div>

                    <div className='table-container'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Order Id</th>
                                    <th>Price</th>
                                    <th>Payment Status</th>
                                    <th>Order Status</th>
                                    <th>Action</th>
                                    <th><LuArrowDownSquare /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {myOrders.map((o, i) => (
                                    <React.Fragment key={i}>
                                        <tr>
                                            <td>#{o._id}</td>
                                            <td>${o.price}</td>
                                            <td>{o.payment_status}</td>
                                            <td>{o.delivery_status}</td>
                                            <td>
                                                <Link to={`/admin/dashboard/order/details/${o._id}`}>View</Link>
                                            </td>
                                            <td onClick={() => setShow(show === o._id ? null : o._id)}><LuArrowDownSquare /></td>
                                        </tr>
                                        {show === o._id && o.suborder.map((so, j) => (
                                            <tr key={j} className="suborder-row">
                                                <td>#{so._id}</td>
                                                <td>${so.price}</td>
                                                <td>{so.payment_status}</td>
                                                <td>{so.delivery_status}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {totalOrder > parPage && (
                        <Pagination
                            pageNumber={currentPage}
                            setPageNumber={setCurrentPage}
                            totalItem={totalOrder}
                            parPage={parPage}
                            showItem={4}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;
