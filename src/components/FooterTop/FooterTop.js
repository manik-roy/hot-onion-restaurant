import React from 'react';
import './FooterTop.css'
const FooterTop = () => {
  return (
    <section className="footer-top-area py-5">
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="img-area">
              <img src="https://i.ibb.co/7V4xYJr/logo.png" alt="" />
            </div>
          </div>
          <div className="col-xl-6 d-flex footer-top-menu-aria">
            <div>
              <ul>
                <li><a href="#">About Online food</a></li>
                <li><a href="#">Read Our Blog</a></li>
                <li><a href="#">Sign up to deliver</a></li>
                <li><a href="#">Add your restaurant</a></li>
              </ul>
            </div>
            <div>
              <ul>
                <li><a href="#">Get help</a></li>
                <li><a href="#">Red FAQs</a></li>
                <li><a href="#">View all cities</a></li>
                <li><a href="#">Restaurant near me</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterTop;