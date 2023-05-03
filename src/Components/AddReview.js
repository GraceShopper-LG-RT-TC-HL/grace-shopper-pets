import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { createReview } from '../store';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const AddReview = () => {
  const { products, auth } = useSelector((state) => state);
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const product = products.find((p) => p.id === id);
  
  if (!products || !products.length) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const create = (ev) => {
    ev.preventDefault();
    try{
      dispatch(createReview({ userId: auth.id, productId: product.id, rating, title, content}));
      setTitle('');
      setContent('');
      setRating(0);
      navigate(`/products/${product.id}`);
    }
    catch(ex){
      console.log(ex);
    }
  };
  
  return (
    <div>
      <h2>Create a Review for: { product.name }</h2>
      <form onSubmit={ create }>
        {/*<input value={ rating } onChange={ ev => setRating(ev.target.value) } placeholder='rating' />*/}
        <Typography component="legend">Rating</Typography>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={ev => setRating(Number(ev.target.value))}
        />
        
        <input value={ title } onChange={ ev => setTitle(ev.target.value)} placeholder='title'/>
        <input value={ content } onChange={ ev => setContent(ev.target.value)} placeholder='written review'/>
        <button>Add Review</button>
      </form>
    </div>
    );
};

export default AddReview;