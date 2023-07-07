import React from "react";
import Tabs from "./Tabs";
// import Menu from "./Components/MenuItems";
import Main from "./Components/Main";

import "../App.css";

export default function InventoryMgr() {
  return (
    <>
      <div className="container">
        <Tabs />
        <Main />

        {/* <Menu /> */}
      </div>
    </>
  );
}
