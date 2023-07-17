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
  deleteProduct,
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
        return (
          <ProductsTab inventory={inventory} deleteProduct={deleteProduct} />
        );
      case 2:
        return (
          <ProductsTab inventory={inventory} deleteProduct={deleteProduct} showDeleted={true}/>
        )
      default:
        return null;
    }
  };

  return <div className="MyRouter">{route(activeTab)}</div>;
};

export default MyRouter;
