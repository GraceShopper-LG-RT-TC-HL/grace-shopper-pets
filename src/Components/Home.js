import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Home</h1>
      <div>
        Welcome {auth.id ? auth.username : 'Guest'}!!
        {auth.id ? (
          <Link to="/profile">Your Profile</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
        {auth.id ? (
          <button onClick={() => dispatch(logout())}>Logout</button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Home;
