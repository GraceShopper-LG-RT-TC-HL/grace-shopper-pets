import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder, fetchCart } from '../store';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

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
      <Button
        type='submit'
        variant='contained'
      >
        Place your order
      </Button>
    </form>
  );
};

export default OrderForm;
