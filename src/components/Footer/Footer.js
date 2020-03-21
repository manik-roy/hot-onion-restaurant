import React from 'react';
import './Footer.css'
const Footer = () => {
  return (
    <footer>
      <div class="container">
        <div class="row d-flex align-items-center justify-content-between">
          <div class="col-6">
            <div class="copyright">
              <p class="pt-3">Copyright &copy; online food </p>
            </div>
          </div>
          <div class="col-6">
            <div class="footer-menu">
              <ul class="d-flex">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of use</a></li>
                <li><a href="#">Pricing</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;