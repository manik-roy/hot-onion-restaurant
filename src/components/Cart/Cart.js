import React, { useContext, useState } from 'react';
import { UserContext } from '../auth/useAuth';
import InputItem from '../auth/InputItem/InputItem'
import './Cart.css'
import CartItem from './CartItem';
import { withRouter } from 'react-router-dom';

const Cart = (props) => {
  const { cart, checkOutOrder } = useContext(UserContext)

  const [address, setAddress] = useState('')
  const [homeNo, setHomeNo] = useState('')
  const [flatNo, setFlatNo] = useState('')
  const [name, setName] = useState('')
  const [instruction, setInstruction] = useState('')

  console.log(cart);

  // input field handler
  const onchangeHandler = e => {
    const { name, value } = e.target;
    if (name === 'address') {
      setAddress(value)
    }
    if (name === 'homeNo') {
      setHomeNo(value)
    }
    if (name === 'flatNo') {
      setFlatNo(value)
    }
    if (name === 'name') {
      setName(value)
    }
    if (name === 'instrunCiton') {
      setInstruction(value)
    }
  }

  
if(cart.length === 0) {
  return (
    <div className="container pt-5 mt-5">
      <h1 className="text-center">You have no item</h1>
    </div>
  )
}


const handleCheckout = () => {
  checkOutOrder()
  props.history.push('/checkout')
}

  return (
    <div className="container pt-5 mt-5">
      <div className="row d-flex justify-content-between">
        <div className="col-md-5">
          <div className="delivery-details">
            <h3>Edit Delivery Details </h3>
          </div>

          <form>
            <InputItem name="address"
              type="text" placeholder="Deliver to door"
              onchangeHandler={onchangeHandler} value={address} />
            <InputItem name="homeNo"
              type="text" placeholder="107 RD No 12"
              onchangeHandler={onchangeHandler} value={homeNo} />
            <InputItem name="flatNo"
              type="text" placeholder="Flat, suite or flor"
              onchangeHandler={onchangeHandler} value={flatNo} />
            <InputItem name="name"
              type="text" placeholder="Business Name "
              onchangeHandler={onchangeHandler} value={name} />
            <div className="form-group">
              <textarea className="form-control"
                onChange={onchangeHandler}
                value={instruction}
                name="instrunCiton"
                placeholder="Add Delivery Instruction " rows="3"></textarea>
            </div>
            <button type="submit" className="btn sign-up-btn w-100">Save and Continue</button>
          </form>
        </div>
        <div className="col-md-5 f-right">
          <div className="final-order-aria">
            <h5 className="resturant-name">From <span>Gulshan Plazza GPR</span> </h5>
            <h6>Arriving in 20-30 minutes</h6>
            <div className="orders-items-aria">

              {cart.map(item => <CartItem item={item} key={item.id} />)}

            </div>
            <div className="order-price-aira">
              <div className="cart-item">
                <div className="row">
                  <div className="col-md-8">
                    <h5>Subtotal: </h5>
                    <h5>Tax:</h5>
                    <h5>Total:</h5>
                  </div>
                  <div className="col-md-4 status">
                    <h5>$ <span id="sub-total-price">1278</span> </h5>
                    <h5>$0</h5>
                    <h5>$ <span id="total-price">1278</span> </h5>
                  </div>
                </div>
                <button type="submit" className="btn sign-up-btn w-100" onClick={handleCheckout} >Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Cart);