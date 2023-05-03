import React from "react";

const HouseHoldTaskRow = ({ item, deleteFunc, key }) => {
  const { requestID, amount, name, roomNumber, requestDate, requestHour } =
    item;
  const date = new Date(requestDate);
  const formattedRequestDate = date.toLocaleDateString("en-GB");
  const formattedRequestHour = requestHour.substring(0, 5);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        borderBottom: "1px solid black",
        padding: "10px 0",
      }}
    >
      <div style={{ flex: "1", textAlign: "center" }}>{requestID} </div>
      <div style={{ flex: "1", textAlign: "center" }}>{amount}</div>
      <div style={{ flex: "1", textAlign: "center" }}>{name || "N/A"}</div>
      <div style={{ flex: "1", textAlign: "center" }}>
        {formattedRequestDate}
      </div>
      <div style={{ flex: "1", textAlign: "center" }}>
        {formattedRequestHour}
      </div>
      <div style={{ flex: "1", textAlign: "center" }}>
        {roomNumber || "N/A"}
      </div>
      <div
        style={{ flex: "1", textAlign: "center" }}
        onClick={() => deleteFunc(key)}
      >
        <input type="checkbox" />{" "}
      </div>
    </div>
  );
};

export default HouseHoldTaskRow;
