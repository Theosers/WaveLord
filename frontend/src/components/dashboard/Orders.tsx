import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Orders = () => {
    const [state, setState] = useState('all')
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
