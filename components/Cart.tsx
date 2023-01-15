import React from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { reduceCartItemQuantity, increaseCartItemQuantity, getTotalItems, getTotalPrice, removeCartItem, toggleCartDisplay } from 'redux/features/cartSlice';

const Cart = () => {
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector(state => state.cart.items)
    const totalItems = useAppSelector(getTotalItems)
    const totalPrice = useAppSelector(getTotalPrice)

    const handleCheckout = async () => {
        const stripe = await getStripe();

        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItems),
        });

        if (response.status === 500) return;

        const data = await response.json();

        toast.loading('Redirecting...');

        stripe.redirectToCheckout({ sessionId: data.id });
    }

    return (
        <div className="cart-wrapper" >
            <div className="cart-container">
                <button
                    type="button"
                    className="cart-heading"
                    onClick={() => dispatch(toggleCartDisplay())}>
                    <AiOutlineLeft />
                    <span className="heading">Your Cart</span>
                    <span className="cart-num-items">({totalItems} items)</span>
                </button>

                {
                    totalItems === 0 ? (
                        <div className="empty-cart">
                            <AiOutlineShopping size={150} />
                            <h3>Your shopping bag is empty</h3>
                            <Link href="/">
                                <button
                                    type="button"
                                    onClick={() => dispatch(toggleCartDisplay())}
                                    className="btn"
                                >
                                    Continue Shopping
                                </button>
                            </Link>
                        </div>
                    )
                        :
                        <>
                            <div className="product-container">
                                {
                                    cartItems.map((item) => (
                                        <div className="product" key={item.product._id}>
                                            {/* @ts-expect-error */}
                                            <img src={urlFor(item.product?.image[0])} className="cart-product-image" />
                                            <div className="item-desc">
                                                <div className="flex top">
                                                    <h5>{item.product.name}</h5>
                                                    <h4>${item.product.price}</h4>
                                                </div>
                                                <div className="flex bottom">
                                                    <div>
                                                        <p className="quantity-desc">
                                                            <span
                                                                className="minus"
                                                                onClick={() => {
                                                                    dispatch(reduceCartItemQuantity({
                                                                        productId: item.product._id,
                                                                        quantity: 1
                                                                    }))
                                                                }}>
                                                                <AiOutlineMinus />
                                                            </span>
                                                            <span className="num" >{item.quantity}</span>
                                                            <span
                                                                className="plus"
                                                                onClick={() => {
                                                                    dispatch(increaseCartItemQuantity({
                                                                        quantity: 1,
                                                                        product: item.product
                                                                    }))
                                                                }}
                                                            >
                                                                <AiOutlinePlus />
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="remove-item"
                                                        onClick={() => {
                                                            dispatch(removeCartItem(item.product._id))
                                                        }}
                                                    >
                                                        <TiDeleteOutline />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>))
                                }
                            </div>
                            <div className="cart-bottom">
                                <div className="total">
                                    <h3>Subtotal:</h3>
                                    <h3>${totalPrice}</h3>
                                </div>
                                <div className="btn-container">
                                    <button type="button" className="btn" onClick={handleCheckout}>
                                        Pay with Stripe
                                    </button>
                                </div>
                            </div>
                        </>}

            </div>
        </div>
    )
}

export default Cart