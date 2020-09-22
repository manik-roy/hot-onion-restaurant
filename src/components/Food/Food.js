import React, { useState, useEffect, useContext } from 'react';
import './Food.css'
import FoodItem from './FoodItem';
import { UserContext } from '../auth/useAuth'
import { withRouter } from 'react-router-dom';
import axios from 'axios'
const Food = (props) => {
    const { cart, setCart, user } = useContext(UserContext)
    const [disabled, setDisabled] = useState(true)
    const [foods, setFoods] = useState([]);

    // Fetch foods form server
    useEffect(() => {
        async function getFoods() {
            try {
                const response = await axios.get('https://hot-onion.herokuapp.com/api/v1/foods');
                console.log(response.data.data.foods);
                setFoods(response.data.data.foods)
            } catch (error) {
                console.error(error);
            }
        }
        getFoods()
    }, [])

    // fetch cart data 
    useEffect(() => {
        async function getCarts() {
            if (user) {
                try {
                    const response = await axios.get(`https://hot-onion.herokuapp.com/api/v1/carts/${user._id}`);
                    if (response.data.data.cart.length > 0) {
                        setCart(response.data.data.cart[0].carts)
                    } else {
                        console.log(response.data.data.cart);
                        setCart(response.data.data.cart)
                    }
                } catch (error) {
                    console.log('carts item from auth ', error);
                }
            }
        }
        getCarts()

    }, [setCart, user])

    useEffect(() => {
        if (cart.length > 0) {
            setDisabled(false)
        }
    }, [cart])


    // item select category
    const [selectedItem, setSelectedItem] = useState('lunch')

    //  initials set data 
    const [items, setItems] = useState([])

    useEffect(() => {
        const data = foods.filter(item => item.catagories === selectedItem)
        setItems(data)
    }, [selectedItem, foods])


    return (
        <section className="food-catagories-aria">
            <div className="container">
                <div className="row">
                    <div className="catagories m-auto py-5">
                        <ul className="d-flex ">
                            <li><button className={selectedItem ==='breakfast' ? 'active btn' : 'btn'}
                                onClick={() => setSelectedItem('breakfast')}
                            >Breakfast</button></li>
                            <li><button className={selectedItem ==='lunch' ? 'active btn' : 'btn'}
                                onClick={() => setSelectedItem('lunch')}
                            >Lunch</button></li>
                            <li><button className={selectedItem ==='dinner' ? 'active btn' : 'btn'}
                                onClick={() => setSelectedItem('dinner')}
                            >Dinner</button></li>
                        </ul>

                    </div>
                    <div className="f-right d-flex align-items-center text-danger">
                        <p className="see-all" onClick={() => props.history.push('/foods')} >See All</p>
                    </div>
                </div>
                <div className="row food-items">
                    {items.map(item => <FoodItem key={item._id} item={item} />)}
                    <div className="w-100"></div>
                    <div className="checkout-btn-aria m-auto">
                        <button
                            onClick={() => props.history.push('/cart')}
                            className={disabled ? 'btn disabled my-4 text-center text-capitalize' : 'btn checkout-btn  my-4 text-center text-capitalize'}
                            disabled={disabled} >Checkout your food</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default withRouter(Food);