import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/Page/HomePage';
import SignUp from '../src/components/auth/SignUp/SignUp'
import Login from '../src/components/auth/Login/Login'
import Cart from './components/Cart/Cart';
import NotFoundPage from './components/Page/NotFoundPage';
import FoodDetails from './components/Food/FoodDetails';
import { UserProvider } from './components/auth/useAuth';
import UserProfile from './components/Page/UserProfile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Checkout from './components/Cart/Checkout';

function App() {
  return (
   <UserProvider>
    <Header/>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/signup" component={SignUp} />  
      <Route path="/login" component={Login} />
      <PrivateRoute path="/cart">
            <Cart />
      </PrivateRoute>
      <PrivateRoute path="/checkout">
            <Checkout />
      </PrivateRoute>
      <Route path="/food/:id" component={FoodDetails} />
      <Route path="/user/profile" component={UserProfile} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
   </UserProvider>
  );
}

export default App;
