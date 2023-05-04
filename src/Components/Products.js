import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store';
import { Link } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Search } from '@mui/icons-material';

const Products = () => {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product, quantities[product.id]));
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities({ ...quantities, [productId]: quantity });
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  return (
    <div>
      <Typography variant='h4'>Products</Typography>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          type='text'
          label='Search'
          size='small'
          placeholder='Search Products'
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </form>
      <Grid
        container
        spacing={2}
      >
        {filteredProducts.map((product) => {
          const quantity = quantities[product.id] || 0;
          return (
            <Grid
              xs={6}
              sm={4}
              md={3}
              key={product.id}
            >
              <Card
                variant='outlined'
                sx={{ maxWidth: 325, textAlign: 'center' }}
              >
                <CardContent>
                  <Typography variant='h5'>{product.name}</Typography>
                  <Typography variant='subtitle1'>${product.price}</Typography>
                  <Typography variant='body2'>{product.description}</Typography>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                  >
                    <TextField
                      type='number'
                      name={`quantity-${product.id}`}
                      min='0'
                      max='10'
                      margin='dense'
                      size='small'
                      label='Quantity'
                      value={quantity}
                      onChange={(ev) =>
                        handleQuantityChange(
                          product.id,
                          Number(ev.target.value)
                        )
                      }
                    />
                    <Button type='submit'>Add to Cart</Button>
                  </form>
                </CardContent>
                <Link to={`/products/${product.id}`}>
                  <CardMedia
                    sx={{ margin: 0 }}
                    component='img'
                    image={product.imgUrl}
                    title='random pet'
                  />
                </Link>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Products;
