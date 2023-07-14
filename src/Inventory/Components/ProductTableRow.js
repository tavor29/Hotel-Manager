import React from "react";
import "../mngrStyle.css";

const ProductTableRow = ({ product, deleteProduct }) => {
  const [checked, setChecked] = React.useState(true);

  const renderTableRows = (product) => {
    const headers = Object.keys(product);
    let values = [];

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];

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
      } else {
        values.push(<td key={header}>{product[header]}</td>);
      }
    }

    return values;
  };
  const handleSubmit = () => {
    const id =
      product.ID || product.placeID || product.therapyID || product.facilityID;
    deleteProduct(id);
  };

  return (
    <tr>
      {renderTableRows(product)}
      <td>
        <input
          type="checkbox"
          defaultChecked={checked}
          onChange={() => setChecked((state) => !state)}
        />
      </td>
      <td className="deleteButton">
        <button type="button" onClick={handleSubmit}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductTableRow;
