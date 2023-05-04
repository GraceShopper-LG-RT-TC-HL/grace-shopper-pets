import React from 'react';
import AddProduct from './AddProduct';
import Coupons from './Coupons';

import Grid from '@mui/material/Unstable_Grid2';

const ControlPanel = () => {
  return (
    <Grid
      container
      spacing={5}
    >
      <Grid
        xs={12}
        sm={6}
      >
        <AddProduct />
      </Grid>
      <Grid
        xs={12}
        sm={6}
      >
        <Coupons />
      </Grid>
    </Grid>
  );
};

export default ControlPanel;
