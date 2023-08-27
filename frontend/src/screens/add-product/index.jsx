import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Input from '../../components/form-input/Input';
import TextArea from '../../components/form-input/TextArea';
import Button from '../../components/button/Button';
import { ErrorToast, SuccessToast } from '../../components/toast';

const AddProduct = () => {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [rating, setRating] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);

    const navigate = useNavigate();

    const handleCreateProduct = async () => {
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
                const res = await axios.post('http://localhost:8070/api/product/create', product);
                SuccessToast(res.data.message);
                setTimeout(() => navigate('/products'), 2000);

                setName('');
                setImage('');
                setDescription('');
                setPrice(0);
                setRating(0);
                setReviewCount(0);
            } else {
                ErrorToast('Please Enter Values to All Fields.');
            }
        } catch (err) {
            console.log(err);
            ErrorToast(err.response.data.message);
        }
    };

    return (
        <div className='container_'>
            <h1>Add Product</h1>
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
                    label={'Review Count'}
                    type={'number'}
                    id={'reviewCount'}
                    value={reviewCount}
                    onChange={setReviewCount}
                />
                <Button
                    label={'create'}
                    onClick={handleCreateProduct}
                />
            </div>
        </div>
    );
};

export default AddProduct;
