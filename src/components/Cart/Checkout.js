import React from 'react';
import { withRouter, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Checkout = (props) => {
  let query = useQuery();
  
  return (
    <div className="container">
      <h1 className="text-center">Thanks for you order!</h1>
      <p  className="text-center d-block m-auto orderID">Your order id: #{query.get("orderId")} </p>
      <img src="https://i.ibb.co/NytGHH3/8-ordercomplete.png" className="w-100" alt="8-ordercomplete" border="0"></img>
    </div>
  );
};

export default withRouter(Checkout);