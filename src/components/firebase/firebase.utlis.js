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
export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GithubAuthProvider();
provider.setCustomParameters({prompt:'Select a Account'})

export const signInWithGoogle = () => auth.signInWithPopup(provider);




export default firebase;