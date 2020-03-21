import React from 'react';
import './Header.css'
import {Link} from 'react-router-dom'
const Header = () => {
  return (
    <header>
        <div className="container">
            <div className="row d-flex align-items-center justify-content-between">
                <div className="col">
                    <div className="logo-aria">
                        <Link to="/"><img src="https://i.ibb.co/Snjf3fp/logo2.png" alt="hot onion"/></Link>
                    </div>
                </div>
                <div className="col">
                    <div className="header-right">
                        <div className="d-flex">
                            <Link to="/signup"><button className="btn primary-btn">Sign up</button></Link>
                            <Link to="/login"><button className="btn">Login</button></Link>
                            <Link to="/cart"><button className="btn"> <i className="fa fa-cart-plus" aria-hidden="true"></i></button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
};

export default Header;