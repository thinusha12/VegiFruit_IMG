import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import './styles.css';

const Profile = () => {

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('type');
    localStorage.removeItem('name');
    navigate('/login');
  }

  const handleGetOrderByUserId = async () => {
    try {
      const id = localStorage.getItem('user');
      const res = await axios.get(`http://localhost:8070/api/order/get/user?user=${id}`);
      setOrders(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleGetAllOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8070/api/order/all');
      setOrders(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('type') === 'USER') {
      handleGetOrderByUserId();
    } else {
      handleGetAllOrders();
    }
  }, []);

  return (
    <div className="container_">
      <div className='logout-btn'>
        <Button
          label='logout'
          onClick={handleLogout}
        />
      </div>
      <h1>{localStorage.getItem('type') === 'USER' ? 'My Orders' : 'All Orders'}</h1>
      <div className='table-container'>
        <table className="product-list-table">
          <thead>
            <tr>
              <th>Order ID</th>
              {localStorage.getItem('type') !== 'USER' &&
                (
                  <>
                    <th>User ID</th>
                    <th>User Name</th>
                  </>
                )
              }
              <th>Product Count</th>
              <th>Payment Type</th>
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length === 0 ? (
              <tr>
                <td
                  colSpan={localStorage.getItem('type') === 'USER' ? 5 : 7}
                  className='no-data'
                >
                  No Data
                </td>
              </tr>
            ) : (
              <>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td className='no-wrap'>{order._id}</td>
                    {localStorage.getItem('type') !== 'USER' &&
                      (
                        <>
                          <td className='no-wrap'>{order.user._id}</td>
                          <td className='no-wrap'>{order.user.name}</td>
                        </>
                      )
                    }
                    <td className='center-item no-wrap'>{order.products.length}</td>
                    <td className='center-item no-wrap'>{order.payment.method}</td>
                    <td className='center-item no-wrap'>
                      {new Date(order.createdAt).toLocaleDateString('en-GB', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </td>
                    <td className='center-item no-wrap'>Rs. {order.price}.00</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Profile;