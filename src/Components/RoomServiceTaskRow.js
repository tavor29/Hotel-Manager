import React from "react";

const RoomServiceTaskRow = ({ item, setIsMarked, dataList }) => {
  const {
    requestID,
    amount,
    name,
    roomNumber,
    requestDate,
    requestHour,
    itemsCount,
    ID,
    price,
    type,
    isMarked,
    changes,
  } = item; // item is passed from Tasks.js

  const date = new Date(requestDate);
  const RequestDate = date.toLocaleDateString("en-GB");
  const RequestHour = requestHour?.substring(0, 5);

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
      <div style={{ flex: "1", textAlign: "center" }}>
        {name?.replace(/_/g, " ") || "N/A"}
      </div>
      <div style={{ flex: "1", textAlign: "center" }}> {RequestDate} </div>
      <div style={{ flex: "1", textAlign: "center" }}> {RequestHour}</div>
      <div style={{ flex: "1", textAlign: "center" }}>{price}</div>
      <div
        style={
          changes
            ? { flex: "1", textAlign: "center", color: "red" }
            : { flex: "1", textAlign: "center" }
        }
      >
        {changes || "No Changes"}
      </div>
      <div style={{ flex: "1", textAlign: "center" }}>
        {" "}
        {roomNumber || "N/A"}
      </div>

      <div style={{ flex: "1", textAlign: "center" }}>
        <button
          onClick={() => setIsMarked(requestID, itemsCount)}
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

export default RoomServiceTaskRow;
