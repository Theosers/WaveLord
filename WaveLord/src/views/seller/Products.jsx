import React from "react";
import { useState } from "react";
import Search from "../components/Search";
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import '../../scss/Pagination.scss'
import '../../scss/admin/Category.scss'
import {FaEdit, FaEye, FaTrash} from 'react-icons/fa'
import '../../scss/seller/Products.scss'

const Products = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);

    return (
        <div className='orders-container'>
            <div className='orders-box'>
            <h1 className="récupérerLeH1deCategory">All Products</h1>


            <Search setParPage={setParPage} setSearchValue={setSearchValue}
                    searchValue={searchValue}/>
            
            <div className='gauche-container'>
                    

                    <div className='table-container'>
                    <table>
                        <thead>
                        <tr>
                            <th>N°</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            [1,2,3,4,5].map((d, i) => (
                            <tr key={i}>
                                <td scope='row'>#{d}</td>
                                <td scope='row'>
                                    <img src="http://localhost:3000/src/assets/admin.jpeg" alt="" />
                                    
                                </td>
                    
                                <td>{d.payment_status}Men Full Sleeve</td>
                                <td>{d.payment_status}Tshirt</td>
                                <td>{d.payment_status}Veldo</td>
                                
                                <td>{d.payment_status}$864</td>
                                <td>{d.payment_status}10%</td>
                                <td>{d.payment_status}20</td>
                                <td>
                                    <div className='actions-container'>
                                        <Link to={`/seller/dashboard/edit-product/32`}> <FaEdit className='fa-action'/> </Link>
                                        <Link> <FaEye className='fa-action'/> </Link>
                                        <Link> <FaTrash className='fa-action'/> </Link>
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

export default Products;