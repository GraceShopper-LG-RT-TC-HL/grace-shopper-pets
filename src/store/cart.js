import axios from 'axios';

const cart = (state = { lineItems: [] }, action) => {
  if (action.type === 'SET_CART') {
    return action.cart;
  }
  return state;
};

export const fetchCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const response = await axios.get('/api/orders/cart', {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: 'SET_CART', cart: response.data });
    }
  };
};

const addToGuestCart = (line) => {
  const guestCart = JSON.parse(window.localStorage.getItem('cart'));
  let inCart = false;

  guestCart.lines.map((_line) => {
    if (_line.product.id === line.product.id) {
      _line.quantity = _line.quantity + line.quantity;
      inCart = true;
    }
  });
  if (!inCart) {
    guestCart.lines.push(line);
  }
  window.localStorage.setItem('cart', JSON.stringify(guestCart));
};

export const addToCart = (product, quantity) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const response = await axios.post(
        '/api/orders/cart',
        { product, quantity },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch({ type: 'SET_CART', cart: response.data });
    } else {
      addToGuestCart({ product, quantity });
    }
  };
};

export const removeFromCart = (lineItem) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.put('/api/orders/cart', lineItem, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: 'SET_CART', cart: response.data });
  };
};

export const updateCart = ({ product, quantity }) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.put(
      '/api/orders/cart/update',
      { product, quantity },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: 'SET_CART', cart: response.data });
  };
};

export default cart;
