import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import AddReview from './AddReview';
import {
  Typography,
  List,
  ListItem,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
  Divider,
} from '@mui/material';

const Order = () => {
  const { orders, products } = useSelector((state) => state);
  const { id } = useParams();
  const order = orders.find((order) => order.id === id);

  if (!order) {
    return null;
  }
  return (
    <div>
      <Typography variant='h4'>Order Details</Typography>
      <Typography variant='subtitle1'>
        Order #: {order.id} <br />
        Date: {order.createdAt.slice(0, 10)};
      </Typography>
      <Typography variant='h6'>
        Total: $
        {order.lineItems.reduce((total, lineItem) => {
          const product = products.find((p) => p.id === lineItem.productId);
          return total + product.price * lineItem.quantity;
        }, 0)}
      </Typography>
      <List
        disablePadding
        sx={{ alignContent: 'center' }}
      >
        {order.lineItems.map((lineItem) => {
          const product = products.find((p) => p.id === lineItem.productId);
          return (
            <ListItem
              sx={{ justifyContent: 'center' }}
              disablePadding
              key={lineItem.id}
            >
              <Card
                variant='outlined'
                sx={{ textAlign: 'center' }}
              >
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
                  <CardMedia
                    sx={{ maxWidth: 150, margin: 0 }}
                    component='img'
                    image={product.imgUrl}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant='h6'>{product.name}</Typography>
                    <Typography variant='subtitle1'>
                      ${product.price}
                    </Typography>
                    <Typography variant='body2'>
                      {`Quantity: ${lineItem.quantity}`}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Link to={`/products/${product.id}/reviews/new`}>
                      <Button>Leave a Review</Button>
                    </Link>
                  </CardContent>
                </Stack>
              </Card>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Order;
