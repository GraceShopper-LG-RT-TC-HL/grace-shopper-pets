import React, { useState } from 'react';
import { attemptLogin, createUser } from '../store';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const [changeForm, setChangeForm] = useState(true);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const onChange = ev => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = ev => {
    ev.preventDefault();
    console.log(ev);
    dispatch(attemptLogin(credentials));
  };

  const create = ev => {
    ev.preventDefault();
    dispatch(createUser(credentials));
  };

  return (
    <div>
      <h2>
        {changeForm ? 'Login ' : 'Create your account '}
        <button onClick={() => setChangeForm(!changeForm)}>
          {changeForm ? 'Create Account?' : 'Login'}
        </button>
      </h2>
      <form onSubmit={changeForm ? login : create}>
        <input
          placeholder='username'
          value={credentials.username}
          name='username'
          onChange={onChange}
        />
        <input
          placeholder='password'
          name='password'
          value={credentials.password}
          onChange={onChange}
        />
        <button>{changeForm ? 'Login' : 'Create Account'}</button>
      </form>
    </div>
  );
};

export default Login;
