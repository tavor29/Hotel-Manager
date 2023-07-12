import React, { useState } from "react";
import "../../App.css";

const Hotel_Facilities = ({ Data }) => {
  const [data, GetData] = useState("");
  GetData(Data[tab]);

  console.log(data);
};
export default Hotel_Facilities;
