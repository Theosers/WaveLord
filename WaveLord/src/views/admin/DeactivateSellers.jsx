import React, { useEffect, useState } from 'react';
import '../../scss/admin/DeactiveSellers.scss'
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import '../../scss/Pagination.scss'
import {FaEdit, FaEye, FaImage, FaTrash} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { get_deactive_sellers } from '../../store/Reducers/sellerReducer';


const DeactivateSellers = () => {

    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);
    const [show, setShow] =  useState(false);


    const {sellers,totalSeller } = useSelector(state => state.seller)


    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_deactive_sellers(obj))
    },[searchValue,currentPage,parPage])


    return (
        <div className='largest-container'>
            
                <h1 className='second-container'>Deactivate Sellers</h1>
            
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
                            <th scope='col' >Email</th> 
                            <th scope='col'>Status</th> 
                            <th scope='col'>District</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            sellers.map((d, i) => (
                            <tr key={i}>
                                <td scope='row'>#{d.id}</td>
                                <td scope='row'>
                                    <img src={ d.image } alt="" />
                                    
                                </td>
                    
                                <td>{ d.name }</td>
                                <td>{ d.shopInfo?.shopName }</td>
                                <td><span>{ d.payment }</span> </td>
                                <td>{ d.email }</td>
                                <td>{ d.status } </td>
                                <td scope='row'>{ d.shopInfo?.district } </td>
                                
                                <td>
                                    <div className='actions-container'>
                                        <Link to={`/admin/dashboard/seller/details/${d._id}`}> <FaEye className='fa-action'/> </Link>
                                        
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
    )
}

export default DeactivateSellers;
