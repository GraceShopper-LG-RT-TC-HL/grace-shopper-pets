import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import { Link } from 'react-router-dom';
import {
  fetchProducts,
  addToCart,
  removeFromCart,
  updateLineItem,
} from '../store';

const Products = () => {
  const { products } = useSelector((state) => state);
  const { cart } = useSelector((state) => state);
  const { lineItems } = useSelector((state) => state);
  const [productQuantities, setProductQuantities] = useState({});

  const dispatch = useDispatch();

  const handleProduct = (product) => {
    try {
      const lineItem = cart.lineItems.find(
        (lineItem) => lineItem.productId === product.id
      );
      const quantity = productQuantities[product.id];
      if (lineItem) {
        dispatch(
          updateLineItem({
            ...lineItem,
            quantity: parseInt(quantity),
          })
        );
      } else if (quantity === 0) {
        dispatch(removeFromCart(product));
      } else {
        console.log('product', product);
        dispatch(addToCart({ ...product, quantity: parseInt(quantity) }));
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleQuantityChange = (productId, value) => {
    setProductQuantities({
      ...productQuantities,
      [productId]: value,
    });
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <h3>${product.price}</h3>
              <h4>{product.description}</h4>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleProduct(product);
                }}
              >
                <input
                  type="number"
                  name={`quantity-${product.id}`}
                  min="0"
                  max="10"
                  value={productQuantities[product.id] || 0}
                  onChange={(ev) =>
                    handleQuantityChange(product.id, ev.target.value)
                  }
                />
                <button type="submit">Add to Cart</button>
              </form>
              <img src={product.imgUrl} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Products;
