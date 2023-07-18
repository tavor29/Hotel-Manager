import React from "react";
import NewItemTab from "./NewItemTab";
import ProductsTab from "./ProductsTab";
import EditProduct from "./EditProduct";
import "../mngrStyle.css";

const MyRouter = ({
  activeTab,
  inventory,
  newItemFormData,
  changeNewItemForm,
  addNewProduct,
  deleteProduct,
  category,
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
            category={category}
          />
        );
      case 1:
        return (
          <ProductsTab
            inventory={inventory}
            deleteProduct={deleteProduct}
            category={category}
          />
        );
      case 2:
        return (
          <ProductsTab
            inventory={inventory}
            deleteProduct={deleteProduct}
            showDeleted={true}
            category={category}
          />
        );
      case 3:
        return (
          <EditProduct
            items={inventory}
            formData={newItemFormData}
            changeForm={changeNewItemForm}
            addNewProduct={addNewProduct}
            category={category}
          />
        );
      default:
        return null;
    }
  };

  return <div className="MyRouter">{route(activeTab)}</div>;
};

export default MyRouter;
