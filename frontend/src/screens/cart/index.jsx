import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Button from '../../components/button/Button';
import StripeCheckout from 'react-stripe-checkout';
import CartItem from '../../components/cart-item';
import './styles.css';
import { ErrorToast, SuccessToast } from '../../components/toast';
import { useNavigate } from 'react-router-dom';
import { emptyCart } from '../../redux/actions';

function Cart({ cart, emptyCart }) {

  const [fullTotal, setFullTotal] = useState(0);

  const navigate = useNavigate();

  const handleSetTotal = (total, index) => {
    if (index === 1) {
      setFullTotal(fullTotal + total);
    } else {
      setFullTotal(fullTotal - total);
    }
  }

  const handleOrder = async () => {
    try {
      const productsArr = [];

      cart.forEach((element) => {
        let ob = {
          product: element._id,
          quantity: element.quantity,
          price: element.quantity * element.price
        }
        productsArr.push(ob);
      });

      const obj = {
        user: localStorage.getItem('user'),
        products: productsArr,
        payment: {
          date: new Date(),
          method: "VISA"
        }
      }

      const res = await axios.post('http://localhost:8070/api/order/create', obj);
      SuccessToast(res.data.message);
      emptyCart();
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.log(err);
      ErrorToast(err.response.data.message);
    }
  }

  useEffect(() => {
    let initialTotal = 0;
    for (let i = 0; i < cart.length; i++) {
      initialTotal += cart[i].price;
    }
    setFullTotal(initialTotal);
  }, [cart]);

  return (
    <>
      <div className="container px-4 py-5 mx-auto">
        <div className="row d-flex justify-content-center text-center">

          <div className="col-12">
            <div className="row text-center">
              <div className="col-4">
                <h6 className="mt-2">Item</h6>
              </div>
              <div className="col-3">
                <h6 className="mt-2">Quantity</h6>
              </div>
              <div className="col-2">
                <h6 className="mt-2">Price</h6>
              </div>
              <div className="col-2">
                <h6 className="mt-2">Total</h6>
              </div>
              <div className="col-1">

              </div>
            </div>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className='text-danger text-center w-100 mt-5'>
            No Cart Items
          </div>
        ) : (
          <>
            {cart.map((item, index) => (
              <CartItem item={item} handleSetTotal={handleSetTotal} key={index} />
            ))}
          </>
        )}


        {cart.length > 0 && (
          <div className="row d-flex justify-content-center">
            <div className="col-lg-12">
              <div className="card">
                <div className="row">
                  <div className="col-lg-3 radio-group"></div>

                  <div className="col-lg-4 mt-2">
                    <div className="row d-flex justify-content-between px-4">
                      <p className="mb-1 text-left">Subtotal</p>
                      <h6 className="mb-1 text-right">Rs: {fullTotal}</h6>
                    </div>
                    <div className="row d-flex justify-content-between px-4">
                      <p className="mb-1 text-left">Shipping</p>
                      <h6 className="mb-1 text-right">Rs: 350</h6>
                    </div>
                    <div className="row d-flex justify-content-between px-4" id="tax">
                      <p className="mb-1 text-left">Total (tax included)</p>
                      <h6 className="mb-1 text-right">Rs: {fullTotal + 350}</h6>
                    </div>

                    <StripeCheckout
                      shippingAddress
                      currency='LKR'
                      amount={(fullTotal + 350) * 100}
                      stripeKey="pk_test_51KON7QSGc2uzmcTNMsY4QEFqEOPT7kUQaFthMpzSvbbeDYNxBvvPTkiZDnQhMMuuLadaLvFR36OxyQBbVKmXkYnT000ZDxnzBd"
                      token={handleOrder}
                    >
                      <Button
                        label={'checkout'}
                        onClick={() => { }}
                      />
                    </StripeCheckout>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
const mapStateToProps = state => ({
  cart: state.cart,
});

const mapDispatchToProps = {
  emptyCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

