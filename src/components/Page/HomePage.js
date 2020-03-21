import React from 'react';
import Banner from '../Banner/Banner';
import Food from '../Food/Food';
import ChooseUs from '../ChooseUs/ChooseUs';
import FooterTop from '../FooterTop/FooterTop';
import Footer from '../Footer/Footer';

const HomePage = () => {
  return (
    <>
      <Banner/>
      <Food/>
      <ChooseUs/>
      <FooterTop/>
      <Footer/>
    </>
  );
};

export default HomePage;