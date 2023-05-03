import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store';

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

const Profile = () => {
  const { auth } = useSelector((state) => state);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [shipAddress, setShipAddress] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    if (auth.id) {
      setUserName(auth.username);
      if (auth.shipAddress) {
        setShipAddress(auth.shipAddress);
      }
      if (auth.imgUrl) {
        setImgUrl(auth.imgUrl);
      }
    }
  }, [auth]);

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

  const update = (ev) => {
    ev.preventDefault();
    if (password.length === 0) {
      dispatch(updateUser({ ...auth, username, shipAddress, imgUrl }));
    } else {
      dispatch(
        updateUser({ ...auth, username, password, shipAddress, imgUrl })
      );
    }
    setPassword('');
  };

  return (
    <form onSubmit={update}>
      <Card
        raised
        sx={{ maxWidth: 200 }}
      >
        <Typography
          variant='h6'
          align='center'
        >
          Avatar
        </Typography>
        <Avatar
          id='imgSrc'
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
              id='imgUrl'
              name='imgUrl'
              type='file'
              ref={ref}
            />
          </IconButton>
          <IconButton
            onClick={() =>
              setImgUrl(
                'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png'
              )
            }
          >
            <Delete />
          </IconButton>
        </Stack>
      </Card>

      <TextField
        label='username'
        margin='dense'
        value={username}
        placeholder='Enter a new username'
        onChange={(ev) => setUserName(ev.target.value)}
      />
      <TextField
        label='password'
        margin='dense'
        value={password}
        placeholder='Enter a new password'
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <TextField
        multiline
        label='shipping address'
        placeholder='Enter your shipping address'
        value={shipAddress}
        onChange={(ev) => setShipAddress(ev.target.value)}
      />
      <Button type='submit'>Update</Button>
    </form>
  );
};

export default Profile;
