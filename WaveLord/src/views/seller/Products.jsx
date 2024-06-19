import React, { useEffect, useState } from 'react';
import Search from "../components/Search";
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import '../../scss/Pagination.scss'
import '../../scss/admin/Category.scss'
import {FaEdit, FaEye, FaTrash} from 'react-icons/fa'
import '../../scss/seller/Products.scss'

import { useDispatch, useSelector } from 'react-redux';
import { get_products } from '../../store/Reducers/productReducer';

const Products = () => {

    const dispatch = useDispatch()
    const { products,totalProduct} = useSelector(state=> state.product)

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);

     useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_products(obj))

    },[searchValue, currentPage,parPage])

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
                            products.map((d, i) => (
                            <tr key={i}>
                                <td scope='row'>{i + 1}</td>
                                <td scope='row'>
                                    <img src= {d.images[0]} alt="" />
                                    
                                </td>
                    
                                <td>{ d?.name?.slice(0,15)}...</td>
                                <td>{ d.category }</td>
                                <td>{d.brand}</td>
                                
                                <td>${d.price}</td>
                                <td>
                                {
                                    d.discount === 0 ? <span>No Discount</span> : 
            
                                    <span>%{d.discount}</span>
                                }
                                </td>
                                <td>{d.stock}</td>
                                <td>
                                    <div className='actions-container'>
                                        <Link to={`/seller/dashboard/edit-product/${d._id}`}> <FaEdit className='fa-action'/> </Link>
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
                        //rajouter un div qui contiendra la pagination
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
