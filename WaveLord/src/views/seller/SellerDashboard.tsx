import React, { useEffect } from 'react';
import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";
import { FaUsers, FaShoppingCart } from "react-icons/fa"; 
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_seller_dashboard_data } from '../../store/Reducers/dashboardReducer';
import moment from 'moment';
import customer from '../../assets/demo.jpg';
import '../../scss/seller/SellerDashboard.scss';
import { RootState, AppDispatch } from '../../store';

interface DashboardState {
  totalSale: number;
  totalOrder: number;
  totalProduct: number;
  totalPendingOrder: number;
  recentOrder: Array<any>;
  recentMessage: Array<any>;
}

const SellerDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalSale, totalOrder, totalProduct, totalPendingOrder, recentOrder, recentMessage } = useSelector((state: RootState) => state.dashboard);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(get_seller_dashboard_data());
  }, [dispatch]);

  const state = {
    series: [
      {
        name: "Orders",
        data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78, 34, 45]
      },
      {
        name: "Revenue",
        data: [67, 39, 45, 56, 90, 56, 23, 56, 87, 78, 67, 78]
      },
      {
        name: "Sales",
        data: [34, 39, 56, 56, 80, 67, 23, 56, 98, 78, 45, 56]
      },
    ],
    options: {
      colors: ['#0099ff', '#66ff66', '#ffcc00'],
      plotOptions: {
        bar: {
          borderRadius: 10
        }
      },
      chart: {
        background: 'transparent',
        foreColor: '#d0d2d6'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        curve: ['smooth', 'straight', 'stepline'] as ("smooth" | "straight" | "stepline")[], // Ensuring the correct type here
        lineCap: 'butt',
        colors: ['#f0f0f0'],
        width: 0.5,
        dashArray: 0
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      legend: {
        position: 'top' as "top" | "right" | "bottom" | "left" // Ensuring the correct type here
      },
      responsive: [
        {
          breakpoint: 565,
          options: {
            plotOptions: {
              bar: {
                horizontal: true
              }
            },
            chart: {
              height: "550px"
            },
            yaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
          <FaShoppingCart className='icon' />
          <div>
            <h3>{totalOrder}</h3>
            <p>Orders</p>
          </div>
        </div>
        <div className='stat-card trois'>
          <FaShoppingCart className='icon' />
          <div>
            <h3>{totalPendingOrder}</h3>
            <p>Pending Orders</p>
          </div>
        </div>
      </div>
      <div className='chart-container'>
        <div className='chart'>
          <Chart options={state.options} series={state.series} type='bar' height='350' width='100%' />
        </div>

        <div className='recent-seller-messages-container'>
          <div className="recent-seller-messages-header">
            <h2>Recent Customer Message</h2>
            <Link to="/messages">View All</Link>
          </div>
          <div className="messages">
            <ol>
              {recentMessage.map((m, i) => (
                <li key={i}>
                  <div>
                    {m.senderId === userInfo?._id ? <img src={userInfo?.image} alt="" /> : <img src={customer} alt="" />}
                  </div>
                  <div>
                    <Link to={`/messages/${m.senderId}`}>{m.senderName}</Link>
                    <time>{moment(m.createdAt).startOf('hour').fromNow()}</time>
                  </div>
                  <div>
                    {m.message}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className='recent-orders'>
        <div className='recent-orders-header'>
          <h2>Recent Orders</h2>
          <Link to="/orders">View All</Link>
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
              {recentOrder.map((d, i) => (
                <tr key={i}>
                  <td>#{d._id}</td>
                  <td>${d.price}</td>
                  <td>{d.payment_status}</td>
                  <td>{d.delivery_status}</td>
                  <td>
                    <Link to={`/admin/dashboard/order/details/${d._id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
