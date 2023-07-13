import React, { useState } from "react";
import "../mngrStyle.css";

const NewItemTab = ({ items, addNewProduct }) => {
  const [newformData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  const getKeys = (items) => {
    let inputs = [];

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
