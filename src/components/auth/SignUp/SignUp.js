import React from 'react';
import InputItem from '../InputItem/InputItem';
import './SignUp.css'
const SignUp = () => {
  return (
    <section className="sign-up">
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-3 m-auto">
          <div className="sign-up-aria-logo py-5 m-auto">
            <img className="w-50 d-block m-auto" src="https://i.ibb.co/Snjf3fp/logo2.png" alt=""/>
          </div>
          <form onSubmit>
            <InputItem name="name" type="text" placeholder="Name" />
            <InputItem name="email" type="email" placeholder="Email" />
            <InputItem name="password" type="password" placeholder="Password" />
            <InputItem name="confirmPassword" type="password" placeholder="Confirm Password" />
            <button type="submit" className="btn sign-up-btn w-100">Submit</button>
          </form>
          <p className="text-center py-2 has-account"><a href="/login">Already have an account</a></p>
        </div>
      </div>
    </div>
  </section>
  );
};

export default SignUp;