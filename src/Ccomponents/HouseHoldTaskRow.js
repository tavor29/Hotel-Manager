import React from "react";

const HouseHoldTaskRow = ({ item, deleteFunc, key }) => {
  const {
    requestID,
    amount,
    name,
    roomNumber,
    requestDate,
    requestHour,
    requestedDate,
    requestedHour,
  } = item;

  const date = new Date(requestDate);
  const RequestDate = date.toLocaleDateString("en-GB");
  const RequestHour = requestHour.substring(0, 5);

  const date2 = new Date(requestedDate);
  const RequestedDate = date2.toLocaleDateString("en-GB");
  const RequestedHour = requestedHour?.substring(0, 5);
  return (
    <div
      key={key}
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
      <div style={{ flex: "1", textAlign: "center" }}> {RequestDate} </div>
      <div style={{ flex: "1", textAlign: "center" }}> {RequestHour}</div>
      <div style={{ flex: "1", textAlign: "center" }}>{RequestedDate}</div>
      <div style={{ flex: "1", textAlign: "center" }}>{RequestedHour}</div>
      <div style={{ flex: "1", textAlign: "center" }}>
        {" "}
        {roomNumber || "N/A"}
      </div>

      <div
        style={{ flex: "1", textAlign: "center" }}
        onClick={() => deleteFunc(key)}
      >
        {" "}
        <input type="checkbox" />{" "}
      </div>
    </div>
  );
};

export default HouseHoldTaskRow;
