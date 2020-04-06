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
import Foods from './components/Page/Foods';
import { toast } from 'react-toastify';

toast.configure({
 autoClose: 1000,
 draggable: false,
      
});

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
      <Route exact path="/foods/" component={Foods} />
      <Route path="/foods/:id" component={FoodDetails} />
      <PrivateRoute path="/user/profile">
            <UserProfile />
      </PrivateRoute>
      <Route path="*" component={NotFoundPage} />
    </Switch>
   </UserProvider>
  );
}

export default App;
