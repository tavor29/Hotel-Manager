import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MyRouter from "./MyRouter";
import "../mngrStyle.css";

const InventoryManagementApp = ({ tab }) => {
  const [activeTab, setActiveTab] = useState(1);
  // const [inventory, setInventory] = useState(null);

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
    // here will be http post
  };

  return (
    <div className="InventoryManagementApp">
      <div className="sidebar-and-product-table">
        <Sidebar activeTab={activeTab} changeTab={changeActiveTab} />
      </div>
      {/* {console.log("main-test tab: " + tab)} */}
      <div className="content">
        <MyRouter
          activeTab={activeTab}
          inventory={tab}
          newItemFormData={newItemForm}
          changeNewItemForm={changeNewItemForm}
          addNewProduct={addNewProduct}
        />
      </div>
    </div>
  );
};

export default InventoryManagementApp;
