import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews } from '../store';
import {
  Typography,
  Stack,
  Card,
  List,
  ListItem,
  Rating,
  Avatar,
  Select,
  MenuItem,
} from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';

const Reviews = ({ product }) => {
  const { reviews, products, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  //const [users, setUsers] = useState([]);
  const [sortedReviews, setSortedReviews] = useState([]);
  const [sortOption, setSortOption] = useState(1);

  useEffect(() => {
    dispatch(fetchReviews(product));
  }, []);

  useEffect(() => {
    setSortedReviews(
      reviews.slice().sort((a, b) => {
        console.log('sort option', sortOption);
        if (sortOption === 1) {
          return b.rating - a.rating;
        }
        return a.rating - b.rating;
      })
    );
  }, [reviews, sortOption]);

  return (
    <div className='reviews'>
      <Typography variant='h4'>Reviews ({reviews.length})</Typography>
      <form>
        <Select
          value={sortOption}
          onChange={(ev) => setSortOption(ev.target.value)}
        >
          <MenuItem value={1}>Sort by Highest Rated</MenuItem>
          <MenuItem value={2}>Sort by Lowest Rated</MenuItem>
        </Select>
      </form>
      <List
        disablePadding
        divider
      >
        {sortedReviews.map((review) => {
          {
            /*const user = users.find((u)=> u.id === review.userId);*/
          }
          return (
            <ListItem key={review.id}>
              <Card sx={{ padding: '1rem' }}>
                <Stack
                  direction='row'
                  alignItems='center'
                >
                  <Avatar
                    sx={{ padding: '.5rem' }}
                    src='https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png'
                  />
                  <Rating
                    name='read-only'
                    value={review.rating}
                    readOnly
                  />
                </Stack>

                <Typography variant='h6'>{review.title}</Typography>

                <Typography variant='body2'>{review.content}</Typography>
              </Card>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Reviews;
