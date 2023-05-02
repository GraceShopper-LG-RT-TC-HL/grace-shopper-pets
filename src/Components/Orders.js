import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { orders, products } = useSelector((state) => state);

  return (
    <div>
      <h1>Order History</h1>
      <ul className="order-list">
        {orders.map((order) => {
          return (
            <li key={order.id} className="order-item">
              <Link to={`/orders/${order.id}`} className="order-link">
                Order ID: {order.id}
              </Link>
              <br></br>
              <span className="order-date">
                Date: {order.createdAt.slice(0, 10)}
              </span>
              <br></br>
              <span className="order-total">
                Total: $
                {order.lineItems.reduce((total, lineItem) => {
                  const product = products.find(
                    (p) => p.id === lineItem.productId
                  );
                  return total + product.price * lineItem.quantity;
                }, 0)}
              </span>
              <br></br>
              <ul className="line-item-list">
                {order.lineItems.map((lineItem) => {
                  const product = products.find(
                    (p) => p.id === lineItem.productId
                  );
                  return (
                    <li key={lineItem.id} className="line-item">
                      <span className="product-name">
                        Product Name: {product.name}
                      </span>
                      <br></br>
                      <span className="product-quantity">
                        Quantity: {lineItem.quantity}
                      </span>
                      <br></br>
                      <span className="product-price">
                        Price: ${product.price}
                      </span>
                      <br></br>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Orders;
