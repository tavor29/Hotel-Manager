import React from "react";

const HouseHoldTaskRow = ({ item, deleteFunc, setIsMarked }) => {
  const {
    requestID,
    amount,
    name,
    roomNumber,
    requestDate,
    requestHour,
    requestedDate,
    requestedHour,
    typeID
  } = item; // item is passed from Tasks.js

  const date = new Date(requestDate);
  const RequestDate = date.toLocaleDateString("en-GB");
  const RequestHour = requestHour?.substring(0, 5);

  const date2 = new Date(requestedDate);
  const RequestedDate = requestedDate
    ? date2.toLocaleDateString("en-GB")
    : null;
  const RequestedHour = requestedHour?.substring(0, 5);
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
      <div style={{ flex: "1", textAlign: "center" }}>{name?.replace(/_/g, " ") || "N/A"}</div>
      <div style={{ flex: "1", textAlign: "center" }}> {RequestDate} </div>
      <div style={{ flex: "1", textAlign: "center" }}> {RequestHour}</div>
      <div style={{ flex: "1", textAlign: "center" }}>
        {RequestedDate || "ASAP"}
      </div>
      <div style={{ flex: "1", textAlign: "center" }}>
        {RequestedHour || "ASAP"}
      </div>
      <div style={{ flex: "1", textAlign: "center" }}>
        {" "}
        {roomNumber || "N/A"}
      </div>

      <div style={{ flex: "1", textAlign: "center" }}>
        <button
          onClick={() => setIsMarked(requestID, typeID)}
          style={{
            backgroundColor: "#4CAF50",
            border: "none",
            color: "white",
            padding: "12px 24px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: 14,
            margin: 4,
            cursor: "pointer",
            borderRadius: "8px",
          }}
        >
          Mark as Done
        </button>
      </div>
    </div>
  );
};

export default HouseHoldTaskRow;
