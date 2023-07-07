import React, { useState } from "react";
import "../../App.css";

const MenuItemsTab = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState("");

  const handleInputChange = (event) => {
    setNewMenuItem(event.target.value);
  };

  const handleAddMenuItem = () => {
    if (newMenuItem.trim() !== "") {
      const updatedMenuItems = [...menuItems, newMenuItem];
      setMenuItems(updatedMenuItems);
      setNewMenuItem("");
    }
  };

  const handleDeleteMenuItem = (index) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems.splice(index, 1);
    setMenuItems(updatedMenuItems);
  };

  return (
    <div className="container">
      <h2>Menu Items</h2>
      <form>
        <input type="text" value={newMenuItem} onChange={handleInputChange} />
        <button type="button" onClick={handleAddMenuItem}>
          Add
        </button>
      </form>
      <ul>
        {menuItems.map((menuItem, index) => (
          <li key={index}>
            {menuItem}
            <button type="button" onClick={() => handleDeleteMenuItem(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItemsTab;
