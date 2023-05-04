import axios from 'axios';

const cart = (state = { lineItems: [] }, action) => {
  if (action.type === 'SET_CART') {
    return action.cart;
  }
  return state;
};

export const fetchCart = () => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem('token');
    if (getState().auth.id) {
      const response = await axios.get('/api/orders/cart', {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: 'SET_CART', cart: response.data });
    } else {
      const guestCart = JSON.parse(window.localStorage.getItem('cart'));
      if (guestCart) {
        dispatch({ type: 'SET_CART', cart: guestCart });
      } else {
        window.localStorage.setItem('cart', JSON.stringify({ lineItems: [] }));
        dispatch({ type: 'SET_CART', cart: { lineItems: [] } });
      }
    }
  };
};

export const transferGuestCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const cart = JSON.parse(window.localStorage.getItem('cart'));
    if (cart) {
      const response = await axios.post('/api/orders/from_local_cart', cart, {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: 'SET_CART', cart: response.data });
      window.localStorage.removeItem('cart');
    }
  };
};

const addToGuestCart = (dispatch, line) => {
  const guestCart = JSON.parse(window.localStorage.getItem('cart'));
  let inCart = false;

  guestCart.lineItems.map((_line) => {
    if (_line.product.id === line.product.id) {
      _line.quantity = _line.quantity + line.quantity;
      inCart = true;
    }
  });
  if (!inCart) {
    guestCart.lineItems.push(line);
  }
  window.localStorage.setItem('cart', JSON.stringify(guestCart));
  dispatch({ type: 'SET_CART', cart: guestCart });
};

export const addToCart = (product, quantity) => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem('token');
    if (getState().auth.id) {
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
      addToGuestCart(dispatch, { product, quantity });
    }
  };
};

export const removeFromCart = (lineItem) => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem('token');
    if (getState().auth.id) {
      const response = await axios.put('/api/orders/cart', lineItem, {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: 'SET_CART', cart: response.data });
    } else {
      const guestCart = JSON.parse(window.localStorage.getItem('cart'));
      const newCart = {
        lineItems: guestCart.lineItems.filter(
          (line) => line.product.id !== lineItem.product.id
        ),
      };
      console.log(newCart);
      window.localStorage.setItem('cart', JSON.stringify(newCart));
      dispatch({ type: 'SET_CART', cart: newCart });
    }
  };
};

export const updateCart = ({ product, quantity }) => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem('token');
    if (getState().auth.id) {
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
    } else {
      const guestCart = JSON.parse(window.localStorage.getItem('cart'));
      guestCart.lineItems.map((_line) => {
        if (_line.product.id === product.id) {
          _line.quantity = quantity;
        }
      });
      window.localStorage.setItem('cart', JSON.stringify(guestCart));
      dispatch({ type: 'SET_CART', cart: guestCart });
    }
  };
};

export default cart;
