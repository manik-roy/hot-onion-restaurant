import React, { createContext, useState, useEffect, useRef } from "react";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import firebaseConfig from "../firebase.config";

firebase.initializeApp(firebaseConfig)

let Context = null
const { Provider, Consumer } = Context = createContext()


// get user profile information
const firestore = firebase.firestore()
const getUserProfile = (user) => {
  const userRef = firestore.collection("users").doc(user.uid);

  return userRef.get()
    .then(res => {
      if (res.exists) {
        return res.data();
      }  
    })
    .catch( error => console.log(error));
}

// save user info in firestore
const createUserProfile = (authUser, name) => {

  if (authUser) {
    const usersRef = firestore.doc(`users/${authUser.user.uid}`)
    return usersRef.get()
      .then(res => {
        if (!res.exists) {
          usersRef.set({
            name,
            email: authUser.user.email
          })
        }
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }
 
}

const UserProvider = (props) => {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  // sign up user
  const login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        setUser({email:response.email})
        return response;
      })
      .catch(err => {
        console.log(err);

      })
  }

  // register user with email and password
  const registerUserWithEmailPassword = (email, password, name) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        createUserProfile(response, name)
        .then(() => {
          const createdUser = { name, email }
          setUser(createdUser)
        })

        return response;
      })
      .catch(err => {
        alert('Something went wrong please try again')
      })
  }


  // initial time fetch user
  useEffect(() => {    
    firebase.auth().onAuthStateChanged(function (loginUser) {
        if(loginUser) {
          
            setUser({email:loginUser.email})
         
         
        }
    });
  }, [])
  // get user  time fetch user


  // logout user
  const logout = () => {
    firebase.auth().signOut().then(function () {
      setUser(null)
      

    }).catch(function (error) {
      console.log(error);
    })
  }

  const addToCart = item => {
    let isExist = cart.find(e => e.id  === item.id)
   if(!isExist) {
      let updateCart = [...cart, item]
      setCart(updateCart)
   } else {
     isExist.quantity = isExist.quantity + item.quantity
     let index = cart.indexOf(isExist.id)
     cart[index] = isExist
     let updateCart = [...cart]
      setCart(updateCart)    
   }
   
  }

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
        checkOutOrder
      }
    }>
      {props.children}
    </Provider>
  )

}

export { UserProvider, Consumer as UserConsumer, Context as UserContext };