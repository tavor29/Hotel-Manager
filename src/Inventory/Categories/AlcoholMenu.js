import React, { useState } from "react";
import "../../App.css";

const Alcohol_Menu = ({ Data }) => {
  const [data, GetData] = useState("");
  GetData(Data[tab]);

  console.log(data);
};
export default Alcohol_Menu;
