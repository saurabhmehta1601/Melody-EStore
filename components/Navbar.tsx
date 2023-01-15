import React, { useContext } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import Cart from './Cart';
import { useStateContext } from '../context/StateContext';
import { useAppSelector } from 'hooks/redux';
import { getTotalItems } from 'redux/features/cartSlice';

const Navbar = () => {
  const totalItems = useAppSelector(getTotalItems)
  const { showCart, setShowCart } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">JSM Headphones</Link>
      </p>

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalItems}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar