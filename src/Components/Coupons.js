import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCoupons,
  createCoupon,
  deleteCoupon,
  updateCoupon,
} from '../store';

import {
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Stack,
  Divider,
  Card,
} from '@mui/material';
import { EditOutlined, EditOffOutlined, Delete } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';

const Coupons = () => {
  const { coupons } = useSelector((state) => state);
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [id, setId] = useState('');
  const [changeForm, setChangeForm] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoupons());
  }, []);

  const create = (ev) => {
    ev.preventDefault();
    dispatch(createCoupon({ code, discount }));
    setCode('');
    setDiscount('');
  };

  const destroy = (id) => {
    dispatch(deleteCoupon(id));
  };

  const update = (ev) => {
    ev.preventDefault();
    dispatch(updateCoupon({ id, code, discount }));
    setChangeForm(true);
    setCode('');
    setId('');
    setDiscount('');
  };

  const edit = (coupon) => {
    setChangeForm(false);
    setCode(coupon.code);
    setDiscount(coupon.discount);
    setId(coupon.id);
  };

  return (
    <div>
      <Typography variant='h4'>
        {changeForm ? 'Create coupon' : 'Edit Coupon'}
      </Typography>
      <form onSubmit={changeForm ? create : update}>
        <TextField
          required
          margin='dense'
          label='Code'
          value={code}
          onChange={(ev) => setCode(ev.target.value)}
        />

        <TextField
          required
          margin='dense'
          label='Discount'
          value={discount}
          onChange={(ev) => setDiscount(ev.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>{'% OFF'}</InputAdornment>
            ),
          }}
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
          <Button type='submit'>{changeForm ? 'Create' : 'Update'}</Button>
          {changeForm ? (
            ''
          ) : (
            <Button
              onClick={() => {
                setChangeForm(true);
                setCode('');
                setDiscount('');
              }}
            >
              Cancel
            </Button>
          )}
        </Stack>
      </form>
      <Grid
        container
        spacing={1}
      >
        {coupons.map((coupon) => {
          return (
            <Grid key={coupon.id}>
              <Card
                raised
                align='center'
                sx={{ minWidth: 150 }}
              >
                <Typography variant='h6'>{coupon.code}</Typography>
                <Typography variant='body2'>{`${coupon.discount}% OFF`}</Typography>
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
                    onClick={
                      changeForm
                        ? () => edit(coupon)
                        : () => {
                            setChangeForm(true);
                            setCode('');
                            setDiscount('');
                          }
                    }
                  >
                    {changeForm ? <EditOutlined /> : <EditOffOutlined />}
                  </IconButton>
                  <IconButton onClick={() => destroy(coupon.id)}>
                    {' '}
                    <Delete />{' '}
                  </IconButton>
                </Stack>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Coupons;
