import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../store';

import {
  Typography,
  TextField,
  Button,
  IconButton,
  Avatar,
  Card,
  Stack,
  Divider,
} from '@mui/material';
import { Upload, Delete } from '@mui/icons-material';

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [imgUrl, setImgUrl] = useState(
    'https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg'
  );
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
      <Typography variant='h4'>Add a Product</Typography>
      <form onSubmit={create}>
        <TextField
          required
          margin='dense'
          label='Product Name'
          name='name'
          value={newProduct.name}
          onChange={onChange}
        />

        <TextField
          required
          margin='dense'
          label='Product Description'
          name='description'
          value={newProduct.description}
          onChange={onChange}
        />

        <TextField
          margin='dense'
          label='Product Image Url'
          name='imgUrl'
          value={imgUrl}
          onChange={(ev) => setImgUrl(ev.target.value)}
        />

        {/* Images uploaded fail validation since they are not in URL format */}
        <Card
          raised
          sx={{ maxWidth: 200 }}
        >
          <Typography
            variant='h6'
            align='center'
          >
            Product Image
          </Typography>
          <Avatar
            variant='square'
            src={imgUrl}
            align='center'
            sx={{ width: 100, height: 100, margin: 'auto' }}
          />
          <Stack
            direction='row'
            divider={
              <Divider
                orientation='vertical'
                variant='middle'
                flexItem
              />
            }
            justifyContent='space-around'
          >
            <IconButton
              variant='contained'
              component='label'
            >
              <Upload />
              <input
                hidden
                required
                id='imgUrl'
                name='imgUrl'
                type='file'
                ref={ref}
              />
            </IconButton>
            <IconButton
              onClick={() =>
                setImgUrl(
                  'https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg'
                )
              }
            >
              <Delete />
            </IconButton>
          </Stack>
        </Card>

        <TextField
          required
          margin='dense'
          label='Product Price'
          name='price'
          value={newProduct.price}
          onChange={onChange}
        />

        <Button type='submit'>Submit</Button>
      </form>
    </div>
  );
};

export default AddProduct;
