import React, { useState } from "react";
import "../../App.css";

const Drinks_Menu = ({ Data, tab }) => {
  const [data, GetData] = useState("");
  GetData(Data[tab]);

  console.log(data);
};
export default Drinks_Menu;
