import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews } from '../store';

const Reviews = ({product}) => {
  const { reviews, products } = useSelector((state) => state);
  const dispatch = useDispatch();
  
   useEffect(()=>{
     dispatch(fetchReviews(product));
   }, []);
  return(
    <div>
      <ul>
      {
        reviews.map((review) => {
          return (
            <li key={ review.id }>
              
              { review.rating}<br />
              <h3>{ review.title }</h3>
              <p>{ review.content }</p>
            </li>
          )
        })
      }
      </ul>
    </div>
    );
}

export default Reviews;