import React, { useState } from 'react';
import { changeQuantity, removeFromCart } from '../../redux/actions';
import { connect } from 'react-redux';

function CartItem({ item, handleSetTotal, removeFromCart, cart, changeQuantity }) {

  const [quantity, setquantity] = useState(1);
  const [tempTotal, setTempTotal] = useState(item.price);

  const handleRemove = (productId) => {
    removeFromCart(productId);
    handleSetTotal(tempTotal, 0);
  };
  const handleIncrease = () => {
    console.log(item._id)
    setquantity(quantity + 1);
    setTempTotal(tempTotal + item.price);
    handleSetTotal(item.price, 1);
    changeQuantity(item._id, 1);
  }

  const handleDecrease = () => {
    if (quantity === 1) {
      return;
    }
    changeQuantity(item._id, -1);
    setquantity(quantity - 1);
    setTempTotal(tempTotal - item.price);
    handleSetTotal(item.price, 0);
  }

  return (
    <>
      <div className="row d-flex justify-content-center border-top">
        <div className="my-auto col-12">
          <div className="row text-center">
            <div className="col-4">
              <div className="row d-flex justify-content-center">
                <div className="book">
                  <img src={item.images[0]} alt='' className="book-img" />
                </div>
                <div className="my-auto flex-column d-flex na">
                  <h6 className="mob-text">{item.name}</h6>

                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="row d-flex justify-content-around align-items-center h-100 w-100 px-3">
                <div className="d-flex col plus-minus">
                  <button className="btn btn-primary" onClick={(e) => handleIncrease()}>+</button>
                </div>
                <div className="col plus-minus text-center">
                  <p className="mb-0" id="cnt2">{quantity}</p>
                </div>
                <div className="d-flex col plus-minus">
                  <button className="btn btn-primary" onClick={(e) => handleDecrease()}>-</button>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className='d-flex justify-content-center align-items-center h-100 px-3'>
                <h6 className="mob-text">Rs. {item.price}</h6>
              </div>
            </div>
            <div className="col-2">
              <div className='d-flex justify-content-center align-items-center h-100 px-3'>
                <h6 className="mob-text">Rs. {tempTotal}</h6>
              </div>
            </div>

            <div className="col-1">
              <button
                className="btn d-flex justify-content-center align-items-center h-100 px-3 text-danger"
                onClick={(e) => handleRemove(item._id)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  cart: state.cart,
});

const mapDispatchToProps = {
  removeFromCart,
  changeQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);