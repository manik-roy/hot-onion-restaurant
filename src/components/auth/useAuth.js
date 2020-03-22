import React, { createContext, useState, useEffect, useRef } from "react";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBBJutfQyeKcpXzBMtwnR-oVfjE52k1ycg",
  authDomain: "e-restaurant-27e3c.firebaseapp.com",
  databaseURL: "https://e-restaurant-27e3c.firebaseio.com",
  projectId: "e-restaurant-27e3c",
  storageBucket: "e-restaurant-27e3c.appspot.com",
  messagingSenderId: "775972226674",
  appId: "1:775972226674:web:38e8b11db66079c1a1e4eb",
  measurementId: "G-YV97PHHLX1"
};

firebase.initializeApp(firebaseConfig)

let Context = null
const { Provider, Consumer } = Context = createContext()


// get user profile information
const firestore = firebase.firestore()
firestore.collection('users').doc('bM0d8vhZnFMbwmFzaSbU')

const createUserProfile = (authUser, name) => {
  
  if(authUser) {
    const usersRef = firestore.doc(`users/${authUser.user.uid}`)
    usersRef.get()
      .then(res => {
        if(!res.exists) {
          return usersRef.set({
            name,
            email:authUser.user.email
          })
        }
      })
      .then((res) => {
        console.log('user created successfully', res);
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  } 
}

const UserProvider = (props) => {
  const [user,setUser] = useState(null)

  const signUpWithEmailPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
        
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
        const createdUser = {name, email}
        setUser(createdUser)
      })
      .catch(err => {
        alert('Something went wrong please try again')
      })
  }

  useEffect(()=> {
    firebase.auth().onAuthStateChanged(function(loginUser) {
      if (loginUser) {
        const {email} = loginUser;
        const updateUser = {email}
        setUser(updateUser)
        console.log(user);
        
      } else {
        console.log('form use state, no user', user);
      }
    });
  },[])


  const logout = () => {
    firebase.auth().signOut().then(function() {
      setUser(null)
    }).catch(function(error) {
     console.log(error);
    })
  }

  const addToCart = item => {
    const user = { ...this.state.user }
    user.language.push(item)
    this.setState({ user })
  }
    return (
      <Provider value={
        {
          user,
          registerUserWithEmailPassword,
          signUpWithEmailPassword,
          logout,
          addToCart,
        }
      }>
        {props.children}
      </Provider>
    )
  
}

export { UserProvider, Consumer as UserConsumer, Context as UserContext };