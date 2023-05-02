import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Reviews from './Reviews';

const Product = () => {
  const { products } = useSelector((state) => state);
  const { id } = useParams();
  const product = products.find((product) => product.id === id);
  
  if(!product){
    return null;
  }
  return (
    <div>
      <h2>{ product.name }</h2>
      <h3>${ product.price }</h3>
      <h4>{ product.description }</h4>
      <img src={ product.imgUrl } />
      <br />
      <h2>Reviews</h2>
      <Reviews 
        product={ product }
      />
    </div>
    );
};

export default Product;