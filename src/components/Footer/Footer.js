import React from 'react';
import './Footer.css'
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row d-flex align-items-center justify-content-between">
          <div className="col-6">
            <div className="copyright">
              <p className="pt-3">Copyright &copy; online food </p>
            </div>
          </div>
          <div className="col-6">
            <div className="footer-menu">
              <ul className="d-flex">
                <li><a href="/">Privacy Policy</a></li>
                <li><a href="/">Terms of use</a></li>
                <li><a href="/">Pricing</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;