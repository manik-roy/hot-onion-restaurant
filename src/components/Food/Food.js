import React, { useState, useEffect } from 'react';
import foods from '../../fakeData/data';
import './Food.css'
import FoodItem from './FoodItem';
const Food = () => {

    const [activeCatagories, setActiveCatagories] = useState(
        {
            lunchActive: true,
            dinnerActive: false,
            breakfastActive: false
        }
    )
    // item select category
    const [selectedItem, setSelectedItem] = useState('lunch')
    //  initials set data 
    const [items, setItems] = useState([])

    useEffect(() => {
        const data = foods.filter(item => item.catagories === selectedItem)
        setItems(data)
    }, [selectedItem])

    // conditionally set data when click catagories
    const selectHandler = item => {
        if (item === 'breakfast') {
            let previousState = activeCatagories;
            previousState.breakfastActive = true
            previousState.lunchActive = false
            previousState.dinnerActive = false
            setActiveCatagories(previousState)
        } else if (item === 'dinner') {
            let previousState = activeCatagories;
            previousState.breakfastActive = false
            previousState.lunchActive = false
            previousState.dinnerActive = true
            setActiveCatagories(previousState)
        } else if (item === 'lunch') {
            let previousState = activeCatagories;
            previousState.breakfastActive = false
            previousState.lunchActive = true
            previousState.dinnerActive = false
            setActiveCatagories(previousState)
        }
        setSelectedItem(item)
    }

    const { lunchActive, dinnerActive, breakfastActive } = activeCatagories;

    return (
        <section className="food-catagories-aria">
            <div className="container">
                <div className="row">
                    <div className="catagories m-auto py-5">
                        <ul className="d-flex ">
                            <li><button className={breakfastActive ? 'active btn' : 'btn'}
                                onClick={() => selectHandler('breakfast')}
                            >Breakfast</button></li>
                            <li><button className={lunchActive ? 'active btn' : 'btn'}
                                onClick={() => selectHandler('lunch')}
                            >Lunch</button></li>
                            <li><button className={dinnerActive ? 'active btn' : 'btn'}
                                onClick={() => selectHandler('dinner')}
                            >Dinner</button></li>
                        </ul>
                    </div>
                </div>
                <div className="row food-items">
                    {items.map(item => <FoodItem key={item.id} item={item} />)}
                    <div className="w-100"></div>
                    <div className="checkout-btn-aria m-auto">
                        <button className="btn checkout-btn  my-4 text-center text-capitalize">Checkout your food</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Food;