import React from "react";
import "../mngrStyle.css";

const ProductTableRow = ({ product }) => {
  return (
    //headers need to be functional like we made them in new items tab
    <tr>
      <td>{product.name}</td>
      <td>${product.price}</td>
      {console.log("desc: " + product.description)}
      <td>
        {product.description && product.description.length > 20
          ? product.description.substring(0, 150) + "..."
          : product.description}
      </td>

      <td>{product.category}</td>
      <td>
        <a target="_blank" rel="noreferrer" href={product.imageURL}>
          View
        </a>
      </td>
      <td>
        <input type="checkbox" checked />
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
