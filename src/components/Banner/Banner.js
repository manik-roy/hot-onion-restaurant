import React, { useContext } from 'react';
import { UserContext } from '../auth/useAuth';
import './Banner.css'
const Banner = () => {
  const { search, setSearch } = useContext(UserContext);
  return (
    <section className="banner-aria">
      <div className="container">
        <div className="row">
          <div className="col text-center banner-content">
            <h2>Best food waiting for your belly</h2>
            <div className="banner-input">
              <input type="text" value={search} onChange={(e)=> setSearch(e.target.value.trim() )} placeholder="Search food items" />
              <button className="btn primary-btn">Search</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;