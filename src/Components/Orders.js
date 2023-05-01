import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

const Orders = ()=> {
  const { orders, products } = useSelector(state => state);

  return (
    <div>
        <h1>Order History</h1>
        <ul>
        { 
          orders.map((order)=>{
            return(
            <li key={ order.id }>
              
              <ul>
              <Link to={`/orders/${order.id}`}>Order ID: { order.id }</Link>
                {
                  order.lineItems.map((lineItem)=>{
                    const product = products.find(p => p.id === lineItem.productId);
                    return(
                      <li key={lineItem.id}>
                        Product Name: { product.name }, Quantity: { lineItem.quantity }
                      </li>
                      )
                  })
                }
                <br/>
              </ul>
            </li>
            )
          })
        }
        </ul>
    </div>
  );
};

export default Orders;
