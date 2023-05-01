import React, { useState, useEffect } from 'react';

const GuestCart = () => {
  const [lines, setLines] = useState(
    JSON.parse(window.localStorage.getItem('cart')).lines
  );
  const [quantity, setQuantity] = useState('');

  const removeLine = (line) => {
    setLines(lines.filter((_line) => _line.product.id !== line.product.id));
  };

  const updateQuantity = (ev, prodId) => {
    ev.preventDefault();
    setLines(
      lines.map((_line) => {
        if (_line.product.id === prodId) {
          _line.quantity = Number(quantity);
        }
        return _line;
      })
    );
    console.log(lines);
    window.localStorage.setItem('cart', JSON.stringify({ lines }));
  };
  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {lines.map((line, index) => {
          return (
            <li key={index}>
              <h2>{line.product.name}</h2>
              <h3>${line.product.price}</h3>
              <h4>Quantity: {line.quantity}</h4>
              <img
                src={line.product.imgUrl}
                alt={line.product.name}
              />
              <button onClick={() => removeLine(line)}>Remove</button>

              <form onSubmit={(ev) => updateQuantity(ev, line.product.id)}>
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
        {lines.reduce((total, lineItem) => {
          return total + lineItem.product.price * lineItem.quantity;
        }, 0)}
      </h3>
    </div>
  );
};

export default GuestCart;
