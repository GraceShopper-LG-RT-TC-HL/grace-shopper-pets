import React, { useState } from 'react';
import { attemptLogin, createUser } from '../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Typography, TextField, Button } from '@mui/material';

const Login = () => {
  const dispatch = useDispatch();
  const [changeForm, setChangeForm] = useState(true);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
    navigate('/products');
  };

  const create = (ev) => {
    ev.preventDefault();
    dispatch(createUser(credentials));
  };

  return (
    <div>
      <Typography variant='h4'>
        {changeForm ? 'Login ' : 'Create your account '}

        <Button onClick={() => setChangeForm(!changeForm)}>
          {changeForm ? 'Create Account?' : 'Login'}
        </Button>
      </Typography>

      <form onSubmit={changeForm ? login : create}>
        <TextField
          required
          margin='dense'
          value={credentials.username}
          label='username'
          name='username'
          onChange={onChange}
        />
        <TextField
          required
          margin='dense'
          label='password'
          name='password'
          value={credentials.password}
          onChange={onChange}
        />
        <Button type='submit'>{changeForm ? 'Login' : 'Create Account'}</Button>
      </form>
    </div>
  );
};

export default Login;
