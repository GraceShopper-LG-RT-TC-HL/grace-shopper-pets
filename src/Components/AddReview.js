import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { createReview } from '../store';
import { useNavigate } from 'react-router-dom';

const AddReview = ({product}) => {
  const { products, auth } = useSelector((state) => state);
  const { id } = useParams(); //orderId
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('id: ', id)
  console.log('prop product: ', product);
  console.log('prop product.id: ', product.id);
  console.log('auth.id: ', auth.id);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  //const _product = products.find((p) => p.id === product.id);
  //console.log('rating')

  const create = (ev) => {
    ev.preventDefault();
    try{
      dispatch(createReview({ userId: auth.id, productId: product.id, rating, title, content}));
      setTitle('');
      setContent('');
      setRating(5);
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
        <input value={ rating } onChange={ ev => setRating(ev.target.value) } placeholder='rating' />
        <input value={ title } onChange={ ev => setTitle(ev.target.value)} placeholder='title'/>
        <input value={ content } onChange={ ev => setContent(ev.target.value)} placeholder='written review'/>
        <button>Add Review</button>
      </form>
    </div>
    );
  
};

export default AddReview;