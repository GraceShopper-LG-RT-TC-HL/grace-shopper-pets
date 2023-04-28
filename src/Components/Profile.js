import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store';

const Profile = () => {
  const { auth } = useSelector((state) => state);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.id) {
      setUserName(auth.username);
    }
  }, [auth]);

  const update = (ev) => {
    ev.preventDefault();
    dispatch(updateUser({ ...auth, username, password }));
    setPassword('');
  };

  return (
    <form onSubmit={update}>
      <input
        value={username}
        onChange={(ev) => setUserName(ev.target.value)}
      />
      <input
        value={password}
        placeholder='Enter a new password'
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Update</button>
    </form>
  );
};

export default Profile;
