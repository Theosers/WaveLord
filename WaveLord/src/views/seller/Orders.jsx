import React, { useEffect, useState } from 'react';
import Search from "../components/Search";
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import '../../scss/Pagination.scss'
import '../../scss/admin/Category.scss'
import {FaEdit, FaEye, FaTrash} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
//import { get_seller_orders } from '../../store/Reducers/OrderReducer';
import '../../scss/seller/Orders.scss'

const Orders = () => {

    const dispatch = useDispatch()

    const {myOrders,totalOrder } = useSelector(state => state.order)
    const {userInfo } = useSelector(state => state.auth)

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);

    useEffect(() => {
     //   const obj = {
     //       parPage: parseInt(parPage),
     //       page: parseInt(currentPage),
     //       searchValue,
     //       sellerId: userInfo._id
     //   }
        //dispatch(get_seller_orders(obj))
    },[searchValue,currentPage,parPage])

    return (
        <div className='orders-container'>
            <div className='orders-box'>
            <h1 className="récupérerLeH1deCategory">Orders</h1>


            <Search setParPage={setParPage} setSearchValue={setSearchValue}
                    searchValue={searchValue}/>
            
            <div className='gauche-container'>
                    

                    <div className='table-container'>
                    <table>
                        <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Price</th>
                            <th>Payment Status</th>
                            <th>Order Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            myOrders.map((d, i) => <tr key={i}>

                                <td scope='row'>#{d._id}</td>
                                <td scope='row'>${d.price}</td>
                                <td scope='row'>{d.payment_status} </td>
                                <td scope='row'>{d.delivery_status}</td> 
                                <td scope='row'>{d.date}</td> 
                                <td>
                                    <div className='actions-container'>
                                        <Link to={`/seller/dashboard/order/details/${d._id}`}> <FaEye className='fa-action'/> </Link>
                                    </div>
                                </td>
                            </tr>
                            
                            )
                        }
                        </tbody>
                    </table>
                        </div>
                        

                            {
                                totalOrder <= parPage ? "" : <Pagination
                                                            pageNumber= {currentPage}
                                                            setPageNumber= {setCurrentPage}
                                                            totalItem= {totalOrder}
                                                            parPage= {parPage}
                                                            showItem= {3}/>
                            }
                </div>

            </div>
        </div>
    )

}
export default Orders;
