import React from 'react';
import './login.css'
import InputItem from '../InputItem/InputItem';
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <section className="login">
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-3 m-auto">
          <div className="login-aria-logo py-5 m-auto">
            <img className="w-50 d-block m-auto" src="https://i.ibb.co/Snjf3fp/logo2.png" alt=""/>
          </div>
          <form>
            <InputItem name="email" type="email" placeholder="Email" />
            <InputItem name="password" type="password" placeholder="Password" />
            <button type="submit" className="btn login-btn w-100">Log In</button>
          </form>
          <p className="text-center py-2 no-account">Don't have an account?<Link to="/signup"> Sign up</Link></p>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Login;
