import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Product from '../../components/product';

const Home = () => {

  const [products, setProducts] = useState([]);

  const handleFetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8070/api/product/all');
      setProducts(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleFetchProducts();
  }, []);

  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products?.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
export default Home;

