import React from "react";
import ProductTableRow from "./ProductTableRow";
import "../mngrStyle.css";

const ProductsTab = ({ inventory }) => {
  const renderTableRows = (inventory) => {
    const categoryKeys = Object.keys(inventory.categories);
    let listOfProducts = [];

    for (let i = 0; i < categoryKeys.length; i++) {
      let category = categoryKeys[i];
      listOfProducts = listOfProducts.concat(inventory.categories[category]);
    }

    if (listOfProducts.length === 0) {
      return (
        <div>
          <p>There are currently no items in the inventory</p>
        </div>
      );
    } else {
      let rows = [
        <tr key="table-header">
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
        </tr>,
      ];

      for (let i = 0; i < listOfProducts.length; i++) {
        rows.push(<ProductTableRow key={i} product={listOfProducts[i]} />);
      }

      return rows;
    }
  };

  return (
    <div className="ProductsTab">
      <h1>Products List</h1>
      <p>Showing all available products:</p>
      <table className="productTable">
        <tbody>{renderTableRows(inventory)}</tbody>
      </table>
    </div>
  );
};

export default ProductsTab;
