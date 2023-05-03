import React from "react";

const HouseHoldTaskRow = ({ item, deleteFunc, key }) => {
  const { requestID, amount, name, requestDate, requestHour } = item;
  const date = new Date(requestDate);
  const formattedCheckInDate = date.toLocaleDateString("en-GB");
  const formattedrequestHour = requestHour.substring(0, 5);
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
      <div style={{ flex: "1", textAlign: "center" }}>{name}</div>
      <div style={{ flex: "1", textAlign: "center" }}>
        {" "}
        {formattedCheckInDate}
      </div>
      <div style={{ flex: "1", textAlign: "center" }}>
        {formattedrequestHour}{" "}
      </div>
      <div style={{ flex: "1", textAlign: "center" }}>
        <input type="checkbox" />{" "}
      </div>
      <button onClick={() => deleteFunc(key)}>Delete</button>
    </div>
    // onClick={() => deleteRow.mutate(indyex)}
  );
};

export default HouseHoldTaskRow;
