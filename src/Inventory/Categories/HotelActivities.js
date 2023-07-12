import React, { useState } from "react";
import "../../App.css";

const HotelActivities = ({ Data }) => {
  const [data, GetData] = useState("");
  GetData(Data[tab]);

  console.log(data);
};
export default HotelActivities;
