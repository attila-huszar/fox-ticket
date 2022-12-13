import React from 'react';
import logo from './logo.svg';
import './Landing.scss';
import Shop from '../shop/Shop';
import Cart from '../cart/Cart';

export default function Landing() {
  return (
    <div className="Landing">
      <Shop/>           
      <Cart/>           
    </div>
  );
}
