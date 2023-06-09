import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import cart from './cart';
import products from './products';
import coupons from './coupons';
import orders from './orders';
import reviews from './reviews';

const reducer = combineReducers({
  auth,
  cart,
  products,
  coupons,
  orders,
  reviews
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './cart';
export * from './products';
export * from './coupons';
export * from './orders';
export * from './reviews';
