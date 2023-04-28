import axios from 'axios';

const cart = (state = { lineItems: [] }, action) => {
  if (action.type === 'SET_CART') {
    return action.cart;
  }
  return state;
};



export const fetchCart = ()=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    const response = await axios.get('/api/orders/cart', {
      headers: {
        authorization: token
      }
    });
    dispatch({ type: 'SET_CART', cart: response.data });
  };
};

export const addToCart = (product, quantity)=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    const response = await axios.post('/api/orders/cart', { product, quantity }, {
      headers: {
        authorization: token
      }
    });
    dispatch({ type: 'SET_CART', cart: response.data });
  };
};


export const removeFromCart = (lineItem)=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    await axios.put('/api/orders/cart', lineItem, {
      headers: {
        authorization: token
      }
    });
    dispatch({ type: 'REMOVE_FROM_CART', lineItem });
  };
};

//create updateLineItem thunk mainly updating the quantity of the lineItem
export const updateLineItem = (lineItem)=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    const response = await axios.put('/api/orders/cart', lineItem, {
      headers: {
        authorization: token
      }
    });
    dispatch({ type: 'UPDATE_LINE_ITEM', lineItem: response.data });
  };
};

export default cart;
