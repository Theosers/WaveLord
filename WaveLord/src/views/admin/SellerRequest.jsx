import { useState } from 'react';
import '../../scss/admin/SellersRequest.scss'
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import '../../scss/Pagination.scss'
import {FaEdit, FaEye, FaImage, FaTrash} from 'react-icons/fa'



const SellerRequest = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);
    const [show, setShow] =  useState(false);


    return (
        <div className='largest-container'>
            
                <h1 className='second-container'>Seller Request</h1>
            
            <div className='second-container'>
                <div className="gauche">
                    <select onChange={(e) => setParPage(parseInt(e.target.value))}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option> 
                        </select>
                    <input type="text" placeholder='search'/>
                </div>




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