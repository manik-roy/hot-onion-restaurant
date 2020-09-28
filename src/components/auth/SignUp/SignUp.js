import React, { useState, useContext } from 'react';
import InputItem from '../InputItem/InputItem';
import './SignUp.css'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../useAuth';
import Loading from '../../utils/Loading';
import GoogleSignIn from '../InputItem/GoogleSignIn';

const SignUp = () => {

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  console.log(from);
  const auth = useContext(UserContext)
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [isLoading, setIsLoading] = useState(false);

  const onchangeHandler = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  // submit handler
  const registerUser = async e => {
    e.preventDefault()
    const { name, email, password, confirmPassword } = user;
    if (password === confirmPassword) {
      setIsLoading(true)
      await auth.registerUserWithEmailPassword(email, password, name)
      history.push(from)
    } else {
      alert('Password mismatch')
    }
  }


  if (isLoading) {
    return <Loading />
  }

  if (auth.user && !isLoading) {
    return Redirect('/')
  } else {

    return (
      <section className="sign-up" id="sign-up-aria-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-md-offset-3 m-auto">
              <div className="sign-up-aria-logo py-5 m-auto">
                <img className="w-50 d-block m-auto" src="https://i.ibb.co/Snjf3fp/logo2.png" alt="" />
              </div>
              <form onSubmit={registerUser} autoComplete="off" >
                <InputItem autoFocus name="name" type="text" required placeholder="Name" onchangeHandler={onchangeHandler} value={user.name} />
                <InputItem name="email" type="email" required placeholder="Email" onchangeHandler={onchangeHandler} value={user.email} />
                <InputItem name="password" type="password" required placeholder="Password" onchangeHandler={onchangeHandler} value={user.password} />
                <InputItem name="confirmPassword" type="password" required placeholder="Confirm Password" onchangeHandler={onchangeHandler} value={user.confirmPassword} />
                <button type="submit" className="btn sign-up-btn w-100">Submit</button>
              </form>
              <p className="text-center py-2 has-account"><Link to="/login">Already have an account</Link></p>
              <div className="w-100 mt-5">
                <GoogleSignIn />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default SignUp;