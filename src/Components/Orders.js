import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from '../store';

const Orders = ()=> {
  const { orders, products } = useSelector(state => state);
  const dispatch = useDispatch();
  
  return (
    <div>
        <h1>Order History</h1>
        <ul>
        { 
          orders.map((order)=>{
            console.log(order);
            return(
            <li key={ order.id }>
              <ul>
              Order ID: {order.id}
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
