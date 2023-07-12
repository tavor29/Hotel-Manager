import React, { useState } from "react";
import "../mngrStyle.css";
import ProductCard from "./ProductCard";

const NewItemTab = ({ items, formData, changeForm, addNewProduct }) => {
  const [formErrors, setFormErrors] = useState({
    category: false,
    name: false,
    price: false,
    imageURL: false,
  });

  const checkForm = () => {
    let category = document.getElementById("newItemForm-category").value;
    let name = document.getElementById("newItemForm-name").value;
    let price = document.getElementById("newItemForm-price").value;
    let imageURL = document.getElementById("newItemForm-imageURL").value;
    let product = { category, name, price, imageURL };
    let errors = { ...formErrors };
    errors.category = category.length === 0;
    errors.name = name.length === 0;
    errors.price = price.length === 0;

    finalizeForm(true, product);

    setFormErrors(errors);
  };

  const finalizeForm = (isImageURLValid, product) => {
    if (!isImageURLValid) {
      let errors = { ...formErrors };
      errors.imageURL = true;
      setFormErrors(errors);
    } else {
      addNewProduct(product);
    }
  };

  const updateForm = () => {
    let category = document.getElementById("newItemForm-category").value;
    let name = document.getElementById("newItemForm-name").value;
    let price = document.getElementById("newItemForm-price").value;
    let imageURL = document.getElementById("newItemForm-imageURL").value;
    let errors = { ...formErrors };
    if (formData.category !== category) {
      errors.category = false;
    }
    if (formData.name !== name) {
      errors.name = false;
    }
    if (formData.price !== price) {
      errors.price = false;
    }
    if (formData.imageURL !== imageURL) {
      errors.imageURL = false;
    }
    setFormErrors(errors);

    changeForm({ category, name, price, imageURL });
  };

  return (
    <div className="NewItemTab">
      <div className="newItem-input">
        <h1>Add A New Item</h1>
        <p>
          <label>Category</label>
          <select
            className={formErrors.category ? "formCheck-err" : ""}
            id="newItemForm-category"
            value={formData.category}
            onChange={updateForm}
          >
            <option>Hotel Activities</option>
            <option>Hotel Facilities</option>
            <option>Spa Therapies</option>
            <option>Food Menu</option>
            <option>Drinks Menu</option>
            <option>Alcohol Menu</option>
            <option>Additional Items Menu</option>
          </select>
        </p>
        <p>
          <label>Product Name</label>
          <input
            className={formErrors.name ? "formCheck-err" : ""}
            type="text"
            required
            id="newItemForm-name"
            value={formData.name}
            onChange={updateForm}
          />
        </p>
        <p>
          <label>Price</label>
          <input
            className={formErrors.price ? "formCheck-err" : ""}
            type="number"
            required
            id="newItemForm-price"
            value={formData.price}
            onChange={updateForm}
          />
        </p>
        <p>
          <label>Image URL</label>
          <input
            className={formErrors.imageURL ? "formCheck-err" : ""}
            type="text"
            required
            id="newItemForm-imageURL"
            value={formData.imageURL}
            onChange={updateForm}
            placeholder="Paste link here"
          />
        </p>
        <button onClick={checkForm}>Add Product</button>
      </div>
      <div className="newItem-preview">
        <h1>Preview</h1>
        <ProductCard product={formData} />
      </div>
    </div>
  );
};

export default NewItemTab;
