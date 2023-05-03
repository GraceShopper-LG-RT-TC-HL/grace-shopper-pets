import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import AddReview from './AddReview';

const Order = () => {
  const { orders, products } = useSelector((state) => state);
  const { id } = useParams();
  const order = orders.find((order) => order.id === id);

  if (!order) {
    return null;
  }
  return (
    <div>
      <h1>Order Details</h1>
      <p>
        Order #: {order.id} <br />
        Date: {order.createdAt.slice(0, 10)};
      </p>
      <h3>
        Total: $
        {order.lineItems.reduce((total, lineItem) => {
          const product = products.find((p) => p.id === lineItem.productId);
          return total + product.price * lineItem.quantity;
        }, 0)}
      </h3>
      <ul>
        {order.lineItems.map((lineItem) => {
          const product = products.find((p) => p.id === lineItem.productId);
          return (
            <li key={lineItem.id}>
              Product Name: {product.name}, Price: ${product.price}, Quantity:{' '}
              {lineItem.quantity}
              <br />
              <Link to={`/products/${product.id}/reviews/new`}><button>Leave a Review</button></Link>
              
              <img src={product.imgUrl} />
            </li>
          );
        })}
      </ul>
      
    </div>
  );
};

export default Order;
