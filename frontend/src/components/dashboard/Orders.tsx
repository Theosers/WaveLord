import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { get_orders } from '../../store/reducers/orderReducer';

const Orders = () => {
    const [state, setState] = useState('all')

    const dispatch = useDispatch()
    const { orderId } = useParams()
    const {userInfo} = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(get_orders({status:state, customerId:userInfo.id}))
    },[orderId])
    
    return (
        <div>
            <div>
                <h2>My Orders </h2>
                <select value={state} onChange={(e) => setState(e.target.value)} >
                    <option value="all">--ordre status--</option>
                    <option value="placed">Placed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="warehouse">Warehouse</option>
                </select> 
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th scope='col'>Order Id</th>
                            <th scope='col'>Price</th>
                            <th scope='col'>Payment Status</th>
                            <th scope='col'>Order Status</th>
                            <th scope='col'>Action</th> 
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td scope='row'>#344</td>
                                <td scope='row'>$233</td>
                                <td scope='row'>pending</td>
                                <td scope='row'>pending</td>
                                <td scope='row'>
                                    <Link><span>View</span></Link>
                                    <Link><span>Pay Now</span></Link> 
                                </td> 
                            </tr>
                
                            <tr>
                                <td scope='row'>#344</td>
                                <td scope='row'>$233</td>
                                <td scope='row'>pending</td>
                                <td scope='row'>pending</td>
                                <td scope='row'>
                
                                    <Link><span>View</span></Link>
                                    <Link><span>Pay Now</span></Link> 
                                </td> 
                            </tr>
                
                        </tbody>
                
                </table>
        </div>
    </div>
    );
};

export default Orders;
