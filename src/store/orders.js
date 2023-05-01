import axios from 'axios';

const orders = (state = [], action) => {
  if (action.type === 'SET_ORDERS') {
    return action.orders;
  }
  if(action.type === 'CREATE_ORDER'){
    return [...state, action.order];
  }
  return state;
};

export const fetchOrders = ()=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    const response = await axios.get('/api/orders', {
      headers: {
        authorization: token
      }
    });
    dispatch({ type: 'SET_ORDERS', orders: response.data });
  };
};
export const createOrder = (order) => {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    const response = await axios.post('/api/orders', order,{
      headers: {
        authorization: token
      }
    });
    console.log('order response.data: ', response.data)
    dispatch({ type: 'CREATE_ORDER', order: response.data });
  };
};

export default orders;