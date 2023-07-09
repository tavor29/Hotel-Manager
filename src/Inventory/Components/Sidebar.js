import React from "react";
import "../mngrStyle.css";
const Sidebar = ({ activeTab, changeTab }) => {
  return (
    <div className="Sidebar">
      <ul>
        <li className="add-new-item" onClick={() => changeTab(0)}>
          <span>Add New Item</span>
        </li>
        <li
          className={activeTab === 1 ? "active" : ""}
          onClick={() => changeTab(1)}
        >
          Products
        </li>

        <li
          className={activeTab === 2 ? "active" : ""}
          onClick={() => changeTab(2)}
        >
          Item Archive
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
