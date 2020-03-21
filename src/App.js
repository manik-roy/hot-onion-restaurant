import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Food from './components/Food/Food';
import ChooseUs from './components/ChooseUs/ChooseUs';

function App() {
  return (
   <>
    <Header/>
    <Banner/>
    <Food/>
    <ChooseUs/>
   </>
  );
}

export default App;
