import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Food from './components/Food/Food';
import ChooseUs from './components/ChooseUs/ChooseUs';
import FooterTop from './components/FooterTop/FooterTop';
import Footer from './components/Footer/Footer';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/Page/HomePage';
import SignUp from '../src/components/auth/SignUp/SignUp'
import Login from '../src/components/auth/Login/Login'
function App() {
  return (
   <>
    <Header/>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/signup" component={SignUp} />  
      <Route path="/login" component={Login} />  
    </Switch>
   </>
  );
}

export default App;
