import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews } from '../store';
import Rating from '@mui/material/Rating';

const Reviews = ({product}) => {
  const { reviews, products, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  //const [users, setUsers] = useState([]);
  const [sortedReviews, setSortedReviews] = useState([]);
  const [sortOption, setSortOption] = useState(1);
  
  useEffect(()=>{
     dispatch(fetchReviews(product));
  }, []);
  
  useEffect(()=>{
    setSortedReviews(reviews.slice().sort((a, b) => {
      console.log('sort option', sortOption)
      if (sortOption === 1){
        return b.rating - a.rating;
      }
      return a.rating - b.rating;
    }));
    
    }, [reviews, sortOption]);
 
  return(
    <div className='reviews'>
    <h2>Reviews ({reviews.length})</h2>
      <form >
        <select value={ sortOption } onChange={ ev => setSortOption(ev.target.value)}>
          <option value={1}>Sort by Highest Rated</option>
          <option value={2}>Sort by Lowest Rated</option>
  
        </select>
      </form>
      <ul>
      {
        sortedReviews.map((review) => {
          {/*const user = users.find((u)=> u.id === review.userId);*/}
          return (
            <li key={ review.id }>
              
              <Rating name="read-only" value={review.rating} readOnly />
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