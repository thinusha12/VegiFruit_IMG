import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from '../../components/toast';
import './styles.css';

const Products = () => {

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const handleFetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8070/api/user/all');
      setUsers(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleEditUser = (id) => {
    navigate(`/user/update/${id}`);
  };

  const handleDeleteUser = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8070/api/user/delete/${id}`);
      handleFetchUsers();
      SuccessToast(res.data.message);
    } catch (err) {
      console.log(err);
      ErrorToast(err.response.data.message);
    }
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  return (
    <div className="container_">
      <h1>Product List</h1>
      <div className='table-container'>
        <table className="product-list-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.length === 0 ? (
              <tr>
                <td colSpan={5} className='no-data'>
                  No Data
                </td>
              </tr>
            ) : (
              <>
                {users.map(user => (
                  <tr key={user._id}>
                    <td className='center-item'>
                      <img src={user.photo} alt={user.name} className="product-list-image" />
                    </td>
                    <td className='user-list-text'>{user.name}</td>
                    <td className='user-list-text'>{user.email}</td>
                    <td className="user-list-text center-item">{user.type}</td>
                    <td>
                      <button
                        className='product-btn'
                        onClick={() => handleEditUser(user._id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className='product-btn'
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
