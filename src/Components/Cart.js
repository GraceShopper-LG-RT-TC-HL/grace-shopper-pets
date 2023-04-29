import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCart } from '../store';
import OrderForm from './OrderForm';

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState(
    cart.lineItems.reduce((acc, lineItem) => {
      acc[lineItem.product.id] = lineItem.quantity;
      return acc;
    }, {})
  );

  const handleAddToCart = (product) => {
    dispatch(updateCart({ product, quantity: quantities[product.id] }));
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities({ ...quantities, [productId]: quantity });
  };

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.lineItems.map((lineItem) => {
          const product = lineItem.product;
          const quantity = quantities[product.id] || lineItem.quantity;
          return (
            <li key={lineItem.id}>
              <h2>{product.name}</h2>
              <h3>${product.price}</h3>
              <h4>Quantity: {quantity}</h4>
              <img src={product.imgUrl} alt={product.name} />
              <button onClick={() => dispatch(removeFromCart(lineItem))}>
                Remove
              </button>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddToCart(product);
                }}
              >
                <input
                  type="number"
                  name={`quantity-${product.id}`}
                  min="0"
                  max="10"
                  value={quantity}
                  onChange={(ev) =>
                    handleQuantityChange(product.id, Number(ev.target.value))
                  }
                />
                <button type="submit">Update Quantity</button>
              </form>
            </li>
          );
        })}
      </ul>
      <h3>
        Total: $
        {cart.lineItems.reduce((total, lineItem) => {
          return (
            total + lineItem.product.price * quantities[lineItem.product.id]
          );
        }, 0)}
      </h3>
      <OrderForm />
    </div>
  );
};

export default Cart;
