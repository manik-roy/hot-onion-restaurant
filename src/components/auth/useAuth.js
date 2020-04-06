import React, { createContext, useState, useEffect } from "react";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import firebaseConfig from "../firebase.config";
import axios from 'axios';
firebase.initializeApp(firebaseConfig)

let Context = null
const { Provider, Consumer } = Context = createContext()


const UserProvider = (props) => {

  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])

  // sign in user
  const login = async(email, password) => {
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      const userInfo = await axios.get(`http://localhost:3000/api/v1/users/email/${email}`);
      setUser({ ...userInfo.data.data.user })
      return response;
    } catch (error) {
      return error;
    }
  }


  //  register user with email and password
  const registerUserWithEmailPassword = async (email, password, name) => {
    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const createdUeser = await axios.post('http://localhost:3000/api/v1/users',{email, displayName:name});
      setUser(createdUeser.data.data.user)
      return response;
    } catch (error) {
      alert(error.message)
    }

  }


  // initial time fetch user
  useEffect(() => {

    firebase.auth().onAuthStateChanged(function (loginUser) {

      if (loginUser) {

        async function getUserProfile(email) {
          const response = await axios.get(`http://localhost:3000/api/v1/users/email/${email}`);
          console.log(`form signup componet =   `, response );
          
          setUser({ ...response.data.data.user })
        }
        getUserProfile(loginUser.email)

      }

    });
  }, [])


  // logout user
  const logout = () => {
    firebase.auth().signOut().then(function () {
      setUser(null)
      setCart(cart.length=0)
    }).catch(function (error) {
      console.log(error);
    })
  }

  // fetch cart data 
  useEffect(() => {
    async function getCarts() {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:3000/api/v1/carts/${user._id}`);
          if( response.data.data.cart.length > 0) {
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

  }, [])


  // add product to cart
  const addToCart = item => {
    
    let isExist = cart.find(e => e._id === item._id)
    if (!isExist) {
      item.proTotalPrice = item.quantity * item.price
      let updateCart = [...cart, item]
      setCart(updateCart)
    } else {
      isExist.quantity = isExist.quantity + item.quantity
      isExist.proTotalPrice = isExist.price * item.quantity
      let index = cart.indexOf(isExist.id)
      cart[index] = isExist
      let updateCart = [...cart]
      setCart(updateCart)
    }
  }


  // product quantity add remove

  const calculateQuantity = (item, event) => {
    console.log(item, 'event', event);
    console.log(item, 'event', event);

    let product = cart.find(e => e.productId === item.productId)
    product.quantity = product.quantity + event;
    product.proTotalPrice = product.price * product.quantity;
    if (product.quantity === 0) {
      let updateProduct = cart.filter(e => e.productId !== product.productId)
      // delete product
      axios.delete(`http://localhost:3000/api/v1/carts/${item._id}?user=${user._id}`)
      setCart(updateProduct)
    } else {
      // update product
      axios.put(`http://localhost:3000/api/v1/carts/${item._id}`, { quantity: product.quantity, user:user._id })
      let index = cart.indexOf(product.id);
      cart[index] = product
      let updateProduct = [...cart]
      setCart(updateProduct)
    }

  }

  /// add cart item in database
  function addCatDatabase(item, quantity, user) {
    const cartData = {
      carts: [{
        productId: item._id,
        title: item.title,
        subtitle: item.subtitle,
        description: item.subtitle,
        img: item.img,
        catagories: item.catagories,
        price: item.price,
        quantity: quantity,
        proTotalPrice: quantity * item.price
      }],
      user: user._id
    };
    axios.post('http://localhost:3000/api/v1/carts', cartData);
  }

  // place order and remove cart item
  const checkOutOrder = () => {
    setCart([])
  }


  return (
    <Provider value={
      {
        user,
        registerUserWithEmailPassword,
        login,
        logout,
        cart,
        addToCart,
        checkOutOrder,
        calculateQuantity,
        setUser,
        addCatDatabase,
        setCart
      }
    }>
      {props.children}
    </Provider>
  )

}

export { UserProvider, Consumer as UserConsumer, Context as UserContext };