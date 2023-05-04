import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import Reviews from './Reviews';

import Grid from '@mui/material/Unstable_Grid2';

const Product = () => {
  const { products } = useSelector((state) => state);
  const { id } = useParams();
  const product = products.find((product) => product.id === id);

  if (!product) {
    return null;
  }
  return (
    <div>
      <Grid
        constainer
        spacing={1}
        textAlign='center'
        sx={{}}
      >
        <Grid>
          <Typography variant='h4'>{product.name}</Typography>
          <Typography variant='subtitle1'>${product.price}</Typography>
          <Typography variant='body2'>{product.description}</Typography>
        </Grid>
        <Grid>
          <img
            style={{ maxWidth: 640 }}
            src={product.imgUrl}
          />
        </Grid>
      </Grid>
      <Reviews product={product} />
    </div>
  );
};

export default Product;
