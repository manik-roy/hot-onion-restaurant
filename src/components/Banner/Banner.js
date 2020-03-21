import React from 'react';
import './Banner.css'
const Banner = () => {
  return (
    <section class="banner-aria">
      <div class="container">
        <div class="row">
            <div class="col text-center banner-content">
                <h2>Best food waiting for your belly</h2>
                <div class="banner-input">
                    <input type="text" placeholder="Search food items"/>
                    <button class="btn primary-btn">Search</button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;