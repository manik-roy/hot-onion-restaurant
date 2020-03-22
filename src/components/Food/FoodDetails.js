import React, { useState, useEffect, useContext } from 'react';
import './FoodDetails.css'
import { useParams } from 'react-router-dom';
import foods from '../../fakeData/foodData';
import { UserContext } from '../auth/useAuth';

const FoodDetails = (props) => {
  const {addToCart } = useContext(UserContext)
  const pdId = useParams()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState({})

  useEffect(()=>{
    const data = foods.filter(item => item.id === parseInt(pdId.id))
    setProduct(data[0])
  },[pdId])

  // onchange handler
  const onchangeHandler = e => {
    if(!isNaN(e.target.value)) {
      setQuantity(e.target.value)
    }
  }

  const cartHandler = item => {
    // console.log(id);
    
    addToCart({...item, quantity})
    props.history.push('/cart')
  }

  const {title, price, description, img} = product;
  // console.log(product.title);  
  return (
    <section className="food-details pt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 py-5">
            <div className="food-details-content">
              <h3>{title}</h3>
              <p className="subtitle muted pt-3">{description}</p>
            <div className="cart-item d-flex align-items-center p-3">
              <h3>${price}</h3>
              <div className="input-group input-cart-item ml-4">
                <button 
                  className="btn btn-default" 
                  onClick={()=>setQuantity(quantity-1)}
                  id="remove-product"><i className="fas fa-minus"></i></button>
                <input type="text" 
                  id="food-quantity" 
                  onChange={onchangeHandler} 
                  className="form-control text-center" 
                  value={quantity} />
                <button 
                  onClick={()=>setQuantity(quantity*1 +1)}
                  className="btn btn-default" 
                  id="add-product"><i className="fas fa-plus"></i></button>
              </div>
            </div>
            <button className="btn primary-btn btn-cart" onClick={()=>cartHandler(product)}>
              <span>
                <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
              </span> Add</button>
            </div>
          </div>
          <div className="col-md-6 m-auto d-block">
            <img src={img} className="food-img m-auto d-block" alt=""/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodDetails;