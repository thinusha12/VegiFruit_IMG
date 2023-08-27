import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorToast, SuccessToast } from '../../components/toast';
import Input from '../../components/form-input/Input';
import Button from '../../components/button/Button';

const UpdateUser = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setphoto] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const handleUpdateUser = async () => {
    try {
      if (name !== '' && email !== '' && photo !== '') {
        const user = {
          name,
          email,
          photo,
        };
        const res = await axios.put(`http://localhost:8070/api/user/update/${id}`, user);
        SuccessToast(res.data.message);
        setTimeout(() => navigate('/users'), 2000);
      } else {
        ErrorToast('Please Enter Values to All Fields.');
      }
    } catch (err) {
      console.log(err);
      ErrorToast(err.response.data.message);
    }
  };

  const fetchUserById = async () => {
    try {
      const res = await axios.get(`http://localhost:8070/api/user/get?id=${id}`);
      setName(res.data.data.name);
      setEmail(res.data.data.email);
      setphoto(res.data.data.photo);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUserById();
  }, [id]);

  return (
    <div className="container_">
      <h1>Update User</h1>
      <div className="form-container">
        <Input
          label={'Name'}
          type={'text'}
          id={'name'}
          value={name}
          onChange={setName}
        />
        <Input
          label={'Email'}
          type={'email'}
          id={'email'}
          value={email}
          onChange={setEmail}
        />
        <Input
          label={'Image'}
          type={'text'}
          id={'image'}
          value={photo}
          onChange={setphoto}
        />
        <Button
          label={'update'}
          onClick={handleUpdateUser}
        />
      </div>

    </div>
  )
}

export default UpdateUser;
