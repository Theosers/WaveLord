import React, { useEffect } from 'react';
import { MdCurrencyExchange,MdProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6"; 
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_seller_dashboard_data } from '../../store/Reducers/dashboardReducer';
import moment from 'moment';
import customer from '../../assets/demo.jpg'

import '../../scss/seller/SellerDashboard.scss';

const SellerDashboard = () => {

    const dispatch = useDispatch()
    const {totalSale,totalOrder,totalProduct,totalSeller,recentOrder,recentMessage} = useSelector(state=> state.dashboard)
    const {userInfo} = useSelector(state=> state.auth)

    useEffect(() => {
        dispatch(get_seller_dashboard_data())
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
                name : "Sales",
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
                <h3>${totalSale}</h3>
                <p>Total Sale</p>
              </div>
            </div>
            <div className='stat-card deux'>
              <MdProductionQuantityLimits className='icon' />
              <div>
                <h3>{totalProduct}</h3>
                <p>Products</p>
              </div>
            </div>
            <div className='stat-card un'>
              <FaCartShopping className='icon' />
              <div>
                <h3>{totalOrder}</h3>
                <p>Orders</p>
              </div>
            </div>
            <div className='stat-card trois'>
              <FaCartShopping className='icon' />
              <div>
                <h3>{totalPendingOrder}</h3>
                <p>Pending Orders</p>
              </div>
            </div>
          </div>
          <div className='chart-container'>
            <div className='chart'>
                <Chart options={state.options} series={state.series} type='bar' height='350' />
            </div>

            <div className='recent-seller-messages-container'>
                <div className="recent-seller-messages-header">
                    <h2>Recent Customer Message</h2>
                    <Link>View All</Link>
                </div>
                <div className="messages">
                    <ol>

                        
                        {
                                recentMessage.map((m, i) => <li>
                                    <div>
                                        {
                                            m.senderId === userInfo._id ? <img src={userInfo.image} alt="" /> : <img src={customer} alt="" />
                                        } 
                                    </div>
                                    
                                    <div>
                                        <Link>{m.senderName}</Link>
                                        <time> {moment(m.createdAt).startOf('hour').fromNow()}</time>
                                    </div>
                                    <div>
                                        {m.message}
                                    </div>
                                
                            </li>)
                            }
                        
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
                    recentOrder.map((d, i) => <tr key={i}>
                        <td>#{d._id}</td>
                        <td>${d.price}</td>
                        <td>{d.payment_status}</td>
                        <td>{d.delivery_status}</td>
                        <td>
                          <Link to={`/admin/dashboard/order/details/${d._id}`}>View</Link>
                        </td>
                      </tr>)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    };

export default SellerDashboard;
