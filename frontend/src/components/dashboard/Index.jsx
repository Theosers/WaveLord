import React, { useEffect } from 'react';
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { get_dashboard_index_data } from '../../store/reducers/dashboardReducer';

const Index = () => {

    const dispatch = useDispatch()
    //const {userInfo} = useSelector(state => state.auth)
    const {recentOrders,totalOrder,pendingOrder,cancelledOrder} = useSelector(state => state.dashboard)
    useEffect(() => {
        dispatch(get_dashboard_index_data(userInfo.id))
    },[])
    
    return (
        <div>
            <div>
                <div>
                    <div>
                        <span><RiShoppingCart2Fill /></span>
                    </div>
                    <div>
                        <h2>{totalOrder}5</h2>
                        <span>Orders </span>
                    </div>     
                </div>
                <div>
                    <div>
                        <span><RiShoppingCart2Fill /></span>
                    </div>
                    <div>
                        <h2>{pendingOrder}</h2>
                        <span>Pending Orders </span>
                    </div>     
                </div>
                <div>
                        <div>
                            <span><RiShoppingCart2Fill /></span>
                        </div>
                        <div>
                            <h2 className='text-3xl font-bold'>{cancelledOrder}</h2>
                            <span>Cancelled Orders </span>
                        </div>     
                </div> 
            </div>
            <div>
                <h2>Recent Orders</h2>
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
                        {
                        recentOrders.map((o,i) => <tr>
                            <td scope='row'>#{o._id}</td>
                            <td scope='row'>${o.price}</td>
                            <td scope='row'>{o.payment_status }</td>
                            <td scope='row'>{o.delivery_status}</td>
                            <td scope='row'>
                                <Link><span>View</span></Link>
            
                                <Link><span>Pay Now</span></Link> 
                            </td> 
                        </tr>
            
                        <tr>
                            <td scope='row'>#{o._id}</td>
                            <td scope='row'>$233</td>
                            <td scope='row'>pending</td>
                            <td scope='row'>pending</td>
                            <td scope='row'>
                                <Link><span>View</span></Link>
                                <Link><span>Pay Now</span></Link> 
                            </td> 
                        </tr>
                        )
                        }
                    </tbody>
                </table>
                </div>
            </div>
            
        </div>
    );
};

export default Index;
