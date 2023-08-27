import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../../components/form-input/Input";
import Button from "../../components/button/Button";
import { ErrorToast, SuccessToast } from "../../components/toast";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setphoto] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (name !== '' && email !== '' && photo !== '' && password !== '') {
        const user = {
          name,
          email,
          photo,
          password,
        };
        const res = await axios.post('http://localhost:8070/api/user/register', user);
        SuccessToast(res.data.message);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        ErrorToast('Please Enter Values to All Fields.');
      }
    } catch (err) {
      console.log(err);
      ErrorToast(err.response.data.message);
    }
  };

  return (
    <div className="container_">
      <h1>Register</h1>
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
        <Input
          label={'Password'}
          type={'password'}
          id={'password'}
          value={password}
          onChange={setPassword}
        />
        <Button
          label={'Register'}
          onClick={handleRegister}
        />
      </div>
      <p className="mt-3">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
