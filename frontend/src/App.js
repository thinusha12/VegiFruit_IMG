import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/nav/Header';
import Footer from './components/nav/Footer';
import Home from './screens/home';
import Login from './screens/login';
import AddProduct from './screens/add-product';
import Products from './screens/products';
import Register from './screens/register';
import Cart from './screens/cart';
import Product from './screens/product';
import Users from './screens/users';
import Profile from './screens/profile';
import UpdateProduct from './screens/edit-product';
import UpdateUser from './screens/edit-user';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/products/add' element={<AddProduct />} />
            <Route path='/products' element={<Products />} />
            <Route path='/register' element={<Register />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/product/update/:id' element={<UpdateProduct />} />
            <Route path='/users' element={<Users />} />
            <Route path='/user/update/:id' element={<UpdateUser />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App;

