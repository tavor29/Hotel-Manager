import React from "react";
import NewItemTab from "./NewItemTab";
import ProductsTab from "./ProductsTab";
import "../mngrStyle.css";

const MyRouter = ({
  activeTab,
  inventory,
  newItemFormData,
  changeNewItemForm,
  addNewProduct,
}) => {
  const route = (activeTab) => {
    switch (activeTab) {
      case 0:
        return (
          <NewItemTab
            items={inventory}
            formData={newItemFormData}
            changeForm={changeNewItemForm}
            addNewProduct={addNewProduct}
          />
        );
      case 1:
        return <ProductsTab inventory={inventory} />;
      case 2:
        return <h2>deleted items</h2>;
      default:
        return null;
    }
  };

  return <div className="MyRouter">{route(activeTab)}</div>;
};

export default MyRouter;
