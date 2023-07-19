import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MyRouter from "./MyRouter";
import "../mngrStyle.css";
import { getAdditionalItemObject, getFoodAndDrinksObject, getHotelActivitiesObject, getHotelFacilityObject, getTherapyObject } from "../../Utils/GeneratePostObjects";

const InventoryManagementApp = ({ tab, category, fetchJSON }) => {
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

  const addOrUpdateNewProduct = (product, category) => {
    (async () => {
      const postObject = getPostObject(product, category);
      console.log(JSON.stringify(postObject))

      const res = await fetch(
        "http://proj.ruppin.ac.il/cgroup97/test2/api/AddOrUpdateService?hotelID=1002",
        {
          method: "POST",
          body: JSON.stringify(postObject),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res) {
        console.log("Posting...");
      }
      if (res.ok) {
        console.log("Success");
        fetchJSON();
      } else {
        console.log("Failed to Post");
      }
    })();
  };


  const getPostObject = (product, category) => {
    const foodAndDrinksCategories = ["foodMenu", "drinksMenu", "alcoholMenu"];

    if (foodAndDrinksCategories.includes(category)) 
      return getFoodAndDrinksObject(product, category);

    if(category === "hotelActivities")
      return getHotelActivitiesObject(product);
    
    if(category === "hotelFacilities")
      return getHotelFacilityObject(product);
    
    if(category === "spaTherapies")
      return getTherapyObject(product);

    if(category === "additionalItemsMenu"){
      return getAdditionalItemObject(product);
    }
  }

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
          addOrUpdateNewProduct={addOrUpdateNewProduct}
          category={category}
          fetchJSON={fetchJSON}
        />
      </div>
    </div>
  );
};

export default InventoryManagementApp;
