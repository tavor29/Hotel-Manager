import React from "react";
import "../mngrStyle.css";

const ProductTableRow = ({ product }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>${product.price}</td>
      <td>{product.category}</td>
      <td>
        <a target="_blank" rel="noreferrer" href={product.imageURL}>
          View
        </a>
      </td>
      <td className="deleteButton">
        <button type="button" onClick={""}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductTableRow;
