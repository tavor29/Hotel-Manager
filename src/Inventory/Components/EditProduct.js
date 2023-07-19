import React, { useState, useEffect } from "react";
import "../mngrStyle.css";

const EditProduct = ({ items, addOrUpdateNewProduct, category }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [newformData, setFormData] = useState({});

  useEffect(() => {
    if (selectedProduct !== "") {
      const selectedData = items.find((item) => item.name === selectedProduct);
      setFormData(selectedData || {});
    }
  }, [selectedProduct, items]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleProductSelect = (e) => {
    setSelectedProduct(e.target.value);
  };

  const renderTypeSelect = (uniqueValues) => {
    return (
      <p key="type">
        <label>Type</label>
        <select
          id="type"
          onChange={handleChange}
          value={newformData["type"] || ""}
        >
          <option value="">Select a type</option>
          {uniqueValues.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </p>
    );
  };

  const getKeys = (item) => {
    let inputs = [];
    let typeUniqueValues = [];

    for (const element in item) {
      if (element.toLowerCase().includes("price")) {
        inputs.push(
          <p key={element}>
            <label>{element}</label>
            <input
              className={""}
              type="number"
              required
              id={element}
              onChange={handleChange}
              value={newformData[element] || ""}
            />
          </p>
        );
      } else if (
        element.includes("ID") ||
        element === "isDeleted" ||
        (element === "type" && category !== "hotelFacilities")
      ) {
        continue;
      } else if (element.toLowerCase().includes("description")) {
        inputs.push(
          <p key={element}>
            <label>{element}</label>
            <textarea
              className={""}
              type="text"
              id={element}
              onChange={handleChange}
              value={newformData[element] || ""}
            />
          </p>
        );
      } else {
        inputs.push(
          <p key={element}>
            <label>{element}</label>
            <input
              className={""}
              type="text"
              id={element}
              onChange={handleChange}
              value={newformData[element] || ""}
            />
          </p>
        );
      }
    }

    if (category === "hotelFacilities") {
      // Get unique values for the "type" attribute
      typeUniqueValues = [...new Set(items.map((item) => item.type))];
      inputs.push(renderTypeSelect(typeUniqueValues));
    }

    return <div id="newItemForm-inputs">{inputs}</div>;
  };

  const handleSubmit = () => {
    addOrUpdateNewProduct(newformData, category);
  };

  return (
    <div className="NewItemTab">
      <div className="newItem-input">
        <h1>Edit Product</h1>

        <select value={selectedProduct} onChange={handleProductSelect} style={{display:'flex'}}>
          <option value="">Select a product</option>
          {items.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        {selectedProduct && getKeys(newformData)}

        <button onClick={handleSubmit}>Update Product</button>
      </div>
    </div>
  );
};

export default EditProduct;
