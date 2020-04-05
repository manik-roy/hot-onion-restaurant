import React, { useState, useEffect, useContext } from 'react';
import './FoodDetails.css'
import { useParams, Link, Redirect } from 'react-router-dom';
import { UserContext } from '../auth/useAuth';
import axios from 'axios'
import Loading from '../utils/Loading';

const FoodDetails = (props) => {                   
  const {addToCart, setUser, user, addCatDatabase } = useContext(UserContext)
  const pdId = useParams()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  // const [userInfo, setUserInfo] = useState(null)
  useEffect(()=>{
    async function getFoods() {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/foods/${pdId.id}`);
        setProduct(response.data.data.food)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }
   getFoods() 
  
  },[pdId])
  // get user profile
  useEffect(()=>{
    async function getUserInfo() {
      try {
        console.log('userrrrr**', `http://localhost:3000/api/v1/users/email/${user.email}`);

        // const response = await axios.get(`http://localhost:3000/api/v1/users/email/${user.email}`);
        // console.log('userrrrr**', response.data.data.user);
        console.log(user);
        
        
      } catch (error) {
       
      }
    }
    getUserInfo() 
  
  },[])

  // onchange handler
  const onchangeHandler = e => {
    if(!isNaN(e.target.value)) {
      setQuantity(e.target.value)
    }
  }

  
  const cartHandler = item => {
    
    if(!user) {
      props.history.push('/login')
    } else {
    // console.log(id);
    addToCart({...item, quantity})
    addCatDatabase(item, quantity, user);
    props.history.push('/cart')
    }
  }

  const quantityHandler = quan => {
    if(quantity < 0 || quantity === 0) {
      setQuantity(0)
    } else {
      setQuantity(quantity-quan)
    }
  }

  if(isLoading) {
    return <Loading/>
  }

  return (
    <>
    {product ? (
    <section className="food-details pt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 py-5">
            <div className="food-details-content">
              <h3>{product && product.title}</h3>
              <p className="subtitle muted pt-3">{product && product.description}</p>
            <div className="cart-item d-flex align-items-center p-3">
              <h3>${product && product.price}</h3>
              <div className="input-group input-cart-item ml-4">
                <button 
                  className="btn btn-default" 
                  onClick={()=>quantityHandler(1)}
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
            <img src={product && product.img} className="food-img m-auto d-block" alt=""/>
          </div>
        </div>
      </div>
    </section>
  )
    : (
      <div className="container  not-found-aria">
        <div className="row ">
          <div className="col not-found-content text-center">
            <h1>Invalid Product data</h1>
            <h3>Something went wrong</h3>
            <p>We're deeply sorry, there are no product about this data</p>
            <Link to="/foods">See our foods.</Link>
          </div>
        </div>
      </div>
    )
  }
    </>
  );
};

export default FoodDetails;


