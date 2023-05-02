import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store';

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
      <label htmlFor="imgUrl">
        Upload avatar:
        <input id="imgUrl" name="imgUrl" type="file" ref={ref} />
        <button onClick={() => setImgUrl('')}>Remove Avatar</button>
      </label>
      <label htmlFor="imgSrc">
        Avatar:
        <img id="imgSrc" src={imgUrl} />
      </label>
      <input value={username} onChange={(ev) => setUserName(ev.target.value)} />
      <input
        value={password}
        placeholder="Enter a new password"
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <textarea
        placeholder="Enter your shipping address"
        rows={3}
        cols={30}
        value={shipAddress}
        onChange={(ev) => setShipAddress(ev.target.value)}
      />
      <button>Update</button>
    </form>
  );
};

export default Profile;
