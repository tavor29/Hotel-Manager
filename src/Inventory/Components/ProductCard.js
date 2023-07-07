import React, { useState, useEffect } from "react";
import "../mngrStyle.css";

const ProductCard = ({ product }) => {
  const [category, setCategory] = useState(product.category);
  const [name, setName] = useState(product.name);

  const [price, setPrice] = useState(product.price);

  useEffect(() => {
    if (product.category !== category) {
      setCategory(product.category);
    }
    if (product.name !== name) {
      setName(product.name);
    }
    if (product.price !== price) {
      setPrice(product.price);
    }
  }, [product]);

  return (
    <div className="ProductCard">
      <p className="category">Products &#187; {category}</p>
      <p className="name">{name}</p>
      <img alt={name} />
      <p className="price">
        from <span>${price}</span>
      </p>
    </div>
  );
};

export default ProductCard;
