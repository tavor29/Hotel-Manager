import React, { useState } from "react";
import "../../App.css";

const Additional_Items_Menu = ({ Data, tab }) => {
  const [data, GetData] = useState("");
  GetData(Data[tab]);

  console.log(data);
};
export default Additional_Items_Menu;
