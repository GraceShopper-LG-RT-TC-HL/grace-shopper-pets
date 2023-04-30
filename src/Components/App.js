import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Cart from './Cart';
import Profile from './Profile';
import Orders from './Orders';
import Products from './Products';
import ControlPanel from './ControlPanel';
import GuestCart from './GuestCart';
import { useSelector, useDispatch } from 'react-redux';
import {
  loginWithToken,
  fetchCart,
  fetchProducts,
  fetchOrders,
  transferGuestCart,
} from '../store';

import { Link, Routes, Route } from 'react-router-dom';

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(transferGuestCart());
      dispatch(fetchCart());
      dispatch(fetchOrders());
    } else {
      window.localStorage.setItem('cart', JSON.stringify({ lines: [] }));
    }
  }, [auth]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div>
      <h1>Acme Shopping</h1>
      <Home />
      {auth.id ? (
        ''
      ) : (
        <div>
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/products'>Products</Link>
            <Link to='/cart'>Cart</Link>
          </nav>
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
          </Routes>
        </div>
      )}
      {!!auth.id && !auth.isAdmin && (
        <div>
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/products'>Products</Link>
            <Link to='/orders'>Orders</Link>
            <Link to='/cart'>Cart</Link>
          </nav>
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
          </Routes>
        </div>
      )}
      {!!auth.id && auth.isAdmin && (
        <div>
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/products'>Products</Link>
          </nav>
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
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
