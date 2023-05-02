import axios from 'axios';

const reviews = (state = [], action) => {
  if (action.type === 'SET_REVIEWS') {
    return action.reviews;
  }
  if(action.type === 'CREATE_REVIEW'){
    return [...state, action.review];
  }
  return state;
};

export const fetchReviews = (product) => {
  return async (dispatch) => {
    const response = await axios.get(`api/products/${product.id}/reviews`);
    console.log('fetch reviews response.data:', response.data)
    dispatch({ type: 'SET_REVIEWS', reviews: response.data});
  };
};
export default reviews;