import React, { useEffect } from 'react';
import { MdCurrencyExchange,MdProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6"; 
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { get_admin_dashboard_data } from '../../store/Reducers/dashboardReducer';
import '../../scss/admin/AdminDashboard.scss';

const AdminDashboard = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get_admin_dashboard_data())
    }, [])


    const state = {
        series : [
            {
                name : "Orders",
                data : [23,34,45,56,76,34,23,76,87,78,34,45]
            },
            {
                name : "Revenue",
                data : [67,39,45,56,90,56,23,56,87,78,67,78]
            },
            {
                name : "Sellers",
                data : [34,39,56,56,80,67,23,56,98,78,45,56]
            },
        ],
        options : {
            color : ['#181ee8','#181ee8'],
            plotOptions: {
                radius : 30
            },
            chart : {
                background : 'transparent',
                foreColor : '#d0d2d6'
            },
            dataLabels : {
                enabled : false
            },
            strock : {
                show : true,
                curve : ['smooth','straight','stepline'],
                lineCap : 'butt',
                colors : '#f0f0f0',
                width  : .5,
                dashArray : 0
            },
            xaxis : {
                categories : ['Jan','Feb','Mar','Apl','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            },
            legend : {
                position : 'top'
            },
            responsive : [
                {
                    breakpoint : 565,
                    yaxis : {
                        categories : ['Jan','Feb','Mar','Apl','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                    },
                    options : {
                        plotOptions: {
                            bar : {
                                horizontal : true
                            }
                        },
                        chart : {
                            height : "550px"
                        }
                    }
                }
            ]
        }
    }




    return (
        <div className='admin-dashboard'>
          
    
          <div className='stats'>
            <div className='stat-card quatre'>
              <MdCurrencyExchange className='icon' />
              <div>
                <h3>$9483</h3>
                <p>Total Sale</p>
              </div>
            </div>
            <div className='stat-card deux'>
              <MdProductionQuantityLimits className='icon' />
              <div>
                <h3>50</h3>
                <p>Products</p>
              </div>
            </div>
            <div className='stat-card un'>
              <FaUsers className='icon' />
              <div>
                <h3>10</h3>
                <p>Sellers</p>
              </div>
            </div>
            <div className='stat-card trois'>
              <FaCartShopping className='icon' />
              <div>
                <h3>54</h3>
                <p>Orders</p>
              </div>
            </div>
          </div>
          <div className='chart-container'>
            <div className='chart'>
                <Chart options={state.options} series={state.series} type='bar' height='350' />
            </div>

            <div className='recent-seller-messages-container'>
                <div className="recent-seller-messages-header">
                    <h2>Recent Seller Message</h2>
                    <Link>View All</Link>
                </div>
                <div className="messages">
                    <ol>
                        <li>
                            <div><img src="http://localhost:3000/src/assets/admin.jpeg" alt="" /></div>
                            <div>
                                <Link>Admin</Link>
                                <time>2 day ago</time>
                            </div>
                            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur aut laborum ex magnam, ipsam voluptas alias est ipsa eaque mollitia. Nisi ducimus dolorem facere dignissimos fugit obcaecati veniam vero blanditiis!</div>
                        </li>
                        <li>
                            <div><img src="http://localhost:3000/src/assets/admin.jpeg" alt="" /></div>
                            <div>
                                <Link>Admin</Link>
                                <time>2 day ago</time>
                            </div>
                            <div>How are you</div>
                        </li>
                        <li>
                            <div><img src="http://localhost:3000/src/assets/admin.jpeg" alt="" /></div>
                            <div>
                                <Link>Admin</Link>
                                <time>2 day ago</time>
                            </div>
                            <div>How are you</div>
                        </li>
                        <li>
                            <div><img src="http://localhost:3000/src/assets/admin.jpeg" alt="" /></div>
                            <div>
                                <Link>Admin</Link>
                                <time>2 day ago</time>
                            </div>
                            <div>How are you</div>
                        </li>
                    </ol>

                </div>
            </div>


          </div>



          <div className='recent-orders'>
            <div className='recent-orders-header'>
              <h2>Recent Orders</h2>
              <Link>View All</Link>
            </div>
    
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th>Order Id</th>
                    <th>Price</th>
                    <th>Payment Status</th>
                    <th>Order Status</th>
                    <th>Active</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    [1,2,3,4,5].map((d, i) => (
                      <tr key={i}>
                        <td>#{d._id}123456789</td>
                        <td>${d.price}6784</td>
                        <td>{d.payment_status}Pending</td>
                        <td>{d.delivery_status}Pending</td>
                        <td>
                          <Link to={`/admin/dashboard/order/details/${d._id}`}>View</Link>
                        </td>
                      </tr>
                      
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    };

export default AdminDashboard;
