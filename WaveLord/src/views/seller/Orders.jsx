import React from "react";
import { useState } from "react";
import Search from "../components/Search";
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import '../../scss/Pagination.scss'
import '../../scss/admin/Category.scss'
import {FaEdit, FaEye, FaTrash} from 'react-icons/fa'
import '../../scss/seller/Orders.scss'

const Orders = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);

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
                            [1,2,3,4,5].map((d, i) => (
                            <tr key={i}>
                                                    
                                <td>{d.payment_status}#1559</td>
                                <td>{d.payment_status}$467</td>
                                <td>{d.payment_status}Pending</td>
                                
                                <td>{d.payment_status}Pending</td>
                                <td>
                                    <div className='actions-container'>
                                        <Link to= {`/seller/dashboard/order/details/34`}> <FaEye className='fa-action'/> </Link>
                                    </div>
                                </td>
                            </tr>
                            
                            ))
                        }
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
    )
}

export default Orders;