import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { get_orders } from '../../store/reducers/orderReducer';

const Orders = () => {
    const [state, setState] = useState('all')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { orderId } = useParams()
    const {userInfo} = useSelector(state => state.auth)
    const { myOrders } = useSelector(state => state.order)
    useEffect(() => {
        dispatch(get_orders({status:state, customerId:userInfo.id}))
    },[state])

    const redirect = (ord) => {
        let items = 0;
        for (let i = 0; i < ord.length; i++) {
            items = ord.products[i].quantity + items; 
        }
        navigate('/payment',{
            state: {
                price: ord.price,
                items,
                orderId: ord._id 
            }
        }) 
    }
    
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
                            {
                            myOrders.map((o,i) => <tr>
                                <td scope='row'>#{o._id}</td>
                                <td scope='row'>${o.price}</td>
                                <td scope='row'>{o.payment_status }</td>
                                <td scope='row'>{o.delivery_status}</td>
                                <td scope='row'>
                                    <Link to={`/dashboard/order/details/${o._id}`}><span>View</span></Link>
                                    {
                                      o.payment_status !== 'paid' && <span onClick={() => redirect(o)}>Pay Now</span> 
                                    }
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
                            )
                            } 
                
                        </tbody>
                
                </table>
        </div>
    </div>
    );
};

export default Orders;
