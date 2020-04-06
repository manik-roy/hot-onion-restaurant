import React from 'react';
import Timestamp from 'react-timestamp'
const OrderItem = ({ item, date }) => {

  return (
    <div className="col-md-6 m-auto">
      <div className="card text-center shadow p-4 m-4">
      <p  className="text-center d-block m-auto orderID py-2">order id: #{item.carts[0]._id} </p>
      <Timestamp date={date} /> 
        <img className="card-img-top w-25 d-block m-auto" src={item.carts[0].img} alt="Card images cap" />
        <div className="card-body">
          <h5 className="card-title">{item.carts[0].title}</h5>
          <div className="card-text"> <strong><h6>Subtotal <span>{item.subTotal.toFixed(2)}</span> </h6></strong></div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;