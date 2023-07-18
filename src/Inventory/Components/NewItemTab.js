import React, { useState } from "react";
import "../mngrStyle.css";

const NewItemTab = ({ items, addNewProduct, category }) => {
  //this component creates a new item based on the items given as the argument
  const [newformData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleTypeSelect = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      type: e.target.value,
    }));
  };

  const renderTypeSelect = (uniqueValues) => {
    return (
      <p key="type">
        <label>Type</label>
        <select
          id="type"
          onChange={handleTypeSelect}
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

  const getKeys = (items) => {
    let inputs = [];
    let typeUniqueValues = [];

    if (category === "hotelFacilities") {
      // Get unique values for the "type" attribute
      typeUniqueValues = [...new Set(items.map((item) => item.type))];
      inputs.push(renderTypeSelect(typeUniqueValues));
    }

    for (const element in items[0]) {
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

    return <div id="newItemForm-inputs">{inputs}</div>;
  };

  const handleSubmit = () => {
    addNewProduct(newformData);
  };

  return (
    <div className="NewItemTab">
      <div className="newItem-input">
        <h1>Add A New Item</h1>

        {getKeys(items)}

        <button onClick={handleSubmit}>Add To Inventory</button>
      </div>
    </div>
  );
};

export default NewItemTab;
