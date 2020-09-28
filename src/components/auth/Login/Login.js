import React, { useState, useContext } from 'react';
import './login.css'
import InputItem from '../InputItem/InputItem';
import { Link, withRouter, Redirect, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../useAuth';
import Loading from '../../utils/Loading';
import GoogleSignIn from '../InputItem/GoogleSignIn';

const Login = (props) => {

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  
  const auth = useContext(UserContext)
  const [user, setUser] = useState({
    email: 'mkmanik9889@gmail.com',
    password: '123456'
  })

  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false);

  // input field handler
  const onchangeHandler = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })

  }

  // form submit handler
  const loginUser = e => {
    setIsLoading(true)
    e.preventDefault()
    auth.login(user.email, user.password)
      .then(res => {
        if (res.user) {
          history.replace(from)
        } else {
          setIsLoading(false)
          setError(res)
        }
      })
  }

  if (auth.user) {
    return Redirect('/')
  } else {

    if (isLoading) {
      return <Loading />
    } else {
      return (
        <section className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-md-offset-3 m-auto">
                <div className="login-aria-logo py-5 m-auto">
                  <img className="w-50 d-block m-auto" src="https://i.ibb.co/Snjf3fp/logo2.png" alt="" />
                </div>
                <form onSubmit={loginUser}>
                  <InputItem name="email" autoFocus required type="email" onchangeHandler={onchangeHandler} placeholder="Email" value={user.email} />
                  <InputItem name="password" required type="password" onchangeHandler={onchangeHandler} placeholder="Password" value={user.password} />
                  <button type="submit" className="btn login-btn w-100">Log In</button>
                </form>
                {error.message && <p className="py-2">{error.message}</p>}
                <p className="text-center py-2 no-account">Don't have an account?<Link to={{ pathname: '/signup', state: { from: from.pathname } }}> Sign up</Link></p>
                <div className="w-100 mt-5">
                  <GoogleSignIn />
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }
};

export default withRouter(Login);
