import React, { useEffect, useState } from 'react'; 
import '../../scss/admin/SellersRequest.scss'
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import '../../scss/Pagination.scss'
import {FaEdit, FaEye, FaImage, FaTrash} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import Search from '../components/Search';
import { get_seller_request } from '../../store//Reducers/sellerReducer';



const SellerRequest = () => {

    const dispatch = useDispatch()
    const {sellers,totalSeller} = useSelector(state=> state.seller)

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);
    const [show, setShow] =  useState(false);

    useEffect(() => {
        dispatch(get_seller_request({
            parPage,
            searchValue,
            page: currentPage
        }))

    },[parPage,searchValue,currentPage])


    return (
        <div className='largest-container'>
            
                <h1 className='second-container'>Seller Request</h1>
            
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
                        {
                            [1,2,3,4,5].map((d, i) => (
                            <tr key={i}>
                                <td scope='row'>#{d}</td>
                                
                    
                                <td>{d.payment_status}Tshirt</td>
                                <td>SurfShop.other.email@gmail.com</td>
                                <td>Inactive</td>
                                <td>Pending</td>
                               
                                
                                <td>
                                    <div className='actions-container'>
                                        <Link to={'/admin/dashboard/seller/details/2'}> <FaEye className='fa-action'/> </Link>
                                        
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

export default SellerRequest;
