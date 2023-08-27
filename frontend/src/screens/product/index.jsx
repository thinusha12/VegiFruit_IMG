/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions';
import Rating from '../../components/rating';
import Button from '../../components/button/Button';

const Product = ({ addToCart, cart }) => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [isProductInCart, setisProductInCart] = useState(false);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    setisProductInCart(true);
  };

  const handleFetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8070/api/product/get/${id}`);
      setProduct(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleGoBack = () => {
    navigate('/');
  }

  useEffect(() => {
    setisProductInCart(cart.some(item => item._id === id));
    handleFetchProduct();
  }, []);

  return (
    <>
      <Button
        label={'go back'}
        onClick={handleGoBack}
      />
      <Row>
        <Col md={6}>
          <Image src={product?.images ? product.images[0] : ""} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} g`} />
            </ListGroup.Item>
            <ListGroup.Item>Price: Rs.{product.price}</ListGroup.Item>
            <ListGroup.Item> Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        {(localStorage.getItem('type') === 'USER') && (
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <Row>
                  <Col>
                    Price:
                  </Col>
                  <Col>
                    <strong>Rs. {product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroup.Item>
                <Button
                  label={isProductInCart ? 'Added to Cart' : 'Add to Cart'}
                  disabled={isProductInCart}
                  onClick={() => handleAddToCart(product)}
                />
              </ListGroup.Item>
            </ListGroup>
          </Col>
        )}
      </Row>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
