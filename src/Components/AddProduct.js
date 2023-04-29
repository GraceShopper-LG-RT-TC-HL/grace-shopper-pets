import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../store';

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [imgUrl, setImgUrl] = useState('');
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    ref.current.addEventListener('change', (ev) => {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        setImgUrl(reader.result);
      });
    });
  }, [ref]);

  const onChange = (ev) => {
    setNewProduct({ ...newProduct, [ev.target.name]: ev.target.value });
  };

  const create = (ev) => {
    ev.preventDefault();
    dispatch(createProduct({ ...newProduct, imgUrl }));
    setNewProduct({
      name: '',
      description: '',
      price: '',
    });
    setImgUrl('');
  };

  return (
    <div>
      <h2>Add a Product</h2>
      <form onSubmit={create}>
        <label htmlFor='name'>
          Product name:
          <input
            id='name'
            name='name'
            value={newProduct.name}
            onChange={onChange}
          />
        </label>
        <label htmlFor='description'>
          Product description:
          <input
            id='description'
            name='description'
            value={newProduct.description}
            onChange={onChange}
          />
        </label>
        <label htmlFor='imgurl2'>
          Product imgUrl:
          <input
            id='imgurl2'
            name='imgUrl'
            value={imgUrl}
            onChange={(ev) => setImgUrl(ev.target.value)}
          />
        </label>
        {/* Images uploaded fail validation since they are not in URL format */}
        <label htmlFor='imgUrl'>
          Product img Upload:
          <input
            id='imgUrl'
            name='imgUrl'
            type='file'
            ref={ref}
          />
          <img src={imgUrl} />
        </label>
        <label htmlFor='price'>
          Product price:
          <input
            id='price'
            name='price'
            value={newProduct.price}
            onChange={onChange}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
