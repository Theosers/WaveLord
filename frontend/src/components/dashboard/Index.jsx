import React from 'react';
import { RiShoppingCart2Fill } from "react-icons/ri";

const Index = () => {
    return (
        <div>
            <div>
                <div>
                    <div>
                        <span><RiShoppingCart2Fill /></span>
                    </div>
                    <div>
                        <h2>45</h2>
                        <span>Orders </span>
                    </div>     
                </div>
                <div>
                    <div>
                        <span><RiShoppingCart2Fill /></span>
                    </div>
                    <div>
                        <h2>25</h2>
                        <span>Pending Orders </span>
                    </div>     
                </div>
                <div>
                        <div>
                            <span><RiShoppingCart2Fill /></span>
                        </div>
                        <div>
                            <h2 className='text-3xl font-bold'>2</h2>
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
                        </tr>
                    </thead>
                </table>
                </div>
            </div>
            
        </div>
    );
};

export default Index;