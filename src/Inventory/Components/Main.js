import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MyRouter from "./MyRouter";
import "../mngrStyle.css";

const InventoryManagementApp = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [inventory, setInventory] = useState({
    categories: {
      Spa: [],
      Menu: [
        {
          category: "Menu",
          name: "Chips",
          price: "4.99",
          imageURL:
            "https://cdn.shopify.com/s/files/1/0797/0169/products/mockup-c6d64730_1024x1024.jpg",
        },
      ],
      Facilities: [],
      HR: [],
    },
  });
  const [newItemForm, setNewItemForm] = useState({
    category: "",
    name: "",
    price: "",
    imageURL: "",
  });
  const [formErrors, setFormErrors] = useState({
    category: false,
    name: false,
    price: false,
    imageURL: false,
  });

  const changeActiveTab = (index) => {
    setActiveTab(index);
  };

  const changeNewItemForm = (formData) => {
    setFormErrors({
      ...formErrors,
      category:
        formData.category !== newItemForm.category
          ? false
          : formErrors.category,
      name: formData.name !== newItemForm.name ? false : formErrors.name,
      price: formData.price !== newItemForm.price ? false : formErrors.price,
      imageURL:
        formData.imageURL !== newItemForm.imageURL
          ? false
          : formErrors.imageURL,
    });

    setNewItemForm(formData);
  };

  const addNewProduct = (product) => {
    setNewItemForm({ category: "", name: "", price: "", imageURL: "" });

    const decapitalize = (string) => {
      return string.charAt(0).toLowerCase() + string.slice(1);
    };

    const updatedInventory = { ...inventory };
    const category = decapitalize(product.category);

    if (!updatedInventory.categories[category]) {
      updatedInventory.categories[category] = [];
    }

    updatedInventory.categories[category].push(product);

    setInventory(updatedInventory);
  };

  return (
    <div className="InventoryManagementApp">
      <div className="sidebar-and-product-table">
        <Sidebar activeTab={activeTab} changeTab={changeActiveTab} />
      </div>
      <div className="content">
        <MyRouter
          activeTab={activeTab}
          inventory={inventory}
          newItemFormData={newItemForm}
          changeNewItemForm={changeNewItemForm}
          addNewProduct={addNewProduct}
        />
      </div>
    </div>
  );
};

export default InventoryManagementApp;
