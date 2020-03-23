import React, { useState, useEffect } from 'react';
import foods from '../../fakeData/foodData';
import FoodItem from '../Food/FoodItem';

const Foods = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
      setItems(foods)
  }, [])
  return (
    <div className="container">
      <div className="row food-items">
      {items.map(item => <FoodItem key={item.id} item={item} />)}
    </div>
    </div>
  );
};

export default Foods;