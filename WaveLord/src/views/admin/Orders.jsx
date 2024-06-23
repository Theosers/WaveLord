import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuArrowDownSquare } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';

import Pagination from '../Pagination';
import { get_admin_orders } from '../../store/Reducers/OrderReducer';

import '../../scss/admin/Orders.scss';
import '../../scss/Pagination.scss'

const Orders = () => {

    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);
    const [show, setShow] =  useState(false);

    const {myOrders,totalOrder } = useSelector(state => state.order)

    console.log('myOrders',myOrders,totalOrder)
    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_admin_orders(obj))
    },[searchValue,currentPage,parPage])

    console.log('myOrders',myOrders,totalOrder)
    return (
        <div className='orders-container'>
            <div className='orders-box'>
                <div className='controls'>
                    <select onChange={(e) => setParPage(parseInt(e.target.value))}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option> 
                    </select>
                    <input onChange={e => setSearchValue(e.target.value)} value={searchValue} type="text" placeholder='search'/>

                </div>


                <div className='recent-orders'>
            <div className='recent-orders-header'>
              <h2>Recent Orders</h2>
              <Link>View All</Link>
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
                    <th ><LuArrowDownSquare /></th>
                  </tr>
                </thead>
                <tbody >
                  {
                    myOrders.map((o,i) =>
                      <tr key={i}>
                        <td>#{o._id}</td>
                        <td>${o.price}</td>
                        <td>{o.payment_status}</td>
                        <td>{o.delivery_status}</td>
                        <td>
                          <Link to={`/admin/dashboard/order/details/${o._id}`}>View</Link>
                        </td>
                        <td onClick={(e) => setShow(o._id)}><LuArrowDownSquare/> </td>


                        {
                          o.suborder.map((so, i) => (
                            <tr key={i} style = {show ? {backgroundColor:'red'} : {display:'none'}}>
                              <td>#{so._id}</td>
                              <td>${so.price}</td>
                              <td>{so.payment_status}Pending</td>
                              <td>{so.delivery_status}</td>
                              <td></td>
                              <td></td>
                            </tr>
                            
                          ))
                        }

                      </tr>
                      
                    )
                  }

                </tbody>
   
              </table>
            </div>
            
            
         {
                totalOrder <= parPage ? "" : <Pagination 
                    pageNumber = {currentPage}
                    setPageNumber = {setCurrentPage}
                    totalItem = {totalOrder}
                    parPage = {parPage}
                    showItem = {4}
                />
               
            }

          </div>



            </div>
        </div>
    );
};

export default Orders;
