import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder, fetchCart } from '../store';
import { useNavigate } from 'react-router-dom';

const OrderForm = () => {
  const { cart, orders } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrder = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(createOrder({ isCart: false }));
      await dispatch(fetchCart());
      navigate('/orders');
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <form onSubmit={handleOrder}>
      <button>Place your order</button>
    </form>
  );
};

export default OrderForm;
