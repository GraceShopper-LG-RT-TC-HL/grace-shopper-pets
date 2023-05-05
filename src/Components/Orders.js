import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const Orders = () => {
  const { orders, products } = useSelector((state) => state);

  return (
    <div>
      <Typography variant='h4'>Order History</Typography>
      <List>
        {orders.map((order) => {
          return (
            <ListItem key={order.id}>
              <Card elevation={6}>
                <CardContent>
                  <Typography variant='h6'>
                    <Link to={`/orders/${order.id}`}>Order ID: {order.id}</Link>
                  </Typography>

                  <Typography variant='h6'>
                    Date: {order.createdAt.slice(0, 10)}
                  </Typography>

                  <Typography variant='h6'>
                    Total: $
                    {order.lineItems.reduce((total, lineItem) => {
                      const product = products.find(
                        (p) => p.id === lineItem.productId
                      );
                      return total + product.price * lineItem.quantity;
                    }, 0)}
                  </Typography>
                </CardContent>
                <Divider />

                <Grid container>
                  {order.lineItems.map((lineItem) => {
                    const product = products.find(
                      (p) => p.id === lineItem.productId
                    );
                    return (
                      <Grid
                        xs={4}
                        sm={3}
                        md={2}
                        key={lineItem.id}
                        textAlign='center'
                      >
                        <Card elevation={6}>
                          <Typography variant='subtitle1'>
                            {product.name}
                          </Typography>

                          <Typography variant='body2'>
                            Quantity: {lineItem.quantity}
                          </Typography>

                          <Typography variant='body2'>
                            Price: ${product.price}
                          </Typography>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Card>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Orders;
