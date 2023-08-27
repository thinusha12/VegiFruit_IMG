import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorToast, SuccessToast } from '../../components/toast';
import Input from '../../components/form-input/Input';
import TextArea from '../../components/form-input/TextArea';
import Button from '../../components/button/Button';

const UpdateProduct = () => {

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleUpdateProduct = async () => {
    try {
      if (name !== '' && image !== '' && description !== '' && price !== 0 && rating !== 0 && reviewCount !== 0) {
        const product = {
          name: name,
          images: [image],
          description: description,
          price: price,
          rating: rating,
          numReviews: reviewCount
        };
        const res = await axios.put(`http://localhost:8070/api/product/update/${id}`, product);
        SuccessToast(res.data.message);
        setTimeout(() => navigate('/products'), 2000);
      } else {
        ErrorToast('Please Enter Values to All Fields.');
      }
    } catch (err) {
      console.log(err);
      ErrorToast(err.response.data.message);
    }
  };

  const fetchProductById = async () => {
    try {
      const res = await axios.get(`http://localhost:8070/api/product/get/${id}`);
      setName(res.data.data.name);
      setImage(res.data.data.images[0]);
      setDescription(res.data.data.description);
      setPrice(res.data.data.price);
      setRating(res.data.data.rating);
      setReviewCount(res.data.data.numReviews);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchProductById();
  }, [id]);

  return (
    <div className='container_'>
      <h1>Update Product</h1>
      <div className='form-container'>
        <Input
          label={'Name'}
          type={'text'}
          id={'name'}
          value={name}
          onChange={setName}
        />
        <Input
          label={'Image'}
          type={'text'}
          id={'image'}
          value={image}
          onChange={setImage}
        />
        <TextArea
          label={'Description'}
          id={'description'}
          value={description}
          onChange={setDescription}
        />
        <Input
          label={'Price'}
          type={'number'}
          id={'price'}
          value={price}
          onChange={setPrice}
        />
        <Input
          label={'Rating'}
          type={'number'}
          id={'rating'}
          value={rating}
          onChange={setRating}
        />
        <Input
          label={'gram'}
          type={'number'}
          id={'reviewCount'}
          value={reviewCount}
          onChange={setReviewCount}
        />
        <Button
          label={'update'}
          onClick={handleUpdateProduct}
        />
      </div>
    </div>
  )
}

export default UpdateProduct;
