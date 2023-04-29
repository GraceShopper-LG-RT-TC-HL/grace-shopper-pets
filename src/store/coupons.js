import axios from 'axios';

const coupons = (state = [], action) => {
  if (action.type === 'SET_COUPONS') {
    return action.coupons;
  }
  if (action.type === 'CREATE_COUPON') {
    return [...state, action.coupon];
  }
  if (action.type === 'DELETE_COUPON') {
    return state.filter((coupon) => coupon.id !== action.couponId);
  }
  if (action.type === 'UPDATE_COUPON') {
    return state.map((coupon) => {
      if (coupon.id === action.coupon.id) {
        return action.coupon;
      }
      return coupon;
    });
  }
  return state;
};

export const fetchCoupons = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/coupons');
    dispatch({ type: 'SET_COUPONS', coupons: response.data });
  };
};

export const createCoupon = (coupon) => {
  return async (dispatch) => {
    const response = await axios.post('/api/coupons', coupon);
    dispatch({ type: 'CREATE_COUPON', coupon: response.data });
  };
};

export const deleteCoupon = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/coupons/${id}`);
    dispatch({ type: 'DELETE_COUPON', couponId: id });
  };
};

export const updateCoupon = (coupon) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/coupons/${coupon.id}`, coupon);
    dispatch({ type: 'UPDATE_COUPON', coupon: response.data });
  };
};

export default coupons;
