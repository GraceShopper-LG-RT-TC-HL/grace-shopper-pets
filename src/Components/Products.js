import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { Link } from "react-router-dom";

const Products = () => {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => {
          return (
            //list product name, price, description, and image
            <li key={product.id}>
              <h2>{product.name}</h2>
              <h3>{product.price}</h3>
              <h4>{product.description}</h4>
              <img src={product.imgUrl} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Products;
