import React, { useState, useEffect } from 'react';
import FoodItem from '../Food/FoodItem';
import axios from 'axios'
import Loading from '../utils/Loading';
const Foods = () => {
  const [items, setItems] = useState([])

    const [isLoading, setIsLoading] = React.useState(false);
    // Fetch foods form server
    useEffect(()=>{
      async function getFoods() {
        setIsLoading(true)
          try {
            const response = await axios.get('https://hot-onion.herokuapp.com/api/v1/foods');
            console.log(response.data.data.foods);
            setItems(response.data.data.foods)
            setIsLoading(false)
          } catch (error) {
            console.error(error);
            setIsLoading(false)
          }
        }
       getFoods() 
  },[])
  if(isLoading) {
    return <Loading/>
  }
  return (
    <div className="container">
      <div className="row food-items">
      {items.map(item => <FoodItem key={item._id} item={item} />)}
    </div>
    </div>
  );
};

export default Foods;