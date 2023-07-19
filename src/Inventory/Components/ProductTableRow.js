import React from "react";
import "../mngrStyle.css";

const ProductTableRow = ({ product, category, showDeleted, addOrUpdateNewProduct }) => {

  const [checked, setChecked] = React.useState(product.inStock);

  const renderTableRows = (product) => {
    const headers = Object.keys(product);
    let values = [];

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];

      if (
        header === "isDeleted" ||
        header.includes("ID") ||
        (header === "type" && category !== "hotelFacilities")
      ) {
        // Skip these properties to the table row
        continue;
      }
      if (header.includes("description")) {
        const Description =
          product[header] && product[header].length > 20
            ? product[header].substring(0, 150) + "..."
            : product[header];

        values.push(<td key={header}>{Description}</td>);
      } else if (header.includes("URL")) {
        values.push(
          <td key={header}>
            <a target="_blank" rel="noreferrer" href={product[header]}>
              View
            </a>
          </td>
        );
      } else if(header.includes("inStock")){

      }
      else {
        values.push(<td key={header}>{product[header]}</td>);
      }
    }

    return values;
  };

  const handleCheck = () => {
    console.log(product.inStock)
    if (product.inStock) {
      setChecked(false);
      product.inStock = false;
    } else {
      setChecked(true)
      product.inStock = true;
    }

    addOrUpdateNewProduct(product, category);
  }

  const handleSubmit = () => {
    if (showDeleted) {
      product.isDeleted = false;
    } else {
      product.isDeleted = true;
    }

    addOrUpdateNewProduct(product, category);
  };

  return (
    <tr>
      {renderTableRows(product)}
      {
        category === "hotelActivities" || category === "hotelFacilities" || category === "spaTherapies" ? 
        <></>
        :
        <td>
        <input
          type="checkbox"
          defaultChecked={checked}
          onChange={handleCheck}
        />
      </td>
      }
      <td className="deleteButton">
        <button type="button" onClick={handleSubmit}>
          {
            showDeleted ?
              "Restore" : "Delete"
          }
        </button>
      </td>
    </tr>
  );
};

export default ProductTableRow;
