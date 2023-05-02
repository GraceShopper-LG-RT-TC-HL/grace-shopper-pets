import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCoupons,
  createCoupon,
  deleteCoupon,
  updateCoupon,
} from '../store';

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
      <h2>{changeForm ? 'Create coupon' : 'Edit Coupon'}</h2>
      <form onSubmit={changeForm ? create : update}>
        <label htmlFor="code">
          Code:
          <input
            id="code"
            value={code}
            onChange={(ev) => setCode(ev.target.value)}
          />
        </label>
        <label htmlFor="discount">
          Discount:
          <input
            id="discount"
            value={discount}
            onChange={(ev) => setDiscount(ev.target.value)}
          />
          %OFF
        </label>
        <button>{changeForm ? 'Create' : 'Update'}</button>
        {changeForm ? (
          ''
        ) : (
          <button onClick={() => setChangeForm(true)}>Cancel</button>
        )}
      </form>
      <ul>
        {coupons.map((coupon) => {
          return (
            <li key={coupon.id}>
              <h4>{coupon.code}</h4>
              <h4>{coupon.discount}%OFF</h4>
              <button onClick={() => edit(coupon)}>Edit</button>
              <button onClick={() => destroy(coupon.id)}>Remove</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Coupons;
