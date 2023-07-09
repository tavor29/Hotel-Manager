import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MyRouter from "./MyRouter";
import "../mngrStyle.css";

const fetchTable = async (tab) => {
  try {
    const res = await fetch(
      "http://proj.ruppin.ac.il/cgroup97/test2/api/GetHouseHoldCustomRequests?hotelID=1002"
    );
    const data = await res.json();

    let filteredArr = data[tab];

    if (!filteredArr || filteredArr.length === 0) {
      filteredArr = [];
    }

    return filteredArr;
  } catch (error) {
    console.error("Error fetching table data:", error);
    return [];
  }
};

const InventoryManagementApp = ({ tab }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [inventory, setInventory] = useState({
    Spa: [],
    Menu: [
      {
        name: "Chips",
        price: "4.99",
        imageURL:
          "https://cdn.shopify.com/s/files/1/0797/0169/products/mockup-c6d64730_1024x1024.jpg",
      },
    ],
    Facilities: [],
  });

  useEffect(() => {
    fetchTable(tab).then((filteredArr) => {
      setInventory((prevInventory) => ({
        ...prevInventory,
        [tab]: filteredArr,
      }));
    });
  }, [tab, setInventory]);

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
    const updatedInventory = { ...inventory };
    updatedInventory.push(product);

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
          inventory={inventory[tab]}
          newItemFormData={newItemForm}
          changeNewItemForm={changeNewItemForm}
          addNewProduct={addNewProduct}
        />
      </div>
    </div>
  );
};

export default InventoryManagementApp;
