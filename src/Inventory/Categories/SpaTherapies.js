import React, { useState } from "react";
import "../../App.css";

const Spa_Therapies = ({ Data, tab }) => {
  const [data, GetData] = useState("");
  GetData(Data[tab]);

  console.log(data);
};
export default Spa_Therapies;
