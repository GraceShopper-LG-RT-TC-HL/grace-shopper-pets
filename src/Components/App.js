import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './Login';
import Cart from './Cart';
import Profile from './Profile';
import Orders from './Orders';
import Order from './Order';
import Products from './Products';
import Product from './Product';
import ControlPanel from './ControlPanel';
import GuestCart from './GuestCart';
import AddReview from './AddReview';
import Nav from './Nav';

import { Typography } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

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

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(transferGuestCart());
      dispatch(fetchCart());
      dispatch(fetchOrders());
      dispatch(fetchCoupons());
    }
  }, [auth]);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, []);

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
              element={<GuestCart />}
            />
            <Route
              path='/products'
              element={<Products />}
            />
            <Route
              path='/products/:id'
              element={<Product />}
            />
            {/*<Route path="/products/:id/reviews" element={<Reviews />} />*/}
            {/*<Route path="/products/:id/reviews/new" element={<AddReview />}/>*/}
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
