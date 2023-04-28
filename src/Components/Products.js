import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store";

const Products = () => {
  const { products } = useSelector((state) => state);
  console.log(products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <h3>${product.price}</h3>
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
