import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCart } from '../store';
import OrderForm from './OrderForm';

import {
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
} from '@mui/material';

const Cart = () => {
  const { cart, coupons } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState(
    cart.lineItems.reduce((acc, lineItem) => {
      acc[lineItem.product.id] = lineItem.quantity;
      return acc;
    }, {})
  );
  const [couponCode, setCouponCode] = useState('');

  const handleAddToCart = (product) => {
    dispatch(updateCart({ product, quantity: quantities[product.id] }));
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities({ ...quantities, [productId]: quantity });
  };

  const handleCouponCodeChange = (ev) => {
    setCouponCode(ev.target.value);
  };

  const getTotalPrice = () => {
    let totalPrice = 0;

    cart.lineItems.forEach((lineItem) => {
      const product = lineItem.product;
      const quantity = quantities[product.id] || lineItem.quantity;
      totalPrice += product.price * quantity;
    });

    const coupon = coupons.find((coupon) => coupon.code === couponCode);
    if (coupon) {
      totalPrice *= 1 - coupon.discount / 100;
    }
    return totalPrice;
  };

  return (
    <div>
      <Typography
        textAlign='center'
        variant='h4'
      >
        Cart
      </Typography>
      <List
        disablePadding
        sx={{ alignContent: 'center' }}
      >
        {cart.lineItems.map((lineItem, _idx) => {
          const product = lineItem.product;
          const quantity = quantities[product.id] || lineItem.quantity;
          return (
            <ListItem
              sx={{ justifyContent: 'center' }}
              disablePadding
              key={lineItem.id || _idx}
            >
              <Card
                variant='outlined'
                sx={{ textAlign: 'center', width: 375 }}
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
                      Quantity: {quantity}
                    </Typography>
                  </CardContent>
                  <CardContent>
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
                        sx={{ maxWidth: 95 }}
                      />
                    </form>
                    <Button
                      variant='contained'
                      onClick={() => dispatch(removeFromCart(lineItem))}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Stack>
              </Card>
            </ListItem>
          );
        })}
      </List>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          type='text'
          id='couponCode'
          label='Coupon code'
          margin='dense'
          value={couponCode}
          onChange={handleCouponCodeChange}
        />
      </form>
      <Typography variant='h5'>Total Price: ${getTotalPrice()}</Typography>
      <OrderForm />
    </div>
  );
};

export default Cart;
