import React, { useEffect } from 'react';
import { Link as RouterLink, Routes, Route } from 'react-router-dom';
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
  const { auth, cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const pages = [
    { name: 'Home', link: '/' },
    { name: 'Products', link: '/products' },
    { name: 'Cart', link: '/cart' },
  ];
  const accountPages = [{ name: 'Login', link: '/login' }];
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

  const handleNavBar = () => {
    if (auth.id && auth.isAdmin) {
      /*return (
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/products'>Products</Link>
        </nav>
      );*/
    } else if (auth.id && !auth.isAdmin) {
      /*return (
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/products'>Products</Link>
          <Link to='/orders'>Orders</Link>
          <Link to='/cart'>Cart ({totalQuantity})</Link>
        </nav>
      );*/
    } else {
      return;
    }
  };

  return (
    <div>
      {/*<Typography variant='h3'>Acme Shopping</Typography>*/}
      {auth.id ? (
        ''
      ) : (
        <div>
          <Nav
            pages={pages}
            accountPages={accountPages}
          />
          <Typography variant='h3'>Acme Shopping</Typography>
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
          {handleNavBar()}
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
          {handleNavBar()}
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
