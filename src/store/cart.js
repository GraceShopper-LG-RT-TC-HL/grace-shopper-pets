import axios from 'axios';
const cart = (state = { lineItems: [] }, action)=> {
  if(action.type === 'SET_CART'){
    return action.cart;
  }
  if(action.type === 'ADD_TO_CART'){
    const lineItems = [...state.lineItems, action.lineItem];
    return {...state, lineItems};
  }
  if(action.type === 'REMOVE_FROM_CART'){
    const lineItems = state.lineItems.filter(lineItem => lineItem.id !== action.lineItem.id);
    return {...state, lineItems};
  }
  if(action.type === 'UPDATE_LINE_ITEM'){
    const lineItems = state.lineItems.map(lineItem => lineItem.id === action.lineItem.id ? action.lineItem : lineItem);
    return {...state, lineItems};
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

export const addToCart = (product)=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    const response = await axios.post('/api/orders/cart', product, {
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
