import React from 'react';
import { useState } from 'react';
import '../../scss/Orders.scss';
import '../../scss/AdminDashboard.scss';
import { Link } from 'react-router-dom';
import { LuArrowDownSquare } from 'react-icons/lu';
import Pagination from '../Pagination';

const Orders = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);
    const [show, setShow] =  useState(false);

    return (
        <div className='container'>
            <div className='box'>
                <div className='controls'>
                    <select onChange={(e) => setParPage(parseInt(e.target.value))}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option> 
                    </select>
                    <input type="text" placeholder='search'/>

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
                    <th >download</th>
                  </tr>
                </thead>
                <tbody >
                  {
                    [1,2,3,4,5,6,7,8,9,10].map((d, i) => (
                      <tr key={i}>
                        <td>#{d._id}123456789</td>
                        <td>${d.price}6784</td>
                        <td>{d.payment_status}Pending</td>
                        <td>{d.delivery_status}Pending</td>
                        <td>
                          <Link to={`/admin/dashboard/order/details/${d._id}`}>View</Link>
                        </td>
                        <td onClick={(e) => setShow(!show)}><LuArrowDownSquare/> </td>
                      </tr>
                      
                    ))
                  }

                </tbody>
                <tbody style = {show ? {backgroundColor:'red'} : {display:'none'}}>
                    {
                    [1,2,3].map((d, i) => (
                      <tr key={i}>
                        <td>#{d._id}123456789</td>
                        <td>${d.price}6784</td>
                        <td>{d.payment_status}Pending</td>
                        <td>{d.delivery_status}Pending</td>
                        <td></td>
                        <td></td>
                      </tr>
                      
                    ))
                  }
                </tbody>

            <tbody  >
                  
                   
            </tbody>




              </table>
            </div>
            
            
             
          <Pagination
            pageNumber= {currentPage}
            setPageNumber= {setCurrentPage}
            totalItem= {50}
            parPage= {parPage}
            showItem= {3}
          />

          </div>



            </div>
        </div>
    );
};

export default Orders;