import React, { useState } from "react";
import "../mngrStyle.css";

const NewItemTab = ({ items, addOrUpdateNewProduct, category }) => {
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
      }
      else if (
        element.includes("inStock")
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
      } else if (element.toLowerCase().includes("type") && category === "hotelFacilities") {
        continue;
      } else if (element.toLowerCase() === "openinghours") {
        inputs.push(
          <p key={element}>
            <label>{element}</label>
            <input
              className={""}
              type="text"
              id={element}
              placeholder="e.g. Daily, 10:00 - 18:00"
              onChange={handleChange}
              value={newformData[element] || ""}
            />
          </p>
        );
      }
      else if (element.toLowerCase() === "tags") {
        inputs.push(
          <p key={element}>
            <label>{element}</label>
            <textarea
              className={""}
              type="text"
              id={element}
              placeholder="key words for search, (e.g. soda, lime, grill)"
              onChange={handleChange}
              value={newformData[element] || ""}
              style={{ padding: 5 }}
            />
          </p>
        );
      }
      else {
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
    const foodAndDrinksCategories = ["foodMenu", "drinksMenu", "alcoholMenu"];

    if (foodAndDrinksCategories.includes(category) || category === "additionalItemsMenu") {
      newformData.inStock = true;
    }
    newformData.isDeleted = false;
    addOrUpdateNewProduct(newformData, category);
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
