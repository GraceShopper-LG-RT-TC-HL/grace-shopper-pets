import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store';

const Products = () => {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState({});

  const handleAddToCart = (product) => {
    dispatch(addToCart(product, quantities[product.id]));
    setQuantities({ ...quantities, [product.id]: 0 });
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities({ ...quantities, [productId]: quantity });
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => {
          const quantity = quantities[product.id] || 0;
          return (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <h3>${product.price}</h3>
              <h4>{product.description}</h4>
              <form onSubmit={(e) => { e.preventDefault(); handleAddToCart(product) }}>
                <input
                  type="number"
                  name={`quantity-${product.id}`}
                  min="0"
                  max="10"
                  value={quantity}
                  onChange={(ev) => handleQuantityChange(product.id, Number(ev.target.value))}
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
