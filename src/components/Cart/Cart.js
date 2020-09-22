import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../auth/useAuth';
import InputItem from '../auth/InputItem/InputItem'
import './Cart.css'
import CartItem from './CartItem';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import Stripe from '../utils/Stripe';
import Loading from '../utils/Loading';

const Cart = (props) => {
  const { cart, checkOutOrder, user, setCart } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false);
  const [isShipping, setIsShipping] = useState(false)

  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    homeNo: '',
    flatNo: '',
    name: '',
    instruction: ''
  })

  const [deliveryFee] = useState(2)
  const [tax] = useState(5)
  const [subTotal, setSubTotal] = useState(5)
  const [payInfo, setPayInfo] = useState(null)
  const [isPay, setIsPay] = useState(true)
  const [isPayed, setIsPayed] = useState(false)
  useEffect(() => {
    async function getCarts() {

      if (user) {
        setIsLoading(true)
        try {
          const response = await axios.get(`https://hot-onion.herokuapp.com/api/v1/carts/${user._id}`);
          setIsLoading(false)
          if (response.data.data.cart.length > 0) {
            setCart(response.data.data.cart[0].carts)
          } else {
            setCart(response.data.data.cart)
          }
          setIsLoading(false)
        } catch (error) {
          setIsLoading(false)
        }
      }
    }
    getCarts()
  }, [setCart, user])

  useEffect(() => {
    if (payInfo) {
      setIsPay(false)
      setIsPayed(true)
    }
  }, [payInfo])

  const handlePayInfo = info => {
    setPayInfo(info)
  }

  useEffect(() => {
    let totalPrice = cart.reduce((total, item) => total + item.proTotalPrice, 0)
    setSubTotal(totalPrice)
  }, [cart])

  const [disabled, setDisabled] = useState(false)
  useEffect(() => {
    if (deliveryInfo.name && deliveryInfo.homeNo && deliveryInfo.flatNo && deliveryInfo.instruction && deliveryInfo.address && isShipping) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [deliveryInfo, isShipping])

  // input field handler
  const onchangeHandler = e => {
    const { name, value } = e.target;
    setDeliveryInfo({...deliveryInfo,[name]:value})
  }
  useEffect(() => {
    setDeliveryInfo(previousState => ({...previousState, name:user.displayName}))
  }, [user])



  const handleCheckout = async () => {
    setIsLoading(true)
    try {

      const cartIds = cart.map(i => i._id);

      await axios.put(`https://hot-onion.herokuapp.com/api/v1/carts/deletes/${user._id}`, cartIds)

      const shippingInfo = {
       ...deliveryInfo,
        cart,
        user: user._id,
        subTotal,
        payInfo
      }
      let orderResult = await axios.post(`https://hot-onion.herokuapp.com/api/v1/orders`, shippingInfo)
      setIsLoading(false)
      props.history.push(`/checkout?orderId=${orderResult.data.data.order._id}`)
      checkOutOrder();

    } catch (error) {
      setIsLoading(false)
      alert('Please place order again!')
    }

  }
  const handleSubmit = e => {
    e.preventDefault()
    setIsShipping(true)
  }

  if (isLoading) {
    return <Loading />
  }

  if (cart.length === 0) {
    return (
      <div className="container pt-5 mt-5 text-center">
        <h1 className="text-center">You have no item</h1>
        <Link to="/foods" className="text-danger">See our foods.</Link>
      </div>
    )
  } else {
    return (
      <div className="container pt-5 mt-5">
        <div className="row d-flex justify-content-between">
          <div className="col-md-5">
            <div className="delivery-details">
              <h3>Edit Delivery Details </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <InputItem name="address"
                type="text" placeholder="Deliver to door"
                onchangeHandler={onchangeHandler} value={deliveryInfo.address} />
              <InputItem name="homeNo"
                type="text" placeholder="107 RD No 12"
                onchangeHandler={onchangeHandler} value={deliveryInfo.homeNo} />
              <InputItem name="flatNo"
                type="text" placeholder="Flat, suite or flor"
                onchangeHandler={onchangeHandler} value={deliveryInfo.flatNo} />
              <InputItem name="name"

                type="text" placeholder="Business Name "
                onchangeHandler={onchangeHandler} value={deliveryInfo.name} />
              <div className="form-group">
                <textarea className="form-control"
                  onChange={onchangeHandler}
                  value={deliveryInfo.instruction}
                  name="instruction"
                  placeholder="Add Delivery Instruction " rows="3"></textarea>
              </div>
              <button type="submit" className="btn sign-up-btn w-100">Save and Continue</button>
            </form>
            <div className="m-4">
              <Stripe disabled={disabled} handlePayInfo={handlePayInfo} />
            </div>
          </div>
          <div className="col-md-5 f-right">
            <div className="final-order-aria">
              <h5 className="resturant-name">From <span>Gulshan Plazza GPR</span> </h5>
              <h6>Arriving in 20-30 minutes</h6>
              <div className="orders-items-aria">

                {cart.map(item => <CartItem item={item} key={item._id} payMendInfo={isPayed} />)}

              </div>
              <div className="order-price-aira">
                <div className="cart-item">
                  <div className="row">
                    <div className="col-md-8">
                      <h5>Subtotal: </h5>
                      <h5>Tax:</h5>
                      <h5>Deliver fee:</h5>
                      <h5>Total:</h5>
                    </div>
                    <div className="col-md-4 status">
                      <h5>$ <span id="sub-total-price">{subTotal.toFixed(2)}</span> </h5>
                      <h5>$ <span> {tax}.00</span> </h5>
                      <h5>$ <span>{deliveryFee}.00</span> </h5>
                      <h5>$ <span id="total-price">{(subTotal + tax + deliveryFee).toFixed(2)}</span> </h5>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isPay}
                    className={isPay ? 'btn place-order-btn-disable' : 'btn sign-up-btn w-100'}
                    // className="btn sign-up-btn w-100" 
                    onClick={handleCheckout} >Place Order</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(Cart);