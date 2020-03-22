import React, { useContext } from 'react';
import './Header.css'
import { Link, withRouter } from 'react-router-dom'
import { UserContext } from '../auth/useAuth';


const LoginUser = ({route}) => {
    const {logout} = useContext(UserContext)
    const logOutHandler = () => {
        logout()
        route.history.push('/login')        
    }
    return (
        <>
            <Link to="/user/profile"><button className="btn primary-btn">Profile</button></Link>
            <button className="btn" onClick={logOutHandler}>Logout</button>
        </>
    )
}
const LogoutUser = () => {
    return (
        <>
            <Link to="/signup"><button className="btn primary-btn">Sign up</button></Link>
            <Link to="/login"><button className="btn">Login</button></Link>
        </>
    )
}

const Header = (props) => {
    const {user} = useContext(UserContext)

    return (
        <header>
            <div className="container">
                <div className="row d-flex align-items-center justify-content-between">
                    <div className="col">
                        <div className="logo-aria">
                            <Link to="/"><img src="https://i.ibb.co/Snjf3fp/logo2.png" alt="hot onion" /></Link>
                        </div>
                    </div>
                    <div className="col">
                        <div className="header-right">
                            <div className="d-flex">
                                {user ? <LoginUser route={props} /> : <LogoutUser/> }
                                <Link to="/cart"><button className="btn"> <i className="fa fa-cart-plus" aria-hidden="true"></i></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default withRouter(Header);