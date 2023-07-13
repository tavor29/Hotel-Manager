import React from "react";
import ProductTableRow from "./ProductTableRow";
import "../mngrStyle.css";

const ProductsTab = ({ inventory }) => {
  console.log("productsTab: inventory: ", inventory);

  const renderTableRows = () => {
    if (inventory.length === 0) {
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
          <th>Description</th>
          <th>Category</th>
          <th>Image</th>
          <th>In-Stock</th>
        </tr>,
      ];

      for (const key in inventory) {
        console.log(key);
        rows.push(<ProductTableRow product={inventory[key]} />);
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
      <button type="button" className="saveBtn" onClick={""}>
        save changes
      </button>
    </div>
  );
};

export default ProductsTab;
