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
      const headers = Object.keys(inventory[0]);

      const headerRow = headers.map((header) => <th key={header}>{header}</th>);

      const rows = inventory.map((product, index) => (
        <ProductTableRow key={index} product={product} />
      ));

      return (
        <>
          <tr>
            {headerRow}
            <th> In-Stock</th>
            <th>Delete Item</th>
          </tr>
          {rows}
        </>
      );
    }
  };

  return (
    <div className="ProductsTab">
      <h1>Products List</h1>
      <p>Showing all available products:</p>
      <table className="productTable">
        <tbody>{renderTableRows()}</tbody>
      </table>
      <button type="button" className="saveBtn" onClick={""}>
        save changes
      </button>
    </div>
  );
};

export default ProductsTab;
