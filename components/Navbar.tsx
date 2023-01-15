import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import Cart from './Cart';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getTotalItems, toggleCartDisplay } from 'redux/features/cartSlice';

const Navbar = () => {
  const dispatch = useAppDispatch()
  const totalItems = useAppSelector(getTotalItems)
  const shouldShowCart = useAppSelector(state => state.cart.shouldShow)

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">JSM Headphones</Link>
      </p>

      <button type="button" className="cart-icon" onClick={() => dispatch(toggleCartDisplay())}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalItems}</span>
      </button>

      {shouldShowCart && <Cart />}
    </div>
  )
}

export default Navbar