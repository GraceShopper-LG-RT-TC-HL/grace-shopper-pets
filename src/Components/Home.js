import React from 'react';
import { useSelector } from 'react-redux';

import { Typography } from '@mui/material';

const Home = () => {
  const { auth } = useSelector((state) => state);
  return (
    <div>
      <Typography
        align='center'
        variant='h1'
      >
        {' '}
        Welcome {auth.id ? auth.username : 'Guest'}!!
      </Typography>
    </div>
  );
};

export default Home;
