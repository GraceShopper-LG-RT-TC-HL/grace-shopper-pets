import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCart } from '../store';

const GuestCart = () => {
  const { cart } = useSelector((state) => state);
  const [quantity, setQuantity] = useState('');
  const dispatch = useDispatch();

  const updateQuantity = (ev, product) => {
    ev.preventDefault();
    dispatch(updateCart({ product, quantity: Number(quantity) }));
  };
  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.lineItems.map((line, index) => {
          return (
            <li key={index}>
              <h2>{line.product.name}</h2>
              <h3>${line.product.price}</h3>
              <h4>Quantity: {line.quantity}</h4>
              <img
                src={line.product.imgUrl}
                alt={line.product.name}
              />
              <button onClick={() => dispatch(removeFromCart(line))}>
                Remove
              </button>

              <form onSubmit={(ev) => updateQuantity(ev, line.product)}>
                <input
                  type='number'
                  name={`quantity-${line.product.id}`}
                  min='0'
                  max='10'
                  value={quantity}
                  onChange={(ev) => setQuantity(ev.target.value)}
                />
                <button>Update Quantity</button>
              </form>
            </li>
          );
        })}
      </ul>
      <h3>
        Total: $
        {cart.lineItems.reduce((total, lineItem) => {
          return total + lineItem.product.price * lineItem.quantity;
        }, 0)}
      </h3>
    </div>
  );
};

export default GuestCart;
