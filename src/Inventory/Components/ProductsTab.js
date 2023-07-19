import React from "react";
import ProductTableRow from "./ProductTableRow";
import "../mngrStyle.css";

const ProductsTab = ({ inventory, showDeleted, category, addOrUpdateNewProduct }) => {
  //this component creates the headers of the table
  console.log("category: ", category);

  const renderTableRows = () => {
    if (inventory.length === 0) {
      return (
        <div>
          <p>There are currently no items in the inventory</p>
        </div>
      );
    } else {
      const headers = Object.keys(inventory[0]);

      let headerRow = headers
        .filter((header) => header !== "isDeleted" && !header.includes("ID") && !header.includes("inStock"))
        .map((header) => <th key={header}>{header}</th>);

      if (category !== "hotelFacilities") {
        headerRow = headerRow.filter(
          (header) => header.props.children !== "type"
        );
      }

      let filteredProduts;
      if (showDeleted) {
        filteredProduts = inventory?.filter((obj) => obj.isDeleted);
      } else {
        filteredProduts = inventory?.filter((obj) => !obj.isDeleted);
      }

      const rows = filteredProduts.map((product, index) => (
        <ProductTableRow
          key={index}
          product={product}
          addOrUpdateNewProduct={addOrUpdateNewProduct}
          category={category}
          showDeleted={showDeleted}
        />
      ));

      return (
        <>
          <tr>
            {headerRow}
            {
              category === "hotelActivities" || category === "hotelFacilities" || category === "spaTherapies" ?
                <></>
                :
                <th>In Stock</th>
            }

            {
              showDeleted ?
                <th>Restore Item</th>
                :
                <th>Delete Item</th>
            }

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
      {/* <button type="button" className="saveBtn" onClick={""}>
        save changes
      </button> */}
    </div>
  );
};

export default ProductsTab;
