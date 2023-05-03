import React, { useEffect } from 'react';
import Home from './Home';
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

import { useSelector, useDispatch } from 'react-redux';
import {
  loginWithToken,
  fetchCart,
  fetchProducts,
  fetchOrders,
  transferGuestCart,
  fetchCoupons,
} from '../store';

import { Link, Routes, Route } from 'react-router-dom';

const App = () => {
  const { auth, cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  let totalQuantity = 0;
  cart.lineItems.forEach((lineItem) => (totalQuantity += lineItem.quantity));

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(transferGuestCart());
      dispatch(fetchCart());
      dispatch(fetchOrders());
      dispatch(fetchCoupons());
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
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
          </nav>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<GuestCart />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
          </Routes>
        </div>
      )}
      {!!auth.id && !auth.isAdmin && (
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/cart">Cart ({totalQuantity})</Link>
          </nav>
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<Order />} />
            <Route path='/products/:id'element={<Product />} />
            <Route path="/products/:id/reviews/new" element={<AddReview />}/>
          </Routes>
        </div>
      )}
      {!!auth.id && auth.isAdmin && (
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
          </nav>
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<ControlPanel />} />
            <Route path="/products" element={<Products />} />
            <Route path='/products/:id'element={<Product />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
