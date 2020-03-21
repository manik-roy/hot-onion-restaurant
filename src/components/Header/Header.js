import React from 'react';
import './Header.css'
const Header = () => {
  return (
    <header>
        <div className="container">
            <div className="row d-flex align-items-center justify-content-between">
                <div className="col">
                    <div className="logo-aria">
                        <img src="https://i.ibb.co/Snjf3fp/logo2.png" alt="hot onion"/>
                    </div>
                </div>
                <div className="col">
                    <div className="header-right">
                        <div className="d-flex">
                            <button className="btn primary-btn">Sign up</button>
                            <button className="btn">Login</button>
                            <button className="btn"> <i className="fa fa-cart-plus" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
};

export default Header;