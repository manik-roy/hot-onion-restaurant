import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../auth/useAuth';
import axios from 'axios';
import Cart from '../Cart/Cart';
import CartItem from '../Cart/CartItem';
import OrderItem from '../Cart/OrderItem';

const UserProfile = () => {

  const { user } = useContext(UserContext)
  const [previousOrder, setPreviousOrder] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function getOrder() {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/orders/${user._id}`);
        var orders = response.data.data.order.map(item => {
          return { carts: item.cart, subTotal: item.subTotal, createdAt: item.createdAt };
        })
        setPreviousOrder(orders)
        console.log(previousOrder);

      } catch (error) {
        console.error(error);
      }
    }
    getOrder()

  }, [user])
  if (previousOrder) {
    console.log(previousOrder);
  }

  return (
    <>

      {loading ? <h1 className="card-text text-center mt-5 pt-5">Loading ......</h1> : (
        <div className="container">
          <div className="card border-primary m-auto d-block">
            <img className="card-img-top w-25 d-block m-auto" src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" alt="" />
            <div className="card-body">
              <h4 className="card-title text-center">{user && user.displayName}</h4>
              <p className="card-text text-center">{user && user.email}</p>
            </div>
          </div>
          <div className="row">
              <div className="col m-4"><h2 className="text-center m-auto">Previous Order</h2></div>
              <div className="w-100"></div>
              {previousOrder && previousOrder.map(item => <OrderItem item={item} />)}
          </div>
          </div>
    )  }
    </>
      );

};

export default UserProfile;