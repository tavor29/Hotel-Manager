import React, { useState } from "react";
import "../../App.css";

const Food_Menu = ({ Data }) => {
  const [data, GetData] = useState("");
  GetData(Data[tab]);

  console.log(data);
};
export default Food_Menu;
