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
    (async () => {
      console.log("add product: " + product.category);

      const res = await fetch(
        "http://proj.ruppin.ac.il/cgroup97/test2/api/GetHotelServices?hotelID=1002",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );
      console.log("promise: " + res);
      console.log("product: " + JSON.stringify(product));

      if (res) {
        console.log("Posting...");
      }
      if (res.ok) {
        console.log("Success");
      } else {
        console.log("Failed to Post");
      }
    })();
  };

  const deleteProduct = (productId) => {
    (async () => {
      try {
        const res = await fetch(
          `http://proj.ruppin.ac.il/cgroup97/test2/api/DeleteHotelService?hotelID=1002&serviceID=${productId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          console.log("Product deleted successfully");
        } else {
          console.log("Failed to delete product");
        }
      } catch (error) {
        console.log("Error deleting product:", error);
      }
    })();
    console.log("main product id :", productId);
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
          deleteProduct={deleteProduct}
        />
      </div>
    </div>
  );
};

export default InventoryManagementApp;
