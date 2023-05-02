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

export const createReview = (review) => {
  console.log('review: ', review)
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.post(`api/products/${review.productId}/reviews`, review, {
      headers: {
        authorization: token
      }
    });
    dispatch({ type: 'CREATE_REVIEW', review: response.data});
  };
};
export default reviews;