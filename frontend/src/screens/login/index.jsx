import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../../components/form-input/Input";
import Button from "../../components/button/Button";
import { ErrorToast, SuccessToast } from "../../components/toast";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        const user = { email, password };
        const res = await axios.post('http://localhost:8070/api/user/login', user);
        localStorage.setItem('user', res.data.data._id);
        localStorage.setItem('name', res.data.data.name);
        localStorage.setItem('type', res.data.data.type);
        SuccessToast(res.data.message);
        if (res.data.data.type === 'ADMIN') {
          setTimeout(() => navigate('/products'), 2000);
        } else {
          setTimeout(() => navigate('/'), 2000);
        }
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
      <h1>Login</h1>
      <div className='form-container'>
        <Input
          label={'Email'}
          type={'email'}
          id={'email'}
          value={email}
          onChange={setEmail}
        />
        <Input
          label={'Password'}
          type={'password'}
          id={'password'}
          value={password}
          onChange={setPassword}
        />
        <Button
          label={'login'}
          onClick={handleLogin}
        />
      </div>
      <p className="mt-3">
        Don't have an account? <Link to="/register">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
