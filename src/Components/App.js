import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './Login';
import Cart from './Cart';
import Profile from './Profile';
import Orders from './Orders';
import Order from './Order';
import Products from './Products';
import Product from './Product';
import ControlPanel from './ControlPanel';
import AddReview from './AddReview';
import Nav from './Nav';
import Home from './Home';

import { Typography } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import {
  loginWithToken,
  fetchCart,
  fetchProducts,
  fetchOrders,
  transferGuestCart,
  fetchCoupons,
} from '../store';

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();
  const prevAuth = useRef({});

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchOrders());
      dispatch(fetchCoupons());
    }
  }, [auth]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (!prevAuth.current.id && auth.id) {
      console.log('logged in');
      dispatch(transferGuestCart());
    }
    if (prevAuth.current.id && !auth.id) {
      console.log('logged out');
      dispatch(fetchCart());
    }
  }, [auth]);

  useEffect(() => {
    prevAuth.current = auth;
  });

  console.log(location);

  return (
    <div>
      <Nav />

      <Typography variant='h3'>Acme Shopping</Typography>
      {auth.id ? (
        ''
      ) : (
        <div>
          <Routes>
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/cart'
              element={<Cart />}
            />
            <Route
              path='/products'
              element={<Products />}
            />
            <Route
              path='/products/:id'
              element={<Product />}
            />
          </Routes>
        </div>
      )}
      {!!auth.id && !auth.isAdmin && (
        <div>
          <Routes>
            <Route
              path='/profile'
              element={<Profile />}
            />
            <Route
              path='/cart'
              element={<Cart />}
            />
            <Route
              path='/products'
              element={<Products />}
            />
            <Route
              path='/orders'
              element={<Orders />}
            />
            <Route
              path='/orders/:id'
              element={<Order />}
            />
            <Route
              path='/products/:id'
              element={<Product />}
            />
            <Route
              path='/products/:id/reviews/new'
              element={<AddReview />}
            />
          </Routes>
        </div>
      )}
      {!!auth.id && auth.isAdmin && (
        <div>
          <Routes>
            <Route
              path='/profile'
              element={<Profile />}
            />
            <Route
              path='/'
              element={<ControlPanel />}
            />
            <Route
              path='/products'
              element={<Products />}
            />
            <Route
              path='/products/:id'
              element={<Product />}
            />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
