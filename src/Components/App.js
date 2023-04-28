import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Cart from './Cart';
import Profile from './Profile';
import Orders from './Orders';
import Products from './Products';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchCart } from '../store';
import { Link, Routes, Route } from 'react-router-dom';

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchCart());
    }
  }, [auth]);
  return (
    <div>
      <h1>Acme Shopping</h1>
      {auth.id ? <Home /> : <Login />}
      {!!auth.id && (
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
    </div>
  );
};

export default App;
