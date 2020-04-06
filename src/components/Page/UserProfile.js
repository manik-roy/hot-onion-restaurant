import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../auth/useAuth';
import axios from 'axios';
import OrderItem from '../Cart/OrderItem';
import Loading from '../utils/Loading';

const UserProfile = () => {

  const { user } = useContext(UserContext)
  const [previousOrder, setPreviousOrder] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isOrder, setIsOrder] = useState(false)
  useEffect(() => {
    async function getOrder() {
      setIsLoading(true)
      try {
        const response = await axios.get(`https://hot-onion.herokuapp.com/api/v1/orders/${user._id}`);
        var orders = response.data.data.order.map(item => {
          return { carts: item.cart, subTotal: item.subTotal, createdAt: item.createdAt };
        })
        setPreviousOrder(orders)
        if (orders.length > 0) {
          setIsOrder(true)
        }
        setIsLoading(false)
      } catch (error) {
        console.error(error);
        setIsLoading(false)
      }
    }
    getOrder()

  }, [user])

  return (
    <>
      {isLoading ? <Loading /> : (
        <div className="container">
          <div className="card border-primary m-auto d-block">
            <img className="card-img-top w-25 d-block m-auto" src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" alt="" />
            <div className="card-body">
              <h4 className="card-title text-center">{user && user.displayName}</h4>
              <p className="card-text text-center">{user && user.email}</p>
            </div>
          </div>
          <div className="row">
            <div className="col m-4">
              {isOrder ?
                <h2 className="text-center m-auto">Previous Order</h2> :
                <h2 className="text-center m-auto" >You have no orders</h2>}
            </div>
            <div className="w-100"></div>
            {previousOrder && previousOrder.map(item => <OrderItem key={item.createdAt} date={item.createdAt} item={item}  />)}
          </div>
        </div>
      )}
    </>
  );

};

export default UserProfile;