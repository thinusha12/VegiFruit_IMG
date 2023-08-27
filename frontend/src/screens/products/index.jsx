import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from '../../components/toast';
import Button from '../../components/button/Button';
import './styles.css';

const Products = () => {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const handleFetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8070/api/product/all');
      setProducts(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleEditProduct = (productId) => {
    navigate(`/product/update/${productId}`);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const res = await axios.delete(`http://localhost:8070/api/product/delete/${productId}`);
      handleFetchProducts();
      SuccessToast(res.data.message);
    } catch (err) {
      console.log(err);
      ErrorToast(err.response.data.message);
    }
  };

  const handleCreateProduct = async () => {
    navigate('/products/add');
  }

  useEffect(() => {
    handleFetchProducts();
  }, []);

  return (
    <div className="container_">
      <h1>Product List</h1>
      <div className='add-new'>
        <Button
          label={'Create Product'}
          onClick={handleCreateProduct}
        />
      </div>
      <div className='table-container'>
        <table className="product-list-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Price</th>
              <th>Rating</th>
              <th>gram</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products?.length === 0 ? (
              <tr>
                <td colSpan={7} className='no-data'>
                  No Data
                </td>
              </tr>
            ) : (
              <>
                {products.map(product => (
                  <tr key={product._id}>
                    <td className='product-list-name'>{product.name}</td>
                    <td className='center-item'>
                      <img src={product.images} alt={product.name} className="product-list-image" />
                    </td>
                    <td>{product.description}</td>
                    <td className="product-list-price">Rs. {product.price.toFixed(2)}</td>
                    <td className='center-item'>{product.rating}</td>
                    <td className='center-item'>{product.numReviews}</td>
                    <td>
                      <button
                        className='product-btn'
                        onClick={() => handleEditProduct(product._id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className='product-btn'
                        onClick={() => handleDeleteProduct(product._id)}
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
