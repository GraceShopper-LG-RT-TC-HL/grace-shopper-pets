import React from 'react';
import AddProduct from './AddProduct';
import Coupons from './Coupons';

const ControlPanel = () => {
  return (
    <div id="cpanel">
      <AddProduct />
      <Coupons />
    </div>
  );
};

export default ControlPanel;
