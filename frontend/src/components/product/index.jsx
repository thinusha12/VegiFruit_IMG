import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from '../rating';
import './styles.css';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.images[0]} variant='top' className="pro_img" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' style={{ fontSize: '22px' }}>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} g`}
          />
        </Card.Text>
        <Card.Text as='h3'>Rs.{product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}
export default Product;
